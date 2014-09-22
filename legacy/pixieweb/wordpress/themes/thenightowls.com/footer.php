



                </div>	
                <!-- Content Section ends here -->	
                
                <!-- Footer Section starts here -->
                <div id="footer_section">
                    
                    
                                            <div id="bottomfooterwidgetcontainer">
                                                <div class="bottomfooterwidgety">

                                                        <div class="footerp"><?php _e('&copy; All rights reserved.', 'Destro') ?></div>
                                                        <?php if( is_home() || is_front_page() ): ?>
                                                        <div class="footercredit">
															<?php _e('Powered by ', 'Destro') ?><a href="http://www.wordpress.org/"><?php _e('WordPress', 'Destro') ?></a> <?php _e(' | ', 'Destro') ?> <?php _e('Designed by ', 'Destro') ?><a href="http://www.themealley.com/"><?php _e('ThemeAlley.Com', 'Destro') ?></a>
                                                        </div>
                                                        <?php else: ?>
                                                        <div class="footercredit">
															<?php _e('Powered by ', 'Destro') ?><a href="http://www.wordpress.org/"><?php _e('WordPress', 'Destro') ?></a>
                                                        </div>                                                        
														<?php endif;?>
                                                </div>
                                            </div>	                
                    
                    
                    
                    
           
                 </div>	
                 <!-- Footer Section ends here -->	
                                                              
			</div>	
			<!-- Wrapper two ends here -->	
            
		</div>	
		<!-- Wrapper three ends here -->           
	</div>	
	<!-- Wrapper four ends here -->	            				
	</div>	
	<!-- Wrapper one ends here -->	


<?php 
	if ( of_get_option('twitter_id') ){
	echo Destro_twitter_script('1985',of_get_option('twitter_id'),2); //Javascript output function 
	}
?>
<?php wp_footer(); ?>
</body>
</html>