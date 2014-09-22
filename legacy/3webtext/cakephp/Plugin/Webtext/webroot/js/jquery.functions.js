colorize('#09C', 0);
var globalTimeout = null;

$(document).ready(function(){
	$('a.confirm').bind({
		click: function(e){
			return confirm('Are you sure you want to complete this action? It cannot be undone.');
		}
	});
	$('div.scheduled_date').toggle($('#MessageSchedule').prop('checked'));
	$('#MessageSchedule').bind({
		click: function(e){
			$('div.scheduled_date').toggle($(this).prop('checked'));
		}
	});
	
	var $group = new Array();
	$group['All'] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];
	$group['A - C'] = ['A','B','C'];
	$group['D - F'] = ['D','E','F'];
	$group['G - J'] = ['G','H','I', 'J'];
	$group['K - N'] = ['K','L','M', 'N'];
	$group['O - R'] = ['O','P','Q','R'];
	$group['S - Z'] = ['S','T','U','V','W','X','Y','Z'];
	$group['0 - 9'] = ['0','1','2','3','4','5','6','7','8','9'];

	var $h = $('#dyna_contacts_table tr:first');
	var $n = $h.children().size();
	//console.log($n);
	
	var $t = $(document.createElement("tr")).addClass("static");
	var $x = $(document.createElement("th")).attr("colspan", $n);
	for(var i in $group){	
		var $o = $group[i]
		var $a = $(document.createElement("a")).text(i).addClass("spaced filter").attr("data-filter", $o).attr("href", "javascript:void(0);");
		$a.appendTo($x);
	}	
	var $s = $(document.createElement("input")).attr("type", "text").attr("id", "contact_search").attr("name", "search");
	$x.append($s);
	var $i = $(document.createElement("img")).attr("src", "/webtext/imgs/search-icon.png").attr("id", "search_icon").attr("alt", "Search contacts").attr("width", "15").attr("height", "15");
	$x.append($i);
	
	$t.append($x);
	

	
	$num_contacts = parseInt($('#dyna_contacts_table').attr('data-contacts-count')); 
	if($num_contacts > 0){
		$('#dyna_contacts_table thead').prepend($t);		
	}
	
	$('a.filter').bind({
		click: function(){
			// Clear the search box
			$('#contact_search').val("");
			// Untick the check all box
			$('#check_all, input.delete_multiple').prop("checked", false);
			filter($('#dyna_contacts_table'), $(this).attr('data-filter'));
		}
	})
			
	$('.send_btn').bind({
		click: function(e){
			$count = 0;
			var $c = $('#MessageRecipientsContacts option:selected').size();
			$count += $c;
			
			var $g = $('#MessageRecipientsGroups option:selected');
			$.each($g, function(i, j){
				var $t = $(this).text().match(/\((\d+)\)/)[1];
				
				var $i = parseInt($t);
				if(is_int($i)){
					$count += $i;
				}
			});
			
			//var $g = parseInt($('#MessageRecipientsGroups option:selected').val().match(/\((\d+)\)/)[1]);
			
			if($('#MessageRecipientsIndividual').val() != ''){
				var $j = $('#MessageRecipientsIndividual').val().split(",").length;
				$count += $j;
			}
			
			//console.log($count);
			
			//return false;
			return true;
		}
	});
	
	$('#check_all').bind({
		click: function(){
			var $c = $(this);
			$('tr.contact_row:visible').find('input.delete_multiple').prop("checked", $c.prop("checked"));
			$('tr.delete_multiple_contacts').toggle($c.prop("checked"));	
			
		}
	});
	
	$('button.delete_multiple').bind({
		click: function(){
			return confirm('Are you sure you want to delete ' + $('input.delete_multiple:checked').size() + ' contacts? This cannot be undone.');
		}
	});
	
	 
	
	$('#contact_search').bind({
		keyup: function(){
			$('tr.no_matches').hide();
			if(globalTimeout != null) clearTimeout(globalTimeout);  
  			globalTimeout = setTimeout(call_search_func, 200); 
		}
	})
});

function call_search_func(){
	globalTimeout = null; 
	$('#dyna_contacts_table tr.contact_row').hide();
	$.each($('#dyna_contacts_table tr.contact_row'), function(i, j){
		var $t = $(this); 
		var $d = $t.find("td.address:first").text();
		var re = new RegExp($('#contact_search').val(), 'ig');
		if($d.match(re)){
			$t.show();
		}		
	});
}


function filter($table, $opts){
	$table.find("tr").not('.static').hide();
	$opts_array = $opts.split(",");
	$count = 0; 
	for(var i in $opts_array){
		$count += $table.find("tr._" + $opts_array[i]).size();
		$table.find("tr._" + $opts_array[i]).fadeIn();
	}
	if($count == 0){
		$table.find("tr.no_matches").fadeIn();
	}
}

function is_int(value){ 
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
      return true;
  }
  return false;
}