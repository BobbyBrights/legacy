'use strict';

angular.module('eventureApp')
    .controller('EventsController', ['$scope', 'Event', '$routeParams', '$rootScope', '$location',
        function ($scope, Event, $routeParams, $rootScope, $location) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            $scope.dateFormat = 'DD-MM-YYYY';

            $scope.events = [];
            $scope.events_by_month = [];
            $scope.event = {};

            $rootScope.bc = [
                {path: '/', label: $rootScope.productName },
                {path: '/#events', label: 'Events', active: true },
            ];


            Event.query({}, function (data) {
                $scope.events = data;
            });

            if ($routeParams.id) {
                Event.get({id: $routeParams.id}, function (data) {
                    $scope.event = data;
                    $scope.$emit('eventure:eventLoaded');
                    // Update our breadcrumb
                    if ($rootScope.bc && $rootScope.bc.length == 3) {
                        $rootScope.bc.pop();
                    }
                    _.each($rootScope.bc, function (bc) {
                        if (bc.active) delete bc.active;
                    });

                    $rootScope.bc.push({ path: '/#event/' + data._id, label: data.name, active: true});
                })
            }

            // If this is add..
            if ($location.path() == '/event/add') {
                $scope.event.date_from = $scope.event.date_to = today();
                initDateRangePicker($scope.event.date_from, $scope.event.date_to, $scope);
            }
            $scope.saveEvent = function () {
                console.log(this, typeof $scope.event.$promise);
                if (typeof $scope.event.$promise === "undefined") {
                    // This is a new event - no $promise
                    var newEvent = new Event($scope.event);
                    newEvent.$save({}, function (data) {
                        $scope.$emit('alert:saved');
                    });
                } else {
                    $scope.event.$update({id: $routeParams.id}, function (data) {
                        $scope.$emit('alert:saved');
                    });
                }

                // $scope.event.$save({id: $scope.event.id});
            }


            // Fire page javascript

            $scope.$on('$viewContentLoaded', function () {

            });

            $scope.$on('alert:saved', function () {
                console.log("Saved!");
            });

            $scope.$on('eventure:eventLoaded', function () {
                var df = $scope.event.date_from;
                var dt = $scope.event.date_to;
                console.log(df, dt);
                initDateRangePicker(df, dt, $scope);
            });

        }]);

function today() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;//January is 0!`
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return dd + '/' + mm + '/' + yyyy;
    ;
}


function initDateRangePicker(df, dt, scope) {
    $('#daterange').daterangepicker({
            format: scope.format,
            startDate: df,
            endDate: dt
        },
        function (start, end) {
            scope.$apply(function () {
                scope.event.date_from = start.format(scope.format);
                scope.event.date_to = end.format(scope.format);
            });
        });
}
