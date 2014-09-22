  $(function() {
  	var $container = $('#gallery');
  	$container.imagesLoaded(function() {
  		$container.masonry({
  			itemSelector: '.box',
  			columnWidth: 290
  		});
  	});
  	$(".sortable").sortable({
  		stop: function(event, ui) {
  			update_indexes();
  		}
  	});
  	$(".sortable").disableSelection();
  	update_indexes();
  	$("#a_i").autocomplete({
  		minLength: 5,
  		source: function(request, response) {
  			var term = request.term;
  			$.getJSON("/news/items/json/autocomplete:true/filter:" + term, request, function(data, status, xhr) {
  				console.log(data);
  				response(data);
  			});
  		},
  		select: function(event, ui) {
  			event.preventDefault();
  			console.log(ui.item ? "Selected: " + ui.item.value + " aka " + ui.item.id : "Nothing selected, input was " + this.value);
  			var $inp = $(document.createElement("input")).attr("type", "hidden").attr("name", "cfg[latest_news][]").attr("value", ui.item.id);
  			var $close = $(document.createElement("a")).addClass("close").append("&times;");
  			// Add it to the list.
  			var $li = $(document.createElement("li")).addClass("just_added").append(ui.item.value).append($inp).append($close);
  			$li.prependTo($('#latest_news'));
  			$('#latest_news li').removeClass('just_added');
  			update_indexes();
  			$('a.close').bind('click', remove_item);
  			$(this).val("");
  			return false;
  		}
  	});
  	$('a.close').on('click', remove_item);
  });

  function remove_item(e) {
  	$(e.target).parent().remove();
  	update_indexes();
  }

  function update_indexes() {
  	console.log("Updating indexes");
  	var $a = new Array();
  	$('#latest_news li').each(function(i, j) {
  		$a.push($(this).find("input").val());
  	});
  	$('#latest_news_items').val($a);
  }