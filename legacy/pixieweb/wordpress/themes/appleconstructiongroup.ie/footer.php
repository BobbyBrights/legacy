
<!--Start Footer Wrapper-->
<div class="footer-wrapper">
    <!--Start Wrapper-->
    <div class="container_24">
        <div class="grid_24">
            <div class="footer">
                <?php
                /* A sidebar in the footer? Yep. You can can customize
                 * your footer with four columns of widgets.
                 */
                get_sidebar('footer');
                ?>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</div>
<!--End Wrapper-->
<!--End Footer Wrapper-->
<!--Start Footer Bottom-->
<div class="footer_bottom">
    <!--Start Wrapper-->
    <div class="wrapper">
        <div class="container_24">
            <div class="grid_24">
                <div class="footer_bottom_content">
				<p class="theme_desc"><?php echo get_bloginfo ( 'title' ); ?> - &copy; Apple Construction Group Ltd. 2012.</p>
				<!--
                    <?php if (bizway_get_option('bizway_footertext') != '') { ?>
                        <p class="copyright"><?php echo bizway_get_option('bizway_footertext'); ?></p> 
                    <?php } else { ?>
                        <p class="copyright">Bizway Responsive Theme <?php _e( 'Designed by', 'bizway' ); ?><a href="http://www.inkthemes.com"> InkThemes.com</a></p>
                    <?php } ?>
                -->
                </div>
            </div>
        </div>
    </div>
    <!--End Wrapper-->
</div>
<!--End Footer Bottom-->
<?php wp_footer(); ?>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-33989095-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>