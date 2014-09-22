<!DOCTYPE html>
<!--[if IEMobile 7 ]>    <html class="no-js iem7"> <![endif]-->
<!--[if (gt IEMobile 7)|!(IEMobile)]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <title></title>
        <meta name="description" content="">
        <meta name="HandheldFriendly" content="True">
        <meta name="MobileOptimized" content="320">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="cleartype" content="on">

        <!-- This script prevents links from opening in Mobile Safari. https://gist.github.com/1042026 -->
        <!--
        <script>(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")</script>
        -->
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.1/jquery.mobile-1.2.1.min.css" />
		<script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.2.1/jquery.mobile-1.2.1.min.js"></script>
 
        <link rel="stylesheet" href="/train_pi/css/normalize.css">
        <link rel="stylesheet" href="/train_pi/css/main.css">
        <script src="/train_pi/js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body>

        <!-- Add your site or application content here -->
		
<div data-role="page">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo">TrainPI</h1>
		<a href="#" data-icon="grid" class="locate">Locate</a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<?php echo $this->fetch('content'); ?>

	</div><!-- /content -->

	<div data-role="footer" data-position="fixed">
	<h1>by Stephen :)</h1>
</div>

</div><!-- /page -->		
		
        <script src="/train_pi/js/vendor/zepto.min.js"></script>
        <script src="/train_pi/js/helper.js"></script>
        <script src="/train_pi/js/trainpi.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            var _gaq=[["_setAccount","UA-XXXXX-X"],["_trackPageview"]];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
            g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
            s.parentNode.insertBefore(g,s)}(document,"script"));
        </script>
    </body>
</html>
