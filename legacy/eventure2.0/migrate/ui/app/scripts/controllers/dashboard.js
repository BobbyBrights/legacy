'use strict';

angular.module('eventureApp')
    .controller('DashboardController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $rootScope.bc = [
            {path: '/', label: $rootScope.productName },
            {path: '/', label: 'Dashboard', active: true },
        ];


        $scope.$on('$viewContentLoaded', function () {
            /* ---------- Init Main Chart ---------- */
            chartMonth();
            $('.piechart').easyPieChart({
                barColor: "#fff",
                trackColor: 'rgba(255,255,255,.2)',
                scaleColor: false,
                lineCap: 'butt',
                rotate: -90,
                lineWidth: 4,
                size: 40,
                animate: 1000,
                onStep: function (value) {
                    this.$el.find('span').text(~~value);
                }
            });
            $('#daterange').daterangepicker();
            $('input, textarea').placeholder();
            $('textarea').autosize();
            if ($('.verticalChart')) {
                $('.singleBar').each(function () {
                    var percent = $(this).find('.value span').html();
                    $(this).find('.value').animate({height: percent}, 2000, function () {
                        //$(this).find('span').fadeIn();
                    });
                });
            }
            $('.datatable').dataTable({
                "sDom": "<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-12'i><'col-lg-12 center'p>>",
                "bPaginate": false,
                "bFilter": false,
                "bLengthChange": false,
                "bInfo": false
            });
            $(".simpleProgress").each(function () {
                var value = parseInt($(this).html());
                $(this).progressbar({
                    value: value
                });
            });

            if ($(".multi-stat-box-chart").length) {

                $('.multi-stat-box-chart').each(function () {

                    var data2 = [
                        [1111, 5 + randNum5()],
                        [1112, 10 + randNum5()],
                        [1113, 15 + randNum5()],
                        [1114, 20 + randNum5()],
                        [1115, 25 + randNum5()],
                        [1116, 30 + randNum5()],
                        [1117, 25 + randNum5()]
                    ];

                    var data = [
                        [gd(2013, 1, 7), 5 + randNum5()],
                        [gd(2013, 1, 8), 10 + randNum5()],
                        [gd(2013, 1, 9), 15 + randNum5()],
                        [gd(2013, 1, 10), 20 + randNum5()],
                        [gd(2013, 1, 11), 25 + randNum5()],
                        [gd(2013, 1, 12), 30 + randNum5()],
                        [gd(2013, 1, 13), 25 + randNum5()]
                    ];

                    var chartColor = $(this).parent().parent().css("color");

                    var dayOfWeek = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];

                    function gd(year, month, day) {
                        return new Date(year, month - 1, day).getTime();
                    }

                    var plot = $.plot($(".multi-stat-box-chart"),
                        [
                            { data: data }
                        ], {
                            series: {
                                lines: { show: true,
                                    lineWidth: 3,
                                    fill: false
                                },
                                points: { show: true,
                                    lineWidth: 3,
                                    fill: true,
                                    fillColor: '#fff'
                                },
                                shadowSize: 0
                            },
                            grid: { hoverable: true,
                                clickable: true,
                                tickColor: "#fff",
                                borderColor: false
                            },
                            colors: ["#c7cbd5"],
                            xaxis: {
                                mode: "time",
                                tickFormatter: function (val, axis) {
                                    return dayOfWeek[new Date(val).getDay()];
                                },
                                color: "#c7cbd5",
                                autoscaleMargin: 0.000000000000000001
                            },
                            yaxis: {
                                ticks: 4,
                                tickDecimals: 0,
                                color: "#fff",
                            },
                        });

                    function showTooltip(x, y, contents) {
                        $('<div id="tooltip">' + contents + '</div>').css({
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
                    $(".multi-stat-box-chart").bind("plothover", function (event, pos, item) {
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

            }
            $('.chart-info-box').each(function () {

                var data1 = [
                    [0, 10],
                    [1, 13],
                    [2, 9],
                    [3, 12],
                    [4, 15],
                    [5, 14],
                    [6, 13],
                    [7, 13],
                    [8, 14],
                    [9, 15],
                    [10, 15],
                    [11, 16],
                    [12, 16],
                    [13, 15],
                    [14, 15],
                    [15, 14]
                ];
                var data2 = [
                    [0, 1],
                    [1, 2],
                    [2, 3],
                    [3, 4],
                    [4, 5],
                    [5, 4],
                    [6, 3],
                    [7, 3],
                    [8, 4],
                    [9, 5],
                    [10, 5],
                    [11, 6],
                    [12, 6],
                    [13, 5],
                    [14, 5],
                    [15, 4]
                ];


                var chartColor = $(this).parent().parent().css("color");


                var plot = $.plot($(".chart-info-box"),

                    [
                        { data: data1,
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
                        },
                        {
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
                        xaxis: {ticks: 2, tickDecimals: 0 },
                        yaxis: {ticks: 2, tickDecimals: 0 },
                    }
                );

                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css({
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

            $('.chart-info-box2').each(function () {

                var data1 = [
                    [0, 10],
                    [1, 13],
                    [2, 9],
                    [3, 12],
                    [4, 15],
                    [5, 14],
                    [6, 13],
                    [7, 13],
                    [8, 14],
                    [9, 15],
                    [10, 15],
                    [11, 16],
                    [12, 16],
                    [13, 15],
                    [14, 15],
                    [15, 14]
                ];
                var data2 = [
                    [0, 1],
                    [1, 2],
                    [2, 3],
                    [3, 4],
                    [4, 5],
                    [5, 4],
                    [6, 3],
                    [7, 3],
                    [8, 4],
                    [9, 5],
                    [10, 5],
                    [11, 6],
                    [12, 6],
                    [13, 5],
                    [14, 5],
                    [15, 4]
                ];


                var chartColor = $(this).parent().parent().css("color");


                var plot = $.plot($(".chart-info-box2"),

                    [
                        { data: data1,
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
                        },
                        {
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
                        xaxis: {ticks: 2, tickDecimals: 0 },
                        yaxis: {ticks: 2, tickDecimals: 0 },
                    }
                );

                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css({
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


            if ($('.chart-type1').length) {

                $('.chart-type1').each(function () {

                    var data1 = [
                        [0, 5],
                        [5, 6],
                        [11, 9],
                        [17, 8],
                        [21, 6],
                        [27, 8],
                        [31, 4]
                    ];
                    var data2 = [
                        [0, 1],
                        [1, 2],
                        [2, 3],
                        [3, 4],
                        [4, 5],
                        [5, 4],
                        [6, 3],
                        [7, 3],
                        [8, 4],
                        [9, 5],
                        [10, 5],
                        [11, 6],
                        [12, 6],
                        [13, 5],
                        [14, 5],
                        [15, 4],
                        [16, 6],
                        [17, 5],
                        [18, 4],
                        [19, 3],
                        [20, 2],
                        [21, 1],
                        [22, 2],
                        [23, 2],
                        [24, 3],
                        [25, 4],
                        [26, 5],
                        [27, 6],
                        [28, 5],
                        [29, 4],
                        [30, 3],
                        [31, 2]
                    ];

                    var plot = $.plot($(".chart-type1"),

                        [
                            { data: data1,
                                label: "Visits",
                                lines: {
                                    show: true,
                                    fill: false,
                                    lineWidth: 1
                                },
                                points: {
                                    show: true,
                                    lineWidth: 1,
                                    fill: true
                                },
                                shadowSize: 0
                            },
                            {
                                data: data2,
                                bars: {
                                    show: true,
                                    fill: false,
                                    barWidth: 0.1,
                                    align: "center",
                                    lineWidth: 5
                                }
                            }
                        ], {

                            grid: {
                                hoverable: true,
                                clickable: true,
                                tickColor: "#eee",
                                borderWidth: 0
                            },
                            legend: {
                                show: false
                            },
                            colors: ["#bdea74", "#fabb3d"],
                            xaxis: {ticks: 7, tickDecimals: 0 },
                            yaxis: {ticks: 3, tickDecimals: 0 },
                        }
                    );

                    function showTooltip(x, y, contents) {
                        $('<div id="tooltip">' + contents + '</div>').css({
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

            }


        });


        if ($("#statsbg1").length) {
            var value = [
                [1, 12390 + randNum3()],
                [2, 10 + randNum3()],
                [3, 15 + randNum3()],
                [4, 20 + randNum3()],
                [5, 25 + randNum3()],
                [6, 30 + randNum3()],
                [7, 35 + randNum3()],
                [8, 40 + randNum3()],
                [9, 45 + randNum3()],
                [10, 50 + randNum3()],
                [11, 55 + randNum3()],
                [12, 60 + randNum3()]
            ];

            var plot = $.plot($("#statsbg1"),
                [
                    { data: value, label: "Value" }
                ], {
                    series: {
                        lines: { show: true,
                            lineWidth: 2,
                            fill: true,
                            fillColor: { colors: [
                                { opacity: 1 },
                                { opacity: 1 }
                            ] }
                        },
                        points: { show: false,
                            lineWidth: 1
                        },
                        shadowSize: 0
                    },
                    grid: { hoverable: false,
                        clickable: false,
                        borderWidth: 0,
                        labelMargin: 0,
                        axisMargin: 1,
                        margin: 1,
                        minBorderMargin: 1,
                    },
                    legend: {
                        show: false
                    },
                    colors: ["#e9ebec"],
                    xaxis: {ticks: 0, tickDecimals: 0, tickColor: "#fff"},
                    yaxis: {ticks: 0, tickDecimals: 0, tickColor: "#fff"},
                });


        }

        if ($("#statsbg2").length) {
            var value = [
                [1, 90 + randNum3()],
                [2, 10 + randNum3()],
                [3, 15 + randNum3()],
                [4, 12320 + randNum3()],
                [5, 25 + randNum3()],
                [6, 30 + randNum3()],
                [7, 35 + randNum3()],
                [8, 40 + randNum3()],
                [9, 45 + randNum3()],
                [10, 50 + randNum3()],
                [11, 55 + randNum3()],
                [12, 60 + randNum3()]
            ];

            var plot = $.plot($("#statsbg2"),
                [
                    { data: value, label: "Value" }
                ], {
                    series: {
                        lines: { show: true,
                            lineWidth: 1,
                            fill: true,
                            fillColor: { colors: [
                                { opacity: 1 },
                                { opacity: 1 }
                            ] }
                        },
                        points: { show: false,
                            lineWidth: 1
                        },
                        shadowSize: 0
                    },
                    grid: { hoverable: false,
                        clickable: false,
                        borderWidth: 0,
                        labelMargin: 0,
                        axisMargin: 1,
                        margin: 1,
                        minBorderMargin: 1,
                    },
                    legend: {
                        show: false,
                    },
                    colors: ["#e9ebec"],
                    xaxis: {ticks: 0, tickDecimals: 0, tickColor: "#fff"},
                    yaxis: {ticks: 0, tickDecimals: 0, tickColor: "#fff"},
                });


        }

        if ($("#statsbg3").length) {
            var value = [
                [1, 90 + randNum3()],
                [2, 10 + randNum3()],
                [3, 15 + randNum3()],
                [4, 320 + randNum3()],
                [5, 25 + randNum3()],
                [6, 30 + randNum3()],
                [7, 35 + randNum3()],
                [8, 40 + randNum3()],
                [9, 45 + randNum3()],
                [10, 50 + randNum3()],
                [11, 32355 + randNum3()],
                [12, 60 + randNum3()]
            ];

            var plot = $.plot($("#statsbg3"),
                [
                    { data: value, label: "Value" }
                ], {
                    series: {
                        lines: { show: true,
                            lineWidth: 1,
                            fill: true,
                            fillColor: { colors: [
                                { opacity: 1 },
                                { opacity: 1 }
                            ] }
                        },
                        points: { show: false,
                            lineWidth: 1
                        },
                        shadowSize: 0
                    },
                    grid: { hoverable: false,
                        clickable: false,
                        borderWidth: 0,
                        labelMargin: 0,
                        axisMargin: 1,
                        margin: 1,
                        minBorderMargin: 1,
                    },
                    legend: {
                        show: false,
                    },
                    colors: ["#e9ebec"],
                    xaxis: {ticks: 0, tickDecimals: 0, tickColor: "#fff"},
                    yaxis: {ticks: 0, tickDecimals: 0, tickColor: "#fff"},
                });


        }

        if ($("#statsbg4").length) {
            var value = [
                [1, 90 + randNum3()],
                [2, 10 + randNum3()],
                [3, 15 + randNum3()],
                [4, 320 + randNum3()],
                [5, 25 + randNum3()],
                [6, 30 + randNum3()],
                [7, 35 + randNum3()],
                [8, 40 + randNum3()],
                [9, 45 + randNum3()],
                [10, 50 + randNum3()],
                [11, 55 + randNum3()],
                [12, 60 + randNum3()]
            ];

            var plot = $.plot($("#statsbg4"),
                [
                    { data: value, label: "Value" }
                ], {
                    series: {
                        lines: { show: true,
                            lineWidth: 1,
                            fill: true,
                            fillColor: { colors: [
                                { opacity: 1 },
                                { opacity: 1 }
                            ] }
                        },
                        points: { show: false,
                            lineWidth: 1
                        },
                        shadowSize: 0
                    },
                    grid: { hoverable: false,
                        clickable: false,
                        borderWidth: 0,
                        labelMargin: 0,
                        axisMargin: 1,
                        margin: 1,
                        minBorderMargin: 1,
                    },
                    legend: {
                        show: false,
                    },
                    colors: ["#e9ebec"],
                    xaxis: {ticks: 0, tickDecimals: 0, tickColor: "#fff"},
                    yaxis: {ticks: 0, tickDecimals: 0, tickColor: "#fff"},
                });


        }


    }]);


function chartMonth() {

    var data1 = [
        [0, 0.5],
        [1, 1],
        [2, 1.5],
        [3, 2],
        [4, 2.5],
        [5, 2],
        [6, 1.5],
        [7, 1.5],
        [8, 2],
        [9, 2.5],
        [10, 2.5],
        [11, 3],
        [12, 3],
        [13, 2.5],
        [14, 2.5],
        [15, 2],
        [16, 3],
        [17, 2.5],
        [18, 2],
        [19, 1.5],
        [20, 1],
        [21, 0.5],
        [22, 1],
        [23, 1],
        [24, 1.5],
        [25, 2],
        [26, 2.5],
        [27, 3],
        [28, 2.5],
        [29, 2],
        [30, 1.5],
        [31, 1]
    ];
    var data2 = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 4],
        [6, 3],
        [7, 3],
        [8, 4],
        [9, 5],
        [10, 5],
        [11, 6],
        [12, 6],
        [13, 5],
        [14, 5],
        [15, 4],
        [16, 6],
        [17, 5],
        [18, 4],
        [19, 3],
        [20, 2],
        [21, 1],
        [22, 2],
        [23, 2],
        [24, 3],
        [25, 4],
        [26, 5],
        [27, 6],
        [28, 5],
        [29, 4],
        [30, 3],
        [31, 2]
    ];

    var plot = $.plot($("#chart-month"),

        [
            {
                data: data2,
                bars: {
                    show: true,
                    fill: false,
                    barWidth: 0.1,
                    align: "center",
                    lineWidth: 16
                }
            },
            { data: data2,
                label: "Visits",
                lines: {
                    show: true,
                    lineWidth: 1.5
                },
                points: {
                    show: true,
                    lineWidth: 2,
                    fill: true
                },
                shadowSize: 0
            }    ,
            { data: data1,
                label: "Visits",
                lines: {
                    show: true,
                    lineWidth: 0.5
                },
                points: {
                    show: true,
                    lineWidth: 0.5,
                    fill: true
                },
                shadowSize: 0
            }
        ], {

            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#f7f7f7",
                borderWidth: 0,
                labelMargin: 10,
                margin: {
                    top: 0,
                    left: 5,
                    bottom: 0,
                    right: 0
                }
            },
            legend: {
                show: false
            },
            colors: ["rgba(190,190,190,0.3)", "#b2b8bd"],
            xaxis: {ticks: 5, tickDecimals: 0, tickColor: "#fff"},
            yaxis: {ticks: 3, tickDecimals: 0},
        }
    );

    function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css({
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
    $("#chart-month").bind("plothover", function (event, pos, item) {
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
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }

    });

}
