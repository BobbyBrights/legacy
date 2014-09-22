(function($) {
	
	function pointFill (parent){
		var children = $(parent).children();
		var parentWidth = $(parent).width();
		var leftWidth = $(children[0]).width();
		var rightWidth = $(children[2]).width();
		
		centerWidth = parentWidth - (leftWidth + rightWidth + 10); 
		
		$(children[1]).text('...........................................................................................................................................................................................................................................................');
		$(children[1]).width(centerWidth);
	};
	
	$.fn.PointFill = function(method) {
		selfArgs = arguments;
		return this.each(function() {
			pointFill($(this));
		});
	};
	
})($);