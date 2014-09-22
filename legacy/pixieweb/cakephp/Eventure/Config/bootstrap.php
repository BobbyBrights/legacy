<?php
Configure::write('debug', 0);

function array_unique_multi ($arr) {
    foreach ($arr as $k => $v)
        if (is_array($v))
            $arr[$k] = array_unique_multi($v);
    return array_map("unserialize", array_unique(array_map("serialize", $arr)));
}

function vomit($a, $json = true){
	if(Configure::read('debug') > 0):
		echo "<pre>" . ($json ? json_encode($a) : print_r($a, 1)) . "</pre>";
	endif;
}

function flatten($array, $model){
		$tmp_array = array();
    	foreach($array as $k):
    		$tmp_array[$k[$model]['id']] = $k[$model]['name'];
    	endforeach;
    	return $tmp_array;
}

function get_as_obj($record, $key){
	return $record[$key];
}

function is_admin($user){
	if(!isset($user['Role'])):
		return false;
	endif;
	
	foreach($user['Role'] as $role):
		if($role['name'] == 'admin'):
			return true;
		endif;
	endforeach;	
	return false;
}

function is_promoter($user){
	if(!isset($user['Role'])):
		return false;
	endif;
	
	foreach($user['Role'] as $role):
		if($role['name'] == 'promoter'):
			return true;
		endif;
	endforeach;		
	return false;
}

/* */
function get_event_name($event_id, $events){
	foreach($events as $e):
		if($e['Event']['id'] == $event_id):
			return $e['Event']['name'];
		endif;
	endforeach;
	
	return "Unknown event name";
}

function get_accreditation_type($accreditation_type_id, $accreditation_types){
	foreach($accreditation_types as $a):
		if($a['AccreditationType']['id'] == $accreditation_type_id):
			return $a['AccreditationType']['name'];
		endif;
	endforeach;
	
	return "Unknown accreditation name";		
}


function get_event_accreditation_name($accreditation_id, $attendee){
	$name = '';
	foreach($attendee['Accreditations'] as $a):
		if($a['Accreditation']['id'] == $accreditation_id):
			$name = get_event_name($a['Accreditation']['event_id'], $attendee['Events']) . " - " . get_accreditation_type($a['Accreditation']['accreditation_type_id'], $attendee['AccreditationTypes']);
		endif; 
	endforeach;
	return $name;
}


function get_key_value_by_id($key, $id, $arr){
	foreach($arr as $k){
		foreach($k as $t => $r):
			if($r['id'] == $id):
				return $r[$key];
			endif;
		endforeach;
	}
	return "";
}


?>