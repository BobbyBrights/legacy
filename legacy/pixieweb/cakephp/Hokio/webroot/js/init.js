$(document).ready(function(){
	// Fix pagination
	$.each($('div.pagination ul li'), function(){
		if($(this).find('a').size() == 0){
			var $t = $(this).text();
			$(this).empty().append("<a href='#'>" + $t + "</a>"); 
		}
	});
	
	// Fix checkbox styling
	$.each($('div.checkboxes div'), function(){
		var $t = $(this);
		$t.addClass("span2");
	});
	
}); 


