/* ---------- functions used to demonsatration ---------- */

function randNum(){
	return ((Math.floor( Math.random()* (1+40-20) ) ) + 20)* 1200;
}

function randNum2(){
	return ((Math.floor( Math.random()* (1+40-20) ) ) + 20) * 500;
}

function randNum3(){
	return ((Math.floor( Math.random()* (1+40-20) ) ) + 20) * 300;
}

function randNum4(){
	return ((Math.floor( Math.random()* (1+40-20) ) ) + 20) * 100;
}

function randNum5(){
	return ((Math.floor( Math.random()* (1+40-20) ) ) + 1) * 1;
}

function chart24() {

	var tickets = [[1, 5+randNum3()], [2, 10+randNum3()], [3, 15+randNum3()], [4, 20+randNum3()],[5, 25+randNum3()],[6, 30+randNum3()],[7, 35+randNum3()],[8, 40+randNum3()],[9, 45+randNum3()],[10, 50+randNum3()],[11, 55+randNum3()],[12, 60+randNum3()],[13, 65+randNum3()],[14, 70+randNum3()],[15, 75+randNum3()],[16, 80+randNum3()],[17, 85+randNum3()],[18, 90+randNum3()],[19, 85+randNum3()],[20, 80+randNum3()],[21, 75+randNum3()],[22, 80+randNum3()],[23, 75+randNum3()],[24, 70+randNum3()]];
	var solved = [[1, 5+randNum3()], [2, 10+randNum3()], [3, 15+randNum3()], [4, 20+randNum3()],[5, 25+randNum3()],[6, 30+randNum3()],[7, 35+randNum3()],[8, 40+randNum3()],[9, 45+randNum3()],[10, 50+randNum3()],[11, 55+randNum3()],[12, 60+randNum3()],[13, 65+randNum3()],[14, 70+randNum3()],[15, 75+randNum3()],[16, 80+randNum3()],[17, 85+randNum3()],[18, 90+randNum3()],[19, 85+randNum3()],[20, 80+randNum3()],[21, 75+randNum3()],[22, 80+randNum3()],[23, 75+randNum3()],[24, 70+randNum3()]];

	var plot = $.plot($("#chart-24h"),
		[ { data: tickets, label: "Tickets" }, 
		{ data: solved, label: "Solved Tickets"} ], {
			series: {
				lines: { 
					show: true,
					lineWidth: 2,
					fill: true,
					fillColor: { colors: [ { opacity: 0.1 }, { opacity: 0.1 } ] } 
				},
				points: { 
					show: true, 
					lineWidth: 2 
				},
				shadowSize: 0
			},
			grid: { 
				hoverable: true, 
				clickable: true, 
				borderWidth: 0,
			},
			legend: {
				show: false
			},	
			colors: ["#bdea74", "#2FABE9"],
			xaxis: {ticks:10, tickDecimals: 0, tickColor: "#fff"},
			yaxis: {ticks:5, tickDecimals: 0, tickColor: "#e9ebec"},
		});

	function showTooltip(x, y, contents) {
		$('<div id="tooltip">' + contents + '</div>').css( {
			position: 'absolute',
			display: 'none',
			top: y + 5,
			left: x + 5,
			border: '1px solid #fdd',
			padding: '2px',
			'background-color': '#dfeffc',
			opacity: 0.80
		}).appendTo("body").fadeIn(200);
	}

	var previousPoint = null;
	$("#chart-24h").bind("plothover", function (event, pos, item) {
		
		$("#x").text(pos.x.toFixed(2));
		$("#y").text(pos.y.toFixed(2));
		
		if (item) {
			if (previousPoint != item.dataIndex) {
				previousPoint = item.dataIndex;

				$("#tooltip").remove();
				var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);

				showTooltip(item.pageX, item.pageY,item.series.label + " of " + x + " = " + y);
			}
		} else {
			$("#tooltip").remove();
			previousPoint = null;
		}
	});	
}

function chartWeek(){
	
	function gd(year, month, day) {
	    return new Date(year, month - 1, day).getTime();
	}
	
	var data1 = [
	    [gd(2013, 1, 2), 1690.25], [gd(2013, 1, 3), 1696.3], [gd(2013, 1, 4), 1659.65], [gd(2013, 1, 5), 1668.15], [gd(2013, 1, 6), 1656.1], [gd(2013, 1, 7), 1668.65], [gd(2013, 1, 8), 1668.15]
	];
	
	var dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

	var plot = $.plot($("#chart-week"),
	[ { data: data1} ], {
	   series: {
			lines: { 
				show: true,
				lineWidth: 3, 
				fill: false
			},
			points: { 
				show: true, 
				lineWidth: 3,
				fill: true,
				fillColor: "#fff"
			},	
			shadowSize: 0
		},
		grid: { 
			hoverable: true, 
			clickable: true, 
			tickColor: "#e9ebec",
			borderWidth: 0,
		},
	   	colors: ["#b2b8bd"],
	   	xaxis: {
			mode: "time",                
			tickFormatter: function (val, axis) {
				return dayOfWeek[new Date(val).getDay()];
			},
			font: {
			    color: "#b2b8bd"
			},
			ticks:7, 
			tickColor: "#fff",
			alignTicksWithAxis: 1,
			autoscaleMargin: 0.02,
		},
		yaxis: {
			font: {
				color: "#b2b8bd"
			},
			ticks:4, 
			tickDecimals: 0,
		},
	});	

	function showTooltip(x, y, contents) {
		$('<div id="tooltip">' + contents + '</div>').css( {
			position: 'absolute',
			display: 'none',
			top: y + 5,
			left: x + 5,
			border: '1px solid #fdd',
			padding: '2px',
			'background-color': '#dfeffc',
			opacity: 0.80
		}).appendTo("body").fadeIn(200);
	}

	var previousPoint = null;
	$("#chart-week").bind("plothover", function (event, pos, item) {
		$("#x").text(pos.x.toFixed(2));
		$("#y").text(pos.y.toFixed(2));

		if (item) {
			if (previousPoint != item.dataIndex) {
				previousPoint = item.dataIndex;

				$("#tooltip").remove();
				var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);

				showTooltip(item.pageX, item.pageY,
							item.series.label + " of " + x + " = " + y);
			}
		}
		else {
			$("#tooltip").remove();
			previousPoint = null;
		}

	});
			
}
	




