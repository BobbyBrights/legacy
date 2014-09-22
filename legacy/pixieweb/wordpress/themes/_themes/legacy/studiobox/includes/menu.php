	<ul>
		<li><a href="<?php echo get_option('home'); ?>">Home</a></li>
		
		<?php if ($studiobox_menucat=="Enable"){ ?>
			<?php  // Modifying to populate all Categories

	
			//This is where the subcategory is pulled down
			 $categories = wp_list_categories('echo=0&exclude='.$studiobox_excludemenucat.'&title_li=&sort_column=menu_order');  
			 $categories = preg_replace('/title=\"(.*?)\"/','',$categories);  // Get rid of href Titles in the menu. A Distraction
			 echo $categories;  
	

			?>
		<?php } else { ?>
		
			<li><a href="<?php echo get_option('home'); ?>/?cat=<?php echo m_get_category_id($studiobox_portfolio); ?>">Portfolio</a>
			<?php //START OF DROP DOWN MENU CODE  If you don't want sub categories then delete this 

			if ($studiobox_portdropdown=="Enable"){ 
				print ("<ul>");
		
				//This is where the subcategory is pulled down
				 $categories = wp_list_categories('echo=0&child_of='.m_get_category_id($studiobox_portfolio).'&title_li=&sort_column=menu_order');  
				 $categories = preg_replace('/title=\"(.*?)\"/','',$categories);  // Get rid of href Titles in the menu. A Distraction
				 echo $categories;  
		
				print ("</ul>");
			}
			 ?>
			</li>
			<li><a href="<?php echo get_option('home'); ?>/?cat=<?php echo m_get_category_id($studiobox_gallery); ?>">Gallery</a>
			<?php //START OF DROP DOWN MENU CODE  If you don't want sub categories then delete this 
			$categories="";
			if ($studiobox_gallerydropdown=="Enable"){ 
				print ("<ul>");
		
				//This is where the subcategory is pulled down
				 $categories = wp_list_categories('echo=0&child_of='.m_get_category_id($studiobox_gallery).'&title_li=&sort_column=menu_order');  
				 $categories = preg_replace('/title=\"(.*?)\"/','',$categories);  // Get rid of href Titles in the menu. A Distraction
				 echo $categories;  
		
				print ("</ul>");
			}
			 ?>
			 
			</li>
			<li><a href="<?php echo get_option('home'); ?>/?cat=<?php echo m_get_category_id($studiobox_blog); ?>">Blog</a></li>
		<?php } ?>
		<?php if ($studiobox_menupages=="Enable") { 
			$pages = wp_list_pages('echo=0&exclude='.$studiobox_excludemenupages.'&title_li=&sort_column=menu_order');  
			$pages = preg_replace('/title=\"(.*?)\"/','',$pages);  // Get rid of href Titles in the menu. A Distraction
			echo $pages;
		} else { ?>
			<li><a href="<?php echo get_option('home'); ?>/?page_id=<?php echo $studiobox_about_id; ?>">About</a></li>
			<li><a href="<?php echo get_option('home'); ?>/?page_id=<?php echo $studiobox_contact_id; ?>">Contact</a></li>
		<?php } ?>
	</ul>