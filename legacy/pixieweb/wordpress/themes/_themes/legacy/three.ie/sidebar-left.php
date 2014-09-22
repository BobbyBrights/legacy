<?php
	// Sidebar
	global $current_site; 
	$depth = is_tree($post->ID) ? 2 : 1; 
?>
	<div class="box_Sidebar">
      <div class="box_000 box_Menu">
        <div class="box_Title js_sIFR_Title_Section">
          <h2 class="tit_Section">Navigation.</h2>
        </div>
        <div class="box_Content">
          <div class="box_Top"> </div>
          <div class="box_Left"> </div>
          <div class="box_Right"> </div>
          <div class="box_Bottom"> </div>
  
          <div class="box_Main">
          <?php //include('cascading_menu.php'); ?>
	

			<ul class="list_Menu_Sidebar">
			 <?php
			 	global $current_blog;
			 	//echo ;
			 	switch($_SERVER['SERVER_NAME']){
			 		case "shop.three.ie":
			 			echo "<li class=\"\"> <a href=\"/terms\" class=\"link_First_Level\" title=\"Terms &amp; Conditions\">Terms &amp; Conditions</a> </li>";
			 			wp_list_pages('title_li=&depth=' . $depth);
			 			break;
			 		case "press.three.ie": ?>
			  <li class=""> <a href="http://www.three.ie/about3/index.html" class="link_First_Level" title="About Three">About Three</a> </li>
              <li class=""> <a href="/" class="link_First_Level" title="Media Centre">Media Centre</a>
              	<ul>
              		<?php wp_list_pages('title_li=&link_before=> &depth=' . $depth); ?>
              	</ul>
              </li>
              
              <li class=""> <a href="http://www.three.ie/about3/corporate_responsibility/index.html" class="link_First_Level" title="Corporate Responsibility">Corporate Responsibility</a><!-- InstanceBeginEditable name="CorpResp-submenu" --><!-- InstanceEndEditable --> </li>
              <li class=""> <a href="http://www.three.ie/about3/sponsorship/index.html" class="link_First_Level" title="Sponsorship">Sponsorship</a><!-- InstanceBeginEditable name="Sponsorship-submenu" --><!-- InstanceEndEditable --> </li>
              <li class=""> <a href="http://www.three.ie/about3/charity/index.html" class="link_First_Level" title="Charity">Charity</a><!-- InstanceBeginEditable name="Charity-submenu" --><!-- InstanceEndEditable --> </li>
              <li class=""> <a href="http://www.three.ie/about3/wholesale/index.html" class="link_First_Level" title="Wholesale Interconnect">Wholesale Interconnect</a> </li>
              <li class=""> <a href="http://www.three.ie/about3/contact3/index.html" class="link_First_Level" title="Contact 3">Contact 3</a> </li>
              
			 <?php 			break;
			 		default:
			 			break;
			 	}
				 ?>
            </ul>
            
            <div class="clear"> </div>
          </div>
        </div>
        <div class="clear"></div>
        
        <div class="box_Bottom"> </div>
      </div>
      <div class="clearBoth">&nbsp;</div>

    </div>
    