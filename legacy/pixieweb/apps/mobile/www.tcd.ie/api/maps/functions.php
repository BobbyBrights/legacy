<?php
function mysql_fetch_all($result) {
   while($row=mysql_fetch_array($result)) {
       $return[] = $row;
   }
   return $return;
}
?>