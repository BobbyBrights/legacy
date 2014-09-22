'use strict';

angular.module('novaballApp')
    .controller('NavCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
        $scope.items = [
            {path: '/', title: 'Home'},
            {path: '/lines', title: 'My Novaball Lines'},
            {path: '/account', title: 'My Account'},
            {path: '/results', title: 'Results & Winners'}
        ];

        $scope.isActive = function (item) {
            var str = item.path.replace(/^#/, '');

            // Home should never be 'active'
            if( str == '/') return false;

            if ( $location.path().startsWith(str) ) {
                return true;
            }
            return false;
        };

    }]);

