'use strict';

angular.module('novaballApp')
    .controller('ReportCtrl', function ($scope) {

        $scope.$on('$viewContentLoaded', function(){
            console.log(typeof $);

            /* ---------- Chart with points ---------- */
            $('.chart-info-box').each(function(){

                var data1 = [[0, 10], [1, 13], [2, 9], [3, 12],[4, 15], [5, 14], [6, 13], [7, 13],[8, 14], [9, 15], [10, 15], [11, 16],[12, 16], [13, 15], [14, 15], [15, 14]];
                var data2 = [[0, 1], [1, 2], [2, 3], [3, 4],[4, 5], [5, 4], [6, 3], [7, 3],[8, 4], [9, 5], [10, 5], [11, 6],[12, 6], [13, 5], [14, 5], [15, 4]];


                var chartColor = $(this).parent().parent().css("color");


                var plot = $.plot($(".chart-info-box"),

                    [ { data: data1,
                        label: "Visits",
                        lines: {
                            show: true,
                            lineWidth: 2,
                            color: "#fff"
                        },
                        points: {
                            show: false
                        },
                        shadowSize: 0
                    }, {
                        data: data2,
                        bars: {
                            show: true,
                            fill: false,
                            barWidth: 0.1,
                            align: "center",
                            lineWidth: 2
                        }
                    }
                    ], {

                        grid: {
                            show: false
                        },
                        legend: {
                            show: false
                        },
                        colors: ["#fff", "rgba(0,0,0,0.1)"],
                        xaxis: {ticks:2, tickDecimals: 0 },
                        yaxis: {ticks:2, tickDecimals: 0 },
                    }
                );

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
                $(this).bind("plothover", function (event, pos, item) {
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

            });
        })
  });
