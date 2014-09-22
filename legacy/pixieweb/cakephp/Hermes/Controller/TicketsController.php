<?php
App::uses('HermesAppController', 'Hermes.Controller');
/**
 * Tickets Controller
 *
 */
class TicketsController extends HermesAppController {

/**
 * Scaffold
 *
 * @var mixed
 */
	public function index(){
        if (!empty($this->request->params['requested'])) {
            return ClassRegistry::init("Hermes.Ticket")->find('all');
        }     
		parent::index();
	}

	public function view($id = null){
		parent::view($id);
	}

	public function edit($id = null){
		$ticket_types = ClassRegistry::init('Hermes.TicketType')->find('list');
		$ticket_statuses = ClassRegistry::init('Hermes.TicketStatus')->find('list');		
		$this->set(compact('ticket_types', 'ticket_statuses'));
				
		parent::edit($id);
		$this->render('Tickets/form');
	}
	
	public function add(){

		$ticket_types = ClassRegistry::init('Hermes.TicketType')->find('list');
		$ticket_statuses = ClassRegistry::init('Hermes.TicketStatus')->find('list');		
		$this->set(compact('ticket_types', 'ticket_statuses'));

		$this->render('Tickets/form');
		parent::add();	

	}
}
