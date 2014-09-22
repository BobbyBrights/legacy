$(document).ready(function(){
	// Fix pagination
	$.each($('div.pagination ul li'), function(){
		if($(this).find('a').size() == 0){
			var $t = $(this).text();
			$(this).empty().append("<a href='#'>" + $t + "</a>"); 
		}
	});
	
	$('.add_attachment_field').bind({
		click: function(e){
			e.preventDefault();
			console.log(e);
			
			var $d = $('#TicketAttachment').parent().clone();
			console.log($d);
		}
	});
	
})