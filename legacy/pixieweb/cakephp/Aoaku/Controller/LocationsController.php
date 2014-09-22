<?php
App::uses('AoakuAppController', 'Aoaku.Controller');
/**
 * Locations Controller
 *
 */
class LocationsController extends AoakuAppController {

   public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('index');
    }


	public function index(){
        $this->Location->recursive = 0;
        $this->set('locations', $this->paginate());		
	}
	
}
