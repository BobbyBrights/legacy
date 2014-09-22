
$(document).bind('pageinit', function(e){
    if(navigator.geolocation){
		find_location(); 
    }
    
    $('a.locate').bind('click', find_location);

  
});



function find_location(){
	 navigator.geolocation.getCurrentPosition(handleGetCurrentPosition, onError);
}

function handleGetCurrentPosition(location){
	    	
	console.log("Got geolocation", location);
	var jqxhr = $.ajax({type: "GET", url: "/train_pi/stations/json", data: {coords: location.coords.latitude + "," + location.coords.longitude} })
	    .done(function(d) { 
	    	build_list_view(JSON.parse(d));
	     })
	    .fail(function() { alert("error"); })
	    .always(function() { 
		    
	    });


    //location.coords.latitude;
    //location.coords.longitude;
}
function sort_by_departure(a, b){
	//console.log(a.Expdepart, b.Expdepart);
	var i = new Date('2013-01-01 ' + a.Expdepart); 
	var j = new Date('2013-01-01 ' + b.Expdepart); 
	return i == j ? 0 : (i > j ? a : b);
}

function build_list_view(d){

var max_trains = 10; 
$('#num_trains').append(max_trains);

var northbound = new Array(), southbound = new Array(); 
var trains = d.objStationData; 
$('#station_name').empty().append(trains[0].Stationfullname);	
//console.log(trains);
// Trains are not ordered by departure time, so we need to do that. Using Expdepart property (as this allows for late/unscheduled trains)
trains.sort(sort_by_departure);
console.log(trains);
var num_trains = 0; 

for(var i in trains){
	if(num_trains < max_trains){
		var t = trains[i];
		if(t.Direction == 'Northbound'){
			northbound.push(t);
		} else {
			southbound.push(t);
		}		
		num_trains++;
	}

}

$('#train-list').remove();

var $u = $(document.createElement("ul")).attr("data-role", "listview").attr("data-inset","true").attr('id', 'train-list');
if(northbound.length > 0){
	$u.append(
		$(document.createElement("li")).attr("data-role", "list-divider").append("Northbound <span class='ui-li-count'>"+northbound.length+"</span>"));
	for(var i in northbound){
		var tr = northbound[i];
		var $l = $(document.createElement("li")).append(
		
				$(document.createElement("h2")).append("Destination: " + tr.Destination)
			).append(
				$(document.createElement("p")).append("Expected Departure: " + tr.Expdepart)
			).append(
				$(document.createElement("p")).append("Arrives: " + tr.Destinationtime)
			
		);
		
		$l.appendTo($u);
	}
}
	

if(southbound.length > 0){
	$u.append(
		$(document.createElement("li")).attr("data-role", "list-divider").append("Southbound <span class='ui-li-count'>"+southbound.length+"</span>"));

	for(var i in southbound){
		var tr = southbound[i];
		var $l = $(document.createElement("li")).append(
		
				$(document.createElement("h2")).append("Destination: " + tr.Destination)
			).append(
				$(document.createElement("p")).append("Expected Departure: " + tr.Expdepart)
			).append(
				$(document.createElement("p")).append("Arrives: " + tr.Destinationtime)
		);
		$l.appendTo($u);
	}	
}

	$u.insertAfter($('#heading'));
	$('#train-list').listview();

}

function onError(){
	console.log("No access to geolocation");
	
}