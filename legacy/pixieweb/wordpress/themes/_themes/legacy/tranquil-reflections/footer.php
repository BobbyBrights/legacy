<div id="footer">

<div class="social">			
						<table width="148" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td align="center"><a href="<?php $options = get_option('tranquil_theme_options'); echo $options['Facebook'];?>"><img src="<?php bloginfo('template_url'); ?>/images/facebook.png" alt="" border="0"/></a></td>
							<td align="center"><a href="<?php $options = get_option('tranquil_theme_options'); echo $options['Twitter'];?>"><img src="<?php bloginfo('template_url'); ?>/images/twitter.png" alt="" border="0"/></a></td>
							<td align="center"><a href="./?feed=rss2"><img src="<?php bloginfo('template_url'); ?>/images/rss.png" alt="" border="0"/></a></td>
						</tr>
					</table>
				</div>
				
        <p>&copy; <?php echo date("Y")?> <!-- It is completely optional, but if you like the Theme I would appreciate it if you keep the credit link at the bottom --><?php bloginfo('name'); ?> | Theme Design by <a href="http://www.liight.com">liight</a> | Powered by <a href="http://wordpress.org/">WordPress</a></p>
        
<div id="footer-menu">    
         
 	<?php wp_nav_menu( array('sort_column' => 'menu_order', 'theme_location' => 'footer-menu') ); ?>
 
</div>
</div>