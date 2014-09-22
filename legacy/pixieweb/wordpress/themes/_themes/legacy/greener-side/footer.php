<div id="footermargin"></div>
				
	<div class="clear">
 <center><div id="footer"> <a href="<?php echo home_url(); ?>/">

		<?php 
$time = time () ; 
//This line gets the current time off the server

$year= date("Y",$time) . ""; 
//This line formats it to display just the year

echo "&copy; " . $year;
//this line prints out the copyright date range, you need to edit 2002 to be your opening year
?> <?php bloginfo('name');?>
 </a> 
theme by <a href="http://www.adazing.com/">adazing web design</a>	  </div>
 </center>


</div>
			

		

		</div>
	</div><!-- end #bgg -->
	</div><!-- end #contentmain -->

	</div><!-- end #containerg -->
  </div><!-- end #wrapper -->  <div id="grass"></div>
  <div id="clearfoot"></div><?php wp_footer(); ?>
	
</body>
</html>