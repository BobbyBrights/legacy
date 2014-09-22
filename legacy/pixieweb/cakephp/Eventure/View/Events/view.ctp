<h2><?php echo $event['Event']['name']; ?><?php echo $this->Html->link('<i class="icon-chevron-left"></i> Back to list', array('action' => 'index'), array('class' => 'btn btn-mini pull-right', 'escape' => false)); ?></h2>
<?php //vomit($acc); ?>
<?php //vomit($all_accreditations); ?>
<div class="row">
    <div class="span8">
        <div class="row">
            <div class="span3">
                <div class="well">
                    <h3>Check ins</h3><input class="knob" data-width="180" data-thickness=".35" data-max="<?php echo $total_attendees; ?>" data-readonly="true" value="<?php echo $total_checkins; ?>" />
                    <br/><span class="total">Total attendees: <?php echo $total_attendees; ?></span>
                </div>
            </div>

            <div class="span5">
                <?php if(!empty($event['Event']['branding_image'])): ?><img src="<?php echo $event['Event']['branding_image']; ?>" class="img-rounded with-border with-margin-bottom pull-right"> <?php endif; ?>
                
                
                       <div class="accordion" id="accordion2">
            <div class="accordion-group">
                <div class="accordion-heading">
                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#event_info">Event Information </a>
                </div>

                <div id="event_info" class="accordion-body collapse in">
                    <div class="accordion-inner">
                        <dl>
                        	<?php $remove_these = array('id', 'promoter_id', 'event_type_id', 'venue_id'); ?>
                        	
                            <?php foreach($event['Event'] as $k => $v): ?>
                            <?php if(!in_array($k, $remove_these)): ?>
                            <dt><?php echo Inflector::humanize($k); ?></dt>

                            <dd><?php echo $v == 1 ? 'Active' : ($v != '' ? $v : '&nbsp;'); ?></dd>
                            <?php endif; ?>
                            <?php endforeach; ?>
                            
                        </dl>
                    </div>
                </div>
            </div>

            <div class="accordion-group">
                <div class="accordion-heading">
                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#promoter_info">Promoter Information </a>
                </div>

                <div id="promoter_info" class="accordion-body collapse">
                    <div class="accordion-inner">
                        <dl>
                        	<?php $remove_these = array('id', 'promoter_id', 'event_type_id', 'venue_id'); ?>
                        	
                            <?php foreach($event['Promoter'] as $k => $v): ?>
                            <?php if(!in_array($k, $remove_these)): ?>
                            <dt><?php echo Inflector::humanize($k); ?></dt>

                            <dd><?php echo $v != '' ? $v : '&nbsp;'; ?></dd>
                            <?php endif; ?>
                            <?php endforeach; ?>
                            
                        </dl>
                    </div>
                </div>
            </div>

            <div class="accordion-group">
                <div class="accordion-heading">
                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#venue_info">Venue Information </a>
                </div>

                <div id="venue_info" class="accordion-body collapse">
                    <div class="accordion-inner">
                        <dl>
                        	<?php $remove_these = array('id', 'promoter_id', 'event_type_id', 'venue_id'); ?>
                        	
                            <?php foreach($event['Venue'] as $k => $v): ?>
                            <?php if(!in_array($k, $remove_these)): ?>
                            <dt><?php echo Inflector::humanize($k); ?></dt>

                            <dd><?php echo $v != '' ? $v : '&nbsp;'; ?></dd>
                            <?php endif; ?>
                            <?php endforeach; ?>
                            
                        </dl>
                    </div>
                </div>
            </div><!-- -->
        </div>
 
 
 
            </div>
        </div>

    </div>

    <div class="span4">
        <div class="well">
            <h3>Actions</h3>
            <?php echo $this->Html->link('Edit event details', array('action' => 'edit', $event['Event']['id']), array('class' => 'btn btn-large btn-block')); ?>
            <?php //echo $this->Html->link('Upload Attendee sheet', array('action' => 'upload', $event['Event']['id']), array('class' => 'btn btn-large btn-block')); ?>
            <?php echo $this->Html->link('Check someone in', array('action' => 'add', 'controller' => 'checkins', 'event_id' => $event['Event']['id']), array('class' => 'btn btn-large btn-block btn-primary')); ?>
        </div>
        <!--
        <div class="well">
            <h3>Recent checkins </h3>
        </div>
        -->
        <div class="well">
            <h3>Accreditations </h3><?php foreach($acc as $a): ?><span class="label"><?php echo $a['AccreditationType']['name']; ?></span> <?php endforeach; ?>
        </div>
    </div>
</div>
