<?php //var_dump($attendees); ?>	
<div class="row">
		<h2>Add event info</h2>
		<div class="checkin form well">
		<?php	
			echo $this->Form->create('Event');
			$this->Form->inputDefaults(
				array(
					'class' => 'span6',
					'error' => array('attributes' => array('class' => 'alert alert-error'))
				)
			);
			
			echo $this->Form->input('name');
			echo $this->Form->input('promoter_id');
			echo $this->Form->input('event_type_id', array('options' => $event_types));
			echo $this->Form->input('website');
			echo $this->Form->input('branding_image');
			echo $this->Form->input('comments');
			
			$date_time_options = array('label' => false, 'div' => false, 'data-format' => 'yyyy-MM-dd hh:mm:ss', 'type' => 'text', 'class' => 'span3');
			
			$today = date("Y-m-d H:i:s");
			
			if(!empty($this->request->data['Event']) && $this->request->data['Event']['start_date'] == "0000-00-00 00:00:00"):
				$this->request->data['Event']['start_date'] = $today;
			endif;
			
			if(!empty($this->request->data['Event']) && $this->request->data['Event']['end_date'] == "0000-00-00 00:00:00"):
				$this->request->data['Event']['end_date'] = $today;
			endif;

			// Need to output these manually, dont asky why.. 
?>
			<label for="EventStartDate">Start Date</label>
			<div id="EventStartDate" class="input-append date">
				<?php echo $this->Form->input('start_date', $date_time_options); ?>
			    <span class="add-on">
			      <i data-time-icon="icon-time" data-date-icon="icon-calendar">
			      </i>
			    </span>
			</div>

			<label for="EventEndDate">End Date</label>
			<div id="EventEndDate" class="input-append date">
			    <?php echo $this->Form->input('end_date', $date_time_options); ?>
			    <span class="add-on">
			      <i data-time-icon="icon-time" data-date-icon="icon-calendar">
			      </i>
			    </span>
			</div>


<?php
						
			echo $this->Form->input('status', array('class' => 'span1', 'label' => 'Active'));
			echo $this->Form->input('venue_id');
			
			echo $this->Form->button(($this->action == 'edit' ? 'Save' : 'Add') . ' Event info', array('type' => 'submit', 'class' => 'btn btn-large btn-primary'));			
			echo $this->Form->end();
		?>
		</div>
</div>
