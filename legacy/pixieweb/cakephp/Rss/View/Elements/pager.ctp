<?php if($this->CustomPaginator->hasNext() || $this->CustomPaginator->hasPrev()): ?>
<div class="pagination">
<ul>
<?php 
// Shows the page numbers

// Shows the next and previous links
echo $this->CustomPaginator->prev('&laquo;', null, null, array('escape' => false, 'class' => 'disabled prev'));
echo $this->CustomPaginator->numbers(array('separator' => ''));
echo $this->CustomPaginator->next('&raquo;', null, null, array('escape' => false, 'class' => 'disabled next'));

?>
</ul>
</div>
<?php endif; ?>
