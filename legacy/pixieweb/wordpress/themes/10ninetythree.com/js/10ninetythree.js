$(function() {
	$('div.intro-content').on('click', function(){
		// Which one is clicked
		$('body').removeClass('bg-color-left bg-color-right').addClass('bg-color-' + ($(this).parent().hasClass('side-left') ? 'left' : 'right'));
	});
	$('#open-menu').on('click', function(){
		$(this).siblings("nav:first").toggleClass('open');
		return false;
	})
	/*
	$('a.back-right, a.back-left').on('click', function(){
		$('body').removeClass('bg-color-left bg-color-right');
	})
	*/
	$( '#dl-menu' ).dlmenu();
});