<?php $this->assign('title', 'Attendee information for ' . $attendee['Attendee']['name']); ?>
<?php //if(isset($attendee)) : vomit($attendee); endif;  ?>
<div class="row">
	<div class="span8">	
		<h2>Adding subordinates for <?php echo $attendee['Attendee']['name']; ?></h2>
		<?php $count = 0; ?>
		<form action="/eventure/attendees/add_subordinates/id:<?php echo $attendee['Attendee']['id']; ?>" method="post">
			<input type="hidden" name="lead_attendee_id" value="<?php echo $attendee['Attendee']['id']; ?>" />
			<input type="hidden" name="group_name" value="<?php echo $attendee['Attendee']['group_name']; ?>" />
			<input type="hidden" name="promoter_id" value="<?php echo isset( $user['Promoter']['id'] ) ? $user['Promoter']['id'] : 0; ?>" />
			
		<?php while($count < $subs): ?>
			<div class="well">
				<div class="controls controls-row">
					<input id="name[<?php echo $count; ?>]" name="name[<?php echo $count; ?>]" type="text" class="span3" placeholder="Name" /> 
					<input id="mobile[<?php echo $count; ?>]" name="mobile[<?php echo $count; ?>]" type="text" class="span3" placeholder="Mobile No." />
				</div>			
			</div>
		<?php 
				$count++;
			endwhile; ?>
			<button class="btn btn-large btn-primary" type="submit">Add Subordinates</button>
		</form>
	</div>
	<div class="span4">
		
		 
			
	</div>
</div>