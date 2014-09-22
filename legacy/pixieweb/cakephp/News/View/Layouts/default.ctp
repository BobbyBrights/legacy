<!DOCTYPE html>
<html lang="en">
<head>
<?php echo $this->Html->charset(); ?>  
<meta name="viewport" content="initial-scale=1" />
<title><?php echo $this->fetch('title'); ?></title>
<meta name="author" content="Web Design Office, Trinity College Dublin" />
<meta name="description" content="Default Template" />
<meta name="keywords" content="template,default,trinity college dublin,university,ireland,irish,universities,tcd,national,university of dublin,research,academic,study,studying,undergraduate,postgraduate"  />
<link rel="search" href="//www.tcd.ie/assets/xml/tcd-opensearch/tcd-opensearch.xml" title="Trinity College Dublin" type="application/opensearchdescription+xml" />
<link rel="shortcut icon"  href="//www.tcd.ie/favicon.ico" type="image/x-icon" />
<!-- HTML5Shiv: https://github.com/aFarkas/html5shiv -->
<!--[if lt IE 9]>
<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.6.1/html5shiv.js"></script>
<![endif]-->

<script src="//www.tcd.ie/assets/js/jquery/1.8.2/jquery.min.js" type="text/javascript"></script>
<script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />
<script src="/news/js/jquery.masonry.js" type="text/javascript"></script>
<script src="/news/js/ckeditor/ckeditor.js" type="text/javascript"></script>

<!-- TCD Search Assets -->
<script>
//<![CDATA[
var tcdSearchApp = tcdSearchApp || {};
tcdSearchApp.obj = {"outputEncoding":"utf-8", "collections": {"site":{"title":"Web Design Office","fallbackURL":"http://search.tcd.ie/search?proxystylesheet=default_frontend&sitesearch=http://www.tcd.ie/webdesign&q=","engine":"googleappliance","engineParams":{"site":"","sitesearch":"http://www.tcd.ie/webdesign"},"acceptCharset":"utf-8"},"alltcd":{"title":"All TCD","fallbackURL":"http://search.tcd.ie/search?proxystylesheet=default_frontend&client=default_frontend&q=","engine":"googleappliance","engineParams":{"site":""},"acceptCharset":"utf-8"},"undergraduatecourses":{"title":"Undergraduate Courses","fallbackURL":"http://www.tcd.ie/courses/search.php?crs_title=","engine":"undergraduatecourses","acceptCharset":"utf-8"},"postgraduatecourses":{"title":"Postgraduate Courses","fallbackURL":"http://www.tcd.ie/courses/searchpg.php?crs_title=","engine":"postgraduatecourses","acceptCharset":"utf-8"},"people":{"title":"Staff Contacts","fallbackURL":"http://www.tcd.ie/assets/php/tcd-search/1/proxies/people.php?query=","engine":"people","acceptCharset":"utf-8"},"az":{"title":"AZ of TCD Areas","fallbackURL":"http://www.tcd.ie/az/#","engine":"az","acceptCharset":"utf-8"},"collegemaps":{"title":"TCD Maps","fallbackURL":"http://www.tcd.ie/Maps/map.php?q=","engine":"","acceptCharset":"utf-8"},"researchthemes":{"title":"Research Themes","fallbackURL":"http://www.tcd.ie/research/search/search_results.php?p_freetext=","engine":"","acceptCharset":"utf-8"},"tara":{"title":"TARA Research Archive","fallbackURL":"http://www.tara.tcd.ie/simple-search?query=","engine":"","acceptCharset":"utf-8"}}};
tcdSearchApp.serverDocRootNet = '//www.tcd.ie';
tcdSearchApp.siteDocRootNet = '//www.tcd.ie/webdesign';
tcdSearchApp.siteSearchCollection = '';
//]]>
</script>
<script src="//www.tcd.ie/assets/js/loadrunner/loadrunner.js"></script>
<script src="//www.tcd.ie/assets/php/tcd-search/1/actions.js"></script>
<link rel="stylesheet" href="//www.tcd.ie/assets/php/tcd-search/1/styles.css" media="all" />

