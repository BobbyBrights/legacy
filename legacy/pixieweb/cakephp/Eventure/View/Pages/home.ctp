<?php $this->assign('title', 'Dashboard'); ?>
<h1>Dashboard</h1>
<div class="row">
<div class="span12">
<div id="placeholder" class="well"></div>
</div>
<div class="span4">
	<div class="well">
	<h2>Latest Events</h2>
	${latest_events}
	</div>
</div>

<div class="span8">
	<div class="well">
	<h2>Notices</h2>
	${latest_notices}
	</div>
</div>
</div>
