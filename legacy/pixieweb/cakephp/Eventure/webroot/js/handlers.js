$(document).ready(function(){
	// Initialize knobs
	$(".knob").knob();
	
	$('#EventStartDate').datetimepicker({
      language: 'en'
    });
    
	$('#EventEndDate').datetimepicker({
      language: 'en'
    });
            
	// Fix some span classes
	$('div.alert').each(function(){
		$(this).addClass($(this).prev("input, select").attr("class"));
	});
	// 
	$('div.checkbox-group > div').each(function(){
		$(this).removeClass('span6');
	});
	
	var $a = $('#CheckinAttendeeId'); 
	var $c = $('#CheckinAccreditationId');
	$c.empty();
	// Accreditation picker
	$a.on('change', function(){
		update_accreditations($(this), $c);		
	});
	
	$('a.refresh-accreditations').on('click', function(){
		update_accreditations($('#CheckinAttendeeId'), $c);	
		return false;	
	});
	
	//draw_chart();		
	
	// Fix pagination
	$.each($('div.pagination ul li'), function(){
		if($(this).find('a').size() == 0){
			var $t = $(this).text();
			$(this).empty().append("<a href='#'>" + $t + "</a>"); 
		}
	});
	// Typeahead 
	$('.predict').each(function(){
		var $model = $(this).data('model');
		var $field = $(this).data('field');
		
		console.log($model);
		console.log($field);
		
		(function(el, f, m){
			 
			el.typeahead({ 
			    source: function (query, process) {
			    	var $url = '/eventure/'+m+'/json/' + $field + ':' + query + "/?ta=" + $field;
			    	console.log($url);
			    	
			        $.get($url, 
			            function (data) {
			                return process(JSON.parse(data));
			            }
			        );
			    }
			});							
		})($(this), $field, $model)
	});
	
	// Add padding to error messages 
	$('p.error').parent().addClass("error-message");
}); 

function update_accreditations($t, $c){
	var $id = $t.val(); 		
	$c.empty().prop('disabled', false);
	
	if($id != ''){
		$c.empty().append("<option>Loading, please wait..</option>");
		var $jqxhr = $.ajax('/eventure/attendees_accreditations/json/attendee_id:' + $id, function(){
			
		}).done(function(data){
			$c.empty();
			data = JSON.parse(data);
			if(data.length > 0){
				$c.empty();
				for(var i in data){
					var $d = data[i];
					$c.append("<option value='"+$d.Accreditation.id+"'>"+$d.Event.name+" - " +$d.AccreditationType.name+"</option>");
				}
				$c.prop('disabled', false);
			} else {
				$c.empty().append("<option>No accreditations</option>").prop('disabled', true);
			}
			// This is our attendee data
		}).fail(function(data){
			console.log('Fail');
		}).always(function(data){
			
		});
		
	}	
}

function draw_chart(){
	var d1 = [];
	for (var i = 0; i < 14; i += 0.5) {
		d1.push([i, Math.sin(i)]);
	}

	var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];

	var d3 = [];
	for (var i = 0; i < 14; i += 0.5) {
		d3.push([i, Math.cos(i)]);
	}

	var d4 = [];
	for (var i = 0; i < 14; i += 0.1) {
		d4.push([i, Math.sqrt(i * 10)]);
	}

	var d5 = [];
	for (var i = 0; i < 14; i += 0.5) {
		d5.push([i, Math.sqrt(i)]);
	}

	var d6 = [];
	for (var i = 0; i < 14; i += 0.5 + Math.random()) {
		d6.push([i, Math.sqrt(2*i + Math.sin(i) + 5)]);
	}

	$.plot("#placeholder", [{
		data: d1,
		lines: { show: true, fill: true }
	}, {
		data: d2,
		bars: { show: true }
	}, {
		data: d3,
		points: { show: true }
	}, {
		data: d4,
		lines: { show: true }
	}, {
		data: d5,
		lines: { show: true },
		points: { show: true }
	}, {
		data: d6,
		lines: { show: true, steps: true }
	}]);	
}