<!-- ZXCSS -->
<!--[if lte IE 7]><link href="//www.tcd.ie/tms/m/styles/zxcss/0.5-beta/zxcss-0.5-beta-lte-ie7.min.css" rel="stylesheet" type="text/css" media="all" /><![endif]-->
<!--[if lte IE 6]><link href="//www.tcd.ie/tms/m/styles/zxcss/0.5-beta/zxcss-0.5-beta-lte-ie6.min.css" rel="stylesheet" type="text/css" media="all" /><![endif]-->
<link href="//www.tcd.ie/tms/m/styles/zxcss/0.5-beta/zxcss-0.5-beta.min.css" rel="stylesheet" type="text/css" media="all" />

<!-- Quick Tags -->
<!-- Royal Slider -->
<script src="//www.tcd.ie/assets/js/jquery-easing/1.3/jquery.easing.js" type="text/javascript"></script>
<link href="//www.tcd.ie/assets/js/jquery-royalslider/9.2/royalslider.css" rel="stylesheet" />
<link href="//www.tcd.ie/assets/js/jquery-royalslider/9.2/rs-minimal-white.css" rel="stylesheet" />
<link href="//www.tcd.ie/assets/js/jquery-royalslider/9.2/rs-default-inverted.css" rel="stylesheet" />
<link href="//www.tcd.ie/assets/js/jquery-royalslider/9.2/rs-default.css" rel="stylesheet" />
<link href="//www.tcd.ie/assets/js/jquery-royalslider/9.2/rs-trinity-theme.css" rel="stylesheet" />
<script src="//www.tcd.ie/assets/js/jquery-royalslider/9.2/jquery.royalslider.min.js" type="text/javascript"></script>
<!-- RSS Specific JS/CSS here -->

<!-- Theme CSS -->
<link rel="Stylesheet" type="text/css" href="//www.tcd.ie/tms/2/t/trinity-theme/css.php?cache=2&amp;site_index_key=%2Fwebdesign%2F" media="screen" />
<link rel="Stylesheet" type="text/css" href="//www.tcd.ie/tms/2/t/webdesign-office/css.php?cache=1&amp;site_index_key=%2Fwebdesign%2F" media="screen" />

<!-- JavaScript Paths -->
<script type="text/javascript">
var tms = {SITE_DOCROOT_NET: '//www.tcd.ie/webdesign', SERVER_DOCROOT_NET: '//www.tcd.ie', THEME_DOCROOT_NET: '//www.tcd.ie/tms/2/t/webdesign-office', theme: 'webdesign-office'};
</script>

<!-- Theme JS Actions -->
<script type="text/javascript" src="//www.tcd.ie/tms/2/t/trinity-theme/js.php?cache=1&amp;site_index_key=%2Fwebdesign%2F"></script>

<!-- Open Sans Font -->
<link href='//fonts.googleapis.com/css?family=Open+Sans:400,600,600italic,700,700italic,400italic,300,300italic' rel='stylesheet' type='text/css' />
<script type="text/javascript">

//<![CDATA[

	var _gaq = _gaq || [];

	_gaq.push(

		['_setAccount', 'UA-845128-1'],

		['_setDomainName', 'tcd.ie'],

		['_setAllowHash', false],

		['_trackPageview']

	);

	

	(function() {

		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;

		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

	})();

//]]>

</script>
<style type="text/css">
a.close { display: block; float: right;}
.autocompl { 
	width: 400px; padding: 12px; margin-bottom: 20px;
}
li.ui-menu-item { text-align: left; }
.sortable {
	list-style: none; padding-left: 0;
}
.sortable li {
	cursor: pointer;
	display: block; padding: 8px 20px; background-color: #6CF; margin-bottom: 4px; color: #FFF; font-style: normal; font-weight: bold;
	-webkit-transition: background 1s ease-out;
	-moz-transition: background 1s ease-out;
    -ms-transition: background 1s ease-out;
    -o-transition: background 1s ease-out;
	transition: background 1s ease-out;	
}

