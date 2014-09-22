<?php // Do not delete these lines
	if (!empty($_SERVER['SCRIPT_FILENAME']) && 'comments.php' == basename($_SERVER['SCRIPT_FILENAME'])) {
		die ('Please do not load this page directly. Thanks!');
	}

	if ( post_password_required() ) {
		echo '<p class="nocomments">This post is password protected. Enter the password to view comments.</p>';
		return;
	}
?>
<!-- You can start editing here. -->
<?php if ( have_comments() ) : ?>
	<h2 class="commentheading" id="comments"><?php comments_number('No Comments', '1  Comment', '% Comments' );?></h2>
	<ol class="commentlist">
		<?php wp_list_comments(); ?>
	</ol>
	<div class="navigation commentnavigation">
		<div class="alignleft"><?php previous_comments_link() ?></div>
		<div class="alignright"><?php next_comments_link() ?></div>
	</div>
<?php endif; ?>
<?php if ('open' == $post->comment_status) : ?>
<?php if ( get_option('comment_registration') && !$user_ID ) : ?>
<p class="commentsclosed">You must be <a href="<?php echo get_option('siteurl'); ?>/wp-login.php?redirect_to=<?php echo urlencode(get_permalink()); ?>">logged in</a> to post a comment.</p>
<?php else : ?>
<?php comment_form(); ?>
<?php endif; // If registration required and not logged in ?>
<?php else: // If comments are closed ?>
	<!--p class="commentsclosed">Comments are closed.</p-->
<?php endif; // if you delete this the sky will fall on your head ?>
