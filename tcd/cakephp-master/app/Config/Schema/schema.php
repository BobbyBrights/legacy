<?php 
class AppSchema extends CakeSchema {

	public $connection = 'news_events';

	public function before($event = array()) {
		return true;
	}

	public function after($event = array()) {
	}

}
