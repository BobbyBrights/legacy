<?php
class Message extends WebtextAppModel{
	var $useTable = false;
	public $name = 'Message';
	
	public $_schema = array(
		'message' => array(
			'type' => 'string',
			'length' => 765
		),
		'scheduledDate' => array(
			'type' => 'datetime'
		)
	);
    
    public $validate = array(
    	'message' => array(
    		'messageRuleNotEmpty' => array(
				'rule'    => 'notEmpty',
				'message' => 'Message is a required field'
				
			),
			'messageRuleLimitChars' => array(
				'rule' => array('sms_character_count_below', 765),
				'message' => 'Maximum length of 765 characters, certain characters count as double.', 
				'last' => true
			)
    	), 
		'scheduledDate' => array(
            'rule'       => 'date',
            'message'    => 'Enter a valid date',
            'allowEmpty' => true
        )
    );
	
	 public function sms_character_count_below($check, $limit) {
	 	$char_count = strlen($check['message']);
	 	$double_count = array("|", "^", "{", "}", "[", "]", "~", "\\", "\u20AC");
	 	$extra_chars = 0;
	 	foreach($double_count as $d):
	 		$extra_chars += substr_count($check['message'], $d);
	 	endforeach;
	 	//var_dump($extra_chars);
	 	return (strlen($check['message']) + $extra_chars) < $limit;
    }
     
    
    
}