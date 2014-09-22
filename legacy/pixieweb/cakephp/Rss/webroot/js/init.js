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
	
	update_selected_categories();
	$('div.categories input[type=checkbox]').on('change', function(e){
		update_selected_categories(); 
	});
		
}); 

function update_selected_categories(){
	var $d = $('div.categories input[type=checkbox]:checked');
	$('#selected_categories').empty();
	
	$d.each(function(i, j){
		var $id = $(this).attr("id").replace(/[^0-9]+/g, "");
		var $tx = $(this).siblings("label:first").text();

		//<span class="label label-info"><a href="#" class="close">&times;</a> Info </span>
		var $i = $(document.createElement("span")).addClass("label label-info selected");
		$i.attr("id", "category_" + $id);
		
		$i.append(
			$(document.createElement("a")).addClass("close category-info").append("&times;")
		).append(" " + $tx);
		$i.appendTo($('#selected_categories'));
	});
	
	if($('#selected_categories').children().size() > 0){
		$('#selected_categories').prepend($(document.createElement("h2")).append("Selected categories"));
	}
		
	$('a.category-info').on('click', function(e){
		$('#ItemCategoryId' + $(this).parent().attr("id").replace(/[^0-9]+/g, "")).prop("checked", false);
		update_selected_categories(); 
	});
}


