       <?php if ( post_password_required() ) : ?>
		<p class="nocomments">This post is password protected. Enter the password to view comments.<p>
<?php
		return;
	endif;		
?>		

<!-- You can start editing here. -->

<?php if ($comments) : ?>


<div class="navigation">
<?php paginate_comments_links('prev_text=<< Older Comments&next_text=Newer Comments >>'); ?> 
</div>


<?php wp_list_comments('type=comment'); ?>

<?php wp_list_comments('type=pings'); ?>
<?php wp_list_comments('type=trackbacks'); ?>


<div class="navigation">
<?php paginate_comments_links('prev_text=<< Older Comments&next_text=Newer Comments >>'); ?> 
</div>


 <?php else : // this is displayed if there are no comments so far ?>

  <?php if ('open' == $post->comment_status) : ?>
                <!-- If comments are open, but there are no comments. -->

         <?php else : // comments are closed ?>
                <!-- If comments are closed. -->
                <p class="nocomments">Comments are closed.</p>

        <?php endif; ?>
<?php endif; ?>


<?php if ('open' == $post->comment_status) : ?>

<br />

<?php if ( get_option('comment_registration') && !$user_ID ) : ?>
<p>You must be <a href="<?php echo get_option('siteurl'); ?>/wp-login.php?redirect_to=<?php the_permalink(); ?>">logged in</a> to post a comment.</p>
<?php else : ?>

<?php comment_form(); ?>

	


<?php endif; // If registration required and not logged in ?>

<?php endif; // if you delete this the sky will fall on your head ?>