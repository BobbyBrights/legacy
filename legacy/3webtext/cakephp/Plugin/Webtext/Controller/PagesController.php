<?php

class PagesController extends WebtextAppController {
	
	public function index(){	
		$this->set('title_for_layout', 'Webtext - Homepage.');
	}
	
	public function faq(){	
		$this->set('title_for_layout', 'Webtext - Frequently Asked Questions.');
	}
	
	public function download_apps(){	
		$this->set('title_for_layout', 'Webtext - Download Apps.');
	}
	
	public function support(){	
	
	$this->pageTitle = 'Webtext - Support.';
$this->layout = null;

	}
	
}