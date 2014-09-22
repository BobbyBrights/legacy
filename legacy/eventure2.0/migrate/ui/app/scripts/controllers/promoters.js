'use strict';

angular.module('eventureApp')
  .controller('PromotersCtrl', ['$scope', 'Promoter', function ($scope, Promoter) {
        $scope.promoters = [];

        $scope.promoter = {};



        Promoter.query({}, function (data) {
            $scope.promoters = data;
            console.log(data);
        });
  }]);