.sortable li.just_added {
	background-color: #090;
}

span.year {
	float: right; font-size: 0.575em; font-weight: 400;
}

ul.gallery {
	list-style: none; padding-left: 0!important; 
}

ul.gallery li {
	display: inline-table; margin: 0;
}

div.caption {
	width: 250px; font-size: 0.875em; padding-bottom: 12px; line-height: 14px; 
}

div.input, div.input label { display: block;}
div.input input, div.input select, div.input textarea { width: 65%; padding: 8px; line-height: 15px;}

div.submit input { display: block; width: 15%; padding: 8px; font-size: 16px; }

#flashMessage { display: block; background-color: #F90; padding: 8px; color: #FFF; font-weight: bold; margin-bottom: 20px;}
</style>
</head>

<body class="d-home-1" id="">
<div class="tier tier-tcd-header">
  <div class="tier-inner tier-inner-tcd-header">
    <div class="tier-inner-2 tier-inner-2-tcd-header"> 
      <div class="tcd-header-slim" id="tcdtop" style="font-family:Verdana, Arial, Helvetica, sans-serif;position:static;display:block;float:none;width:100%;height:auto;background:#fff;border-bottom:2px solid #0e6bae;font-size:100%;line-height:1.8em;">
        <div style="font-family:Verdana, Arial, Helvetica, sans-serif;position:static;display:block;float:left;width:100%;height:auto;background:none;border:none;font-size:100%;line-height:1.8em;">
          <p style="display:none;"><a href="#main-content">Skip to main content</a> <span>&raquo;</span></p>
          <h1 style="display:inline;position:static;float:left;width:auto;height:auto;background:none;border:0;margin:12px 0 0 12px;padding:0 0 0 0;"> <a style="cursor:pointer;display:block;position:relative;float:none;width:332px;height:33px;background:none;border:0;margin:0;padding:0;overflow:hidden;" href="//www.tcd.ie">Trinity College Dublin<span style="display:block;position:absolute;top:0;left:0;float:none;width:332px;height:33px;background:transparent url(//www.tcd.ie/img/tcdLogo.gif) top left no-repeat;"></span></a></h1>
          <form class="tcd-search" style="float:right;width:183px;height:32px;color:#688999;text-align:left;margin:15px 5px 0px 0;padding:0;border:0;background:none;" method="get" action="http://search.tcd.ie/search">
            <fieldset style="position:static;float:right;display:block;width:auto;height:auto;padding:0;margin:0;border:0;background:none;">
              <label for="search" class="cloak" style="display:none;"><span class="accelerator-key">S</span>earch TCD</label>
              <input accesskey="s" class="box" style="position:static;float:left;width:140px;height:auto;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:x-small;line-height:normal;background:#f1f4f9;border:1px solid #b1bdc9;color:#1c598f;margin:0px;padding:4px 3px 4px 8px;vertical-align:top;" type="text" name="q" id="search" value="Search TCD" onfocus="if(this.value=='Search TCD'){this.value='';this.style.color='#54575e';this.style.background='#ffffff';}else{this.select();}" onblur="if(this.value==''){this.value='Search TCD';this.style.color='#54575e';this.style.background='#EDF1F8';}" />
              <input style="position:static;display:block;float:left;width:auto;height:auto;margin:0;padding:0;border:0;" type="image" src="//www.tcd.ie/img/searchButton.gif" class="submit" alt="Go" value="go" />
              <input type="hidden" name="entqr" value="0" />
              <input type="hidden" name="ud" value="1" />
              <input type="hidden" name="sort" value="date:D:L:d1" />
              <input type="hidden" name="output" value="xml_no_dtd" />
              <input type="hidden" name="oe" value="UTF-8" />
              <input type="hidden" name="ie" value="ISO-8859-1" />
              <input type="hidden" name="client" value="default_frontend" />
              <input type="hidden" name="proxystylesheet" value="default_frontend" />
              <input type="hidden" name="site" value="default_collection" />
            </fieldset>
          </form>
          <div class="core-tabs" style="position:static;display:block;float:none;font-family:Verdana, Arial, Helvetica, sans-serif;line-height:normal;border:0;clear:both;">
            <ul id="core-tabs-list" style="position:static;display:inline;float:right;list-style-type:none;line-height:normal;margin:0px 5px 0 4px;padding:0;width:auto;height:auto;">
              <li style="position:static;display:inline;height:auto;width:auto;margin:0;padding:0;"><a style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;float:left;height:auto;width:auto;background:url(//www.tcd.ie/img/tab_l_sans.gif) no-repeat left top;margin:0;margin-right:0px;padding:0 0 0 9px;text-decoration:none;" href="//www.tcd.ie/" title="TCD Home"><span style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:x-small;font-weight:normal;font-style:normal;cursor:pointer;float:left;background:url(//www.tcd.ie/img/tab_r.gif) no-repeat right top;padding: 8px 8px 6px 0px;line-height:normal;color:#0a4e83;">TCD&nbsp;Home</span></a></li>
              <li style="position:static;display:inline;height:auto;width:auto;margin:0;padding:0;"><a style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;float:left;height:auto;width:auto;background:url(//www.tcd.ie/img/tab_l.gif) no-repeat left top;margin:0;margin-right:0px;padding:0 0 0 9px;text-decoration:none;" href="//www.tcd.ie/structure/" title="Visit Faculties &amp; Schools"><span style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:x-small;font-weight:normal;font-style:normal;cursor:pointer;float:left;background:url(//www.tcd.ie/img/tab_r.gif) no-repeat right top;padding: 8px 8px 6px 0px;line-height:normal;color:#0a4e83;">Faculties&nbsp;&amp;&nbsp;Schools</span></a></li>
              <li style="position:static;display:inline;height:auto;width:auto;margin:0;padding:0;"><a style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;float:left;height:auto;width:auto;background:url(//www.tcd.ie/img/tab_l.gif) no-repeat left top;margin:0;margin-right:0px;padding:0 0 0 9px;text-decoration:none;" href="//www.tcd.ie/courses/" title="Browse TCD Courses"><span style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:x-small;font-weight:normal;font-style:normal;cursor:pointer;float:left;background:url(//www.tcd.ie/img/tab_r.gif) no-repeat right top;padding: 8px 8px 6px 0px;line-height:normal;color:#0a4e83;">Courses</span></a></li>
              <li style="position:static;display:inline;height:auto;width:auto;margin:0;padding:0;"><a style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;float:left;height:auto;width:auto;background:url(//www.tcd.ie/img/tab_l.gif) no-repeat left top;margin:0;margin-right:0px;padding:0 0 0 9px;text-decoration:none;" href="//www.tcd.ie/research/" title="Find out more about our Research"><span style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:x-small;font-weight:normal;font-style:normal;cursor:pointer;float:left;background:url(//www.tcd.ie/img/tab_r.gif) no-repeat right top;padding: 8px 8px 6px 0px;line-height:normal;color:#0a4e83;">Research</span></a></li>
              <li style="position:static;display:inline;height:auto;width:auto;margin:0;padding:0;"><a style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;float:left;height:auto;width:auto;background:url(//www.tcd.ie/img/tab_l.gif) no-repeat left top;margin:0;margin-right:0px;padding:0 0 0 9px;text-decoration:none;" href="//www.tcd.ie/services/" title="TCD Services"><span style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:x-small;font-weight:normal;font-style:normal;cursor:pointer;float:left;background:url(//www.tcd.ie/img/tab_r.gif) no-repeat right top;padding: 8px 8px 6px 0px;line-height:normal;color:#0a4e83;">Services</span></a></li>
              <li style="position:static;display:inline;height:auto;width:auto;margin:0;padding:0;"><a style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;float:left;height:auto;width:auto;background:url(//www.tcd.ie/img/tab_l.gif) no-repeat left top;margin:0;margin-right:0px;padding:0 0 0 9px;text-decoration:none;" href="//www.tcd.ie/contacts/" title="Contact Details"><span style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:x-small;font-weight:normal;font-style:normal;cursor:pointer;float:left;background:url(//www.tcd.ie/img/tab_r.gif) no-repeat right top;padding: 8px 8px 6px 0px;line-height:normal;color:#0a4e83;">Contact</span></a></li>
              <li style="position:static;display:inline;height:auto;width:auto;margin:0;padding:0;"><a style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;float:left;height:auto;width:auto;background:url(//www.tcd.ie/img/tab_l.gif) no-repeat left top;margin:0;margin-right:0px;padding:0 0 0 9px;text-decoration:none;" href="//www.tcd.ie/az/" title="TCD A-Z Listings"><span style="position:static;display:inline;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:x-small;font-weight:normal;font-style:normal;cursor:pointer;float:left;background:url(//www.tcd.ie/img/tab_r.gif) no-repeat right top;padding: 8px 8px 6px 0px;line-height:normal;color:#0a4e83;">A&nbsp;&ndash;&nbsp;Z</span></a></li>
            </ul>
          </div>
        </div>
        <div style="clear:both;width:auto;position:static;height:auto;float:none;"></div>
      </div>
    </div>
  </div>
</div>
<div class="cc">
  <div class="cc-inner">
    <div class="tier tier-site-header">
      <div class="tier-inner tier-inner-site-header">
        <div class="tier-inner-2 tier-inner-2-site-header">
          <div class="h">
            <div class="h-inner">
              <h1><a href="//www.tcd.ie/webdesign/index.php">Web Design Office<span></span></a></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tier tier-site-sub-header">
      <div class="tier-inner tier-inner-site-sub-header">
        <div class="tier-inner-2 tier-inner-2-site-sub-header">
          <div class="sh">
            <div class="breadcrumb">
              <h2>You are here</h2>
              <p><a href="//www.tcd.ie">Trinity College Dublin</a> &raquo; Web Design Office</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tier tier-site-content">
      <div class="tier-inner tier-inner-site-content">
        <div class="tier-inner-2 tier-inner-2-site-content">
          <div class="m row">
            <div class="col w3o4 p2o4 mc ie-lte-6-force-word-wrap">
              <div class="mc-inner" id="main-content">
              	<?php echo $this->Session->flash(); ?>
                <?php echo $this->fetch('content'); ?>
                <!--        
        
        
        --> 
              </div>
            </div>
            <div class="n col w1o4 p1o4">
              <div class="n-inner">
                <div class="sitemap"> 
                  <!-- Temporary search form. HTML is a modified version of the search app to make use of the styling -->
                  <div class="tcd-search-app tcd-search-app-form tcd-search-app-q-unfocussed">
                    <form method="get" action="http://search.tcd.ie/search" accept-charset="utf-8">
                      <input type="hidden" value="UTF-8" name="oe" />
                      <input type="hidden" value="UTF-8" name="ie" />
                      <input type="hidden" value="default_frontend" name="proxystylesheet" />
                      <input type="hidden" name="sitesearch" value="http://www.tcd.ie/webdesign" />
                      <div class="tcd-search-app-box">
                        <div class="tcd-search-app-box-inner"> <span class="tcd-search-app-label-wrap">
                          <label for="tcd-search-app-q1">Your query</label>
                          </span
            ><span class="tcd-search-app-q-wrap">
                          <input type="search" name="q" id="tcd-search-app-q1" placeholder="Search this site" value="" />
                          </span
            ><span class="tcd-search-app-reset-wrap"><span class="tcd-search-app-reset"></span></span
            ><span class="tcd-search-app-submit-wrap">
                          <input type="submit" value="Go" />
                          </span> </div>
                      </div>
                    </form>
                  </div>
                  <?php echo $this->element('nav'); ?>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="tier tier-site-footer">
  <div class="tier-inner tier-inner-site-footer">
    <div class="tier-inner-2 tier-inner-2-site-footer">
      <div class="f">
        <hr class="cloak" />
        <p><span class="date-modified" title="Last updated"><span>Last updated </span><span>10 April 2013</span></span> <span class="author" title="Author"><a href="mailto:webdes@tcd.ie">Web Design Office (Email)</a></span><span class="cloak">.</span></p>
      </div>
    </div>
  </div>
</div>
<div class="tier tier-tcd-footer">
  <div class="tier-inner tier-inner-tcd-footer">
    <div class="tier-inner-2 tier-inner-2-tcd-footer">
      <div class="tcd-footer-slim" style="clear:both;position:relative;display:block;float:left;width:100%;font-size:90%;background:#fff url(https://www.tcd.ie/img/tcd-footer-slim-shadow.gif) repeat-x 0 0;margin:0;padding:10px 0 60px 0;border:0;">
        <address style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:x-small;line-height:normal;font-weight:normal;font-style:normal;display:block;position:static;float:left;width:auto;height:auto;background:none;border:0;color:#1A375D;margin:0;padding:0 0 0 6px;">
        Trinity College Dublin, College Green, Dublin 2. <br />
        Central Switchboard: +353 1 896 1000.
        </address>
        <ul style="display:block;position:static;float:right;width:auto;height:auto;background:none;border:0;color:inherit;margin:0;padding:0 6px 0 0;list-style:none;text-align:right;line-height:normal;">
          <li style="display:inline;position:static;float:none;width:auto;height:auto;color:#1A375D;background:none;border:0;margin:0 0 0 0.75em;padding:0;text-align:right;line-height:normal;"><a style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:x-small;font-weight:normal;font-style:normal;line-height:normal;display:inline;position:static;float:none;width:auto;height:auto;color:#1A375D;background:none;border:0;margin:0;padding:0;" href="http://www.tcd.ie/accessibility/">Accessibility</a></li>
          <li style="display:inline;position:static;float:none;width:auto;height:auto;color:#1A375D;background:none;border:0;margin:0 0 0 0.75em;padding:0;text-align:right;line-height:normal;"><a style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:x-small;font-weight:normal;font-style:normal;line-height:normal;display:inline;position:static;float:none;width:auto;height:auto;color:#1A375D;background:none;border:0;margin:0;padding:0;" href="http://www.tcd.ie/privacy/">Privacy</a></li>
          <li style="display:inline;position:static;float:none;width:auto;height:auto;color:#1A375D;background:none;border:0;margin:0 0 0 0.75em;padding:0;text-align:right;line-height:normal;"><a style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:x-small;font-weight:normal;font-style:normal;line-height:normal;display:inline;position:static;float:none;width:auto;height:auto;color:#1A375D;background:none;border:0;margin:0;padding:0;" href="http://www.tcd.ie/disclaim/">Disclaimer</a></li>
          <li style="display:inline;position:static;float:none;width:auto;height:auto;color:#1A375D;background:none;border:0;margin:0 0 0 0.75em;padding:0;text-align:right;line-height:normal;"><a style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:x-small;font-weight:normal;font-style:normal;line-height:normal;display:inline;position:static;float:none;width:auto;height:auto;color:#1A375D;background:none;border:0;margin:0;padding:0;" href="http://www.tcd.ie/contacts/" title="Contact Details">Contact</a></li>
        </ul>
      </div>
      <div style="clear:both;"></div>
      <script type="text/javascript" src="//www.tcd.ie/uns/gataglinks.js?v=1"></script> 
    </div>
  </div>
</div>
<?php echo $this->Html->script('/news/js/news');?> 
</body>
</html>