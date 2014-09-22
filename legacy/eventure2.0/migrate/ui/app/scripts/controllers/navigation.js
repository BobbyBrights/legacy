'use strict';

angular.module('eventureApp')
    .controller('NavigationController', ['$scope', function ($scope) {
        $scope.navigation = [
            {path: '/#/', label: 'Dashboard', icon: 'fa-bar-chart-o'},
            {path: '/#/events', label: 'Events', icon: 'fa-eye'},
            {path: '/#/promoters', label: 'Promoters', icon: 'fa-user'},
            {path: '/#/venues', label: 'Venues', icon: 'fa-music'},

        ];
    }]);
