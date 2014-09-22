<?php if(isset($first_run) && $first_run): ?>

<div id="flashMessage">You must accept the terms & conditions to continue.</div>

<?php else: ?>


<div id="flashMessage">Access denied. Incorrect username or PIN.</div>

<?php endif; ?>
