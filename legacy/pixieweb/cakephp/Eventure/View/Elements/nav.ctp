<?php 
	$navigation = array();
	//
	$navigation['Events'] = array(
		'controller' => 'events',  
		'action' => 'index',
		'submenu' => array(
			'List Events' => array(
				'controller' => 'events',  
				'action' => 'index'			
			), 
			'Add an Event' => array(
				'controller' => 'events',  
				'action' => 'add'			
			)
		)
	);
	$navigation['Venues'] = array(
		'controller' => 'venues',  
		'action' => 'index',
		'submenu' => array(
			'List Venues' => array(
				'controller' => 'venues',  
				'action' => 'index'			
			), 
			'Add a Venue' => array(
				'controller' => 'venues',  
				'action' => 'add'			
			)
		)
	);

	$navigation['Checkins'] = array(
		'controller' => 'checkins',  
		'action' => 'index',
		'submenu' => array(
			'List Checkins' => array(
				'controller' => 'checkins',  
				'action' => 'index'			
			), 
			'Check someone in ' => array(
				'controller' => 'checkins',  
				'action' => 'add'			
			)
		)
	);

	$navigation['Attendees'] = array(
		'controller' => 'attendees',  
		'action' => 'index',
		'submenu' => array(
			'List Attendees' => array(
				'controller' => 'attendees',  
				'action' => 'index'			
			), 
			'Add New Attendee' => array(
				'controller' => 'attendees',  
				'action' => 'add'		
			)
		)
	);

	$navigation['Accreditations'] = array(
		'controller' => 'accreditations',  
		'action' => 'index',
		'submenu' => array(
			'List accreditations' => array(
				'controller' => 'accreditations',  
				'action' => 'index'			
			), 
			'Add new accreditation' => array(
				'controller' => 'accreditations',  
				'action' => 'add'		
			)
		)
	);
	/*
	$navigation['Contact'] = array(
		'controller' => 'pages',  
		'action' => 'display',
		'page' => 'contact'
	);
	*/	
	if(!empty($user['Promoter']['id']) && $user['Promoter']['id'] != null): // This is a promoter.
		//unset($navigation['Accreditations']);
		unset($navigation['Venues']);
	endif;
	
	echo $this->Utilities->navigation($navigation);
	
?>
