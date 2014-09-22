<?php
include 'config.php';
include 'functions.php';
require '/www.tcd.ie/assets/php/JSON.php'; 
//header('Content-Type: application/json');

$json = new Services_JSON();
$response = array();

if(isset($_GET['query'])){
	$building_fields = array('Building.name AS name' , 'AZ.name AS az_name' ,'lat', 'lng', 'Building.info AS info', 'description', 'photourl', 'opening_hours', 'accessibility');
	
	mysql_connect($cfg['__server'], $cfg['username'], $cfg['password']) or die(mysql_error());
	mysql_select_db($cfg['database']) or die(mysql_error());
	// SELECT * FROM Building LEFT JOIN AZ on AZ.building = Building.id WHERE AZ.name LIKE "%Hamilton%" OR Building.name LIKE "%Hamilton%";

	$query = sprintf("SELECT %s FROM Building LEFT JOIN AZ on AZ.building = Building.id WHERE AZ.name LIKE '%%%s%%' OR Building.name LIKE '%%%s%%';",
			implode(",", $building_fields),
            mysql_real_escape_string($_REQUEST['query']), mysql_real_escape_string($_REQUEST['query']));
	//var_dump($query);
			
	$result = mysql_query($query);
	while($row = mysql_fetch_assoc($result)){
		$response[] = $row;
	}

} else {
	$response = array("error" => "No query string set");
}
echo $json->encode($response);
?>
