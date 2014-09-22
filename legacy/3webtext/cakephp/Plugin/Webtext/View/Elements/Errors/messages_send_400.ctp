<!-- No recipients set -->
<div id="flashMessage">
<?php echo $message; ?>
<?php if(isset($stack_trace)): echo $stack_trace; else: ?>
The scheduled date is in the past.</div>
<?php endif; ?>