<?php
/**
 *
 * PHP 5
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright 2005-2012, Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright 2005-2012, Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       Cake.View.Scaffolds
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
?>
<?php //vomit($user); ?>	
<div class="row">
		<h2>Attendee form</h2>
		<div class="checkin form well">
		<?php	
			echo $this->Form->create('Attendee');
			$this->Form->inputDefaults(
				array(
					'class' => 'span6',
					'error' => array('attributes' => array('class' => 'alert alert-error'))
				)
			);
			
			
			if(isset($attendee_id)):
				echo $this->Form->input('id');
			endif;

			echo $this->Form->input('name');
			echo $this->Form->input('group_name');
			echo $this->Form->input('email');
			echo $this->Form->input('phone');
			echo $this->Form->input('mobile');
			//echo $this->Form->input('accreditation_id', array('multiple' => 'checkbox', 'div' => 'checkbox-group'));
			echo $this->Form->input('lead_attendee_id', array('empty' => 'Choose lead contact (optional)', 'label' => 'Lead contact', 'options' => $attendees));
			//echo $this->Form->input('lead_attendee_id', array('empty' => 'Choose lead contact (optional)', 'label' => 'Lead contact', 'options' => $attendees));
			$promoter_id = isset($user['Promoter']['id']) ? $user['Promoter']['id'] : 0;
			echo $this->Form->input('promoter_id', array('type' => 'hidden', 'default' => $promoter_id));
			echo $this->Form->button('Save Attendee', array('type' => 'submit', 'class' => 'btn btn-large'));
			
			echo $this->Form->end();
		?>
		</div>

</div>
