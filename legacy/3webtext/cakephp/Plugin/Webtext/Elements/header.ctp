<div class="box_Header">
  <h1 class="box_Logo"> <a title="Three.ie" href="http://www.three.ie/">Three.ie</a> </h1>
   <div class="clear"></div>
  <?php 
  
  		if(isset($display_menu)) :
  			if($display_menu):
  				echo $this->element('menu');
  			endif;
  		else:
  			echo $this->element('menu');
  		endif;  
  ?>
  <div class="clear"></div>
  <script type="text/javascript">$(function() { initMenu(); } );</script>
  <div class="clear"></div>
  <p class="telesales">Buy online or <span>call us on 1800 949 546.</span></p>
  <ul class="list_Menu_Links">
    <li class="last"><a href="http://webtext.three.ie">Webtext</a></li>
    <li><a href="https://my3.three.ie">Login to My3</a></li>
  </ul>
  <ul class="list_Menu_Social">
    <li class="li_First"> <a title="Follow us on Twitter" class="btn_Twitter" href="http://www.twitter.com/3online" target="_blank">Follow us on Twitter&reg; </a> </li>
    <li> <a title="Visit our YouTube&reg; channel" class="btn_Youtube" href="http://www.youtube.com/ThreeIreland" target="_blank">Visit our YouTube&reg; channel</a> </li>
    <li class="li_Last"> <a title="Like us on Facebook" class="btn_Facebook" href="http://www.facebook.com/3Ireland" target="_blank">Like us on Facebook&trade;</a> </li>
  </ul>
  <ul class="list_Menu_Search">
    <li>
      <form id="SearchBox" action="http://www.three.ie/search.htm" method="get" class="searchbox">
        <input class="searchquery js_FocusInput" type="text" id="q" value="Search three.ie" name="q" mask="Search three.ie"/>
        <input name="submit" type="submit" value="" class="searchbtn" />
      </form>
    </li>
  </ul>
</div>
