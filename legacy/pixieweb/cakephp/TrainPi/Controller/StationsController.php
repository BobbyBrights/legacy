<?php
App::uses('TrainPiAppController', 'TrainPi.Controller');
App::uses('Xml', 'Utility');
define('EARTH_RAD', 6371000);

/**
 * Stations Controller
 *
 */
class StationsController extends TrainPiAppController {
	
	
	public function index(){
			
	}
	
	public function json() {
		$this->autoRender = false;
		//var_dump(WWW_ROOT);
		//var_dump(WEBROOT_DIR);
		//var_dump($this->params->query);
		if(empty($this->params->query['coords'])):
			return json_encode(array('error' => 'No coordinates provided'));
		endif;
		
		$values = explode( ',', $this->params->query['coords'] ); 
		$coords = array_map('doubleval', $values); 
		$distances = array();
		
		$xml = Xml::build('http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML');
		foreach($xml->objStation as $f):
			//echo json_encode($f);
			//echo $f->StationLatitude;
			//echo $f->StationLongitude;
			$distances[] = array('station' => (string) $f->StationDesc, 'code' => (string) $f->StationCode, 'distance' => $this->haversGCD( $coords[0], $coords[1], (double) $f->StationLatitude, (double) $f->StationLongitude));		
		endforeach;
				
		usort($distances, array($this, 'distance_compare'));			
		//echo $distances[0]['code'];
			
		$trains = Xml::build('http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=' . $distances[0]['code']);
		return json_encode($trains);
		
	}

	function distance_compare($a, $b) {
		if( $a['distance'] == $b['distance']) return 0; 
		return $a['distance'] > $b['distance'] ? 1 : -1;
	}  

		
	function haversGCD(
		$a, $b, $c, $d){
		// convert from degrees to radians
		$latFrom = deg2rad($a);
		$lonFrom = deg2rad($b);
		$latTo = deg2rad($c);
		$lonTo = deg2rad($d);
		$latDelta = $latTo - $latFrom;
		$lonDelta = $lonTo - $lonFrom;
		
		$angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) + cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
		
		return ($angle * EARTH_RAD)/1000;
	}
}
