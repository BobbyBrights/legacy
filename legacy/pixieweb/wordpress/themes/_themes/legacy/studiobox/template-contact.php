<?php
/*
Template Name: Contact Form Template
*/
?>


<?php 
//If the form is submitted
if(isset($_POST['submitted'])) {

	//Check to see if the honeypot captcha field was filled in
	if(trim($_POST['checking']) !== '') {
		$captchaError = true;
	} else {
	
		//Check to make sure that the name field is not empty
		if(trim($_POST['contactName']) === '') {
			$nameError = 'You forgot to enter your name.';
			$hasError = true;
		} else {
			$name = trim($_POST['contactName']);
		}
		
		//Check to make sure sure that a valid email address is submitted
		if(trim($_POST['email']) === '')  {
			$emailError = 'You forgot to enter your email address.';
			$hasError = true;
		} else if (!eregi("^[A-Z0-9._%-]+@[A-Z0-9._%-]+\.[A-Z]{2,4}$", trim($_POST['email']))) {
			$emailError = 'You entered an invalid email address.';
			$hasError = true;
		} else {
			$email = trim($_POST['email']);
		}
			
		//Check to make sure message were entered	
		if(trim($_POST['message']) === '') {
			$commentError = 'You forgot to enter your message.';
			$hasError = true;
		} else {
			if(function_exists('stripslashes')) {
				$message = stripslashes(trim($_POST['message']));
			} else {
				$message = trim($_POST['message']);
			}
		}
			
		//If there is no error, send the email
		if(!isset($hasError)) {

			$emailTo = get_option ('studiobox_contactemail');
			$subject = 'Contact Form Submission from '.$name;
			$sendCopy = trim($_POST['sendCopy']);
			$body = "Name: $name \n\nEmail: $email \n\nComments: $message";
			$headers = 'From: sitemail <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $email;
			
			mail($emailTo, $subject, $body, $headers);

			$emailSent = true;

		}
	}
} ?>


<?php get_header(); ?>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/js/contact-form.js"></script>

	<div id="fullwidth-categorytitle">
	<?php the_title(); ?>
	</div>

	<div id="contents">

<?php if(isset($emailSent) && $emailSent == true) { ?>

	<div class="thanks">
		<h1>Thanks, <?=$name;?></h1>
		<p>Your email was successfully sent. I will be in touch soon.</p>
	</div>

<?php } else { ?>

	<?php if (have_posts()) : ?>
	
	<?php while (have_posts()) : the_post(); ?>
		

		
		<?php if(isset($hasError) || isset($captchaError)) { ?>
		<p class="error">There was an error submitting the form.<p>
		<?php } ?>
		
		<div class="contactinfo">


			<?php the_content(); ?>

		
		</div>
	
		<form action="<?php the_permalink(); ?>" id="contactForm" method="post">
	
			<ol class="forms">
				<li><label for="contactName">Name</label></li>
				<li class="inputbar">
					<input type="text" name="contactName" id="contactName" value="<?php if(isset($_POST['contactName'])) echo $_POST['contactName'];?>" class="requiredField" />
					<?php if($nameError != '') { ?>
						<span class="error"><?=$nameError;?></span> 
					<?php } ?>
				</li>
				
				<li><label for="email">Email</label></li>
				<li class="inputbar">
					<input type="text" name="email" id="email" value="<?php if(isset($_POST['email']))  echo $_POST['email'];?>" class="requiredField email" />
					<?php if($emailError != '') { ?>
						<span class="error"><?=$emailError;?></span>
					<?php } ?>
				</li>
				
				<li class="textarea"><label for="commentsText">Message</label></li>
				<li class="inputbar">
					<textarea name="message" id="commentsText" rows="20" cols="30" class="requiredField"><?php if(isset($_POST['message'])) { if(function_exists('stripslashes')) { echo stripslashes($_POST['message']); } else { echo $_POST['message']; } } ?></textarea>
					<?php if($commentError != '') { ?>
						<span class="error"><?=$commentError;?></span> 
					<?php } ?>
				</li>
				<li class="screenReader"><label for="checking" class="screenReader">If you want to submit this form, do not enter anything in this field</label><input type="text" name="checking" id="checking" class="screenReader" value="<?php if(isset($_POST['checking']))  echo $_POST['checking'];?>" /></li>
				<li class="buttons"><input type="hidden" name="submitted" id="submitted" value="true" /><button type="submit">Send</button></li>
			</ol>
			
		</form>
		

		
	</div>
	
		<?php endwhile; ?>
	<?php endif; ?>
<?php } ?>

		<div class="clear"></div>
		
	</div> <!-- Close Mainpage -->

<?php get_footer(); ?>
	