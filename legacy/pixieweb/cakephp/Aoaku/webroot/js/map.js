/* Function file for maps API */
var map_markers = []; 
var map = null;
$(function(){

	var mapOptions = {
	  zoom: 12,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var bounds = new google.maps.LatLngBounds();
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	    
	// Map setup
	$('ul.points li').each(function(a,b){
		var p = $(this).data();
		var g = new google.maps.LatLng(p.lat, p.lng); 
		add_marker(g);
		bounds.extend(g);
		$(this).find('a').each(function(){
		    (function(i, j, map) {
			    i.bind('click', function(e){
			    	e.preventDefault();
			    	map.setZoom(17);
			    	map.panTo(j);
				    return false;
			    })
		    })($(this), g, map);
		});
	}); 
	
	map.fitBounds(bounds);	
	
/*	
	$('ul.points li a').on('click', function(e){
		e.preventDefault();
		delete_markers();
		var p = $(this).parent().data();
		var g = new google.maps.LatLng(p.lat, p.lng); 
		//console.log(g);
		
		
		if(typeof map !== 'undefined'){
			add_marker(g);
			map.setZoom(17);
			map.panTo(g);
		}
		return false;
	});
*/
});

// Add marker
function add_marker(location) {
  marker = new google.maps.Marker({
    position: location,
    map: map
  });
  map_markers.push(marker);
}

// Deletes all markers in the array by removing references to them
function delete_markers() {
  if (map_markers) {
    for (i in map_markers) {
      map_markers[i].setMap(null);
    }
    map_markers.length = 0;
  }
}

// Shows any overlays currently in the array
function show_markers() {
  if (map_markers) {
    for (i in map_markers) {
      map_markers[i].setMap(map);
    }
  }
}

// Removes the overlays from the map, but keeps them in the array
function clear_markers() {
  if (map_markers) {
    for (i in map_markers) {
      map_markers[i].setMap(null);
    }
  }
}