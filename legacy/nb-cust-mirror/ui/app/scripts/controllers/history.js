'use strict';

angular.module('novaballApp')
    .controller('HistoryCtrl', ['$scope', 'History', '$routeParams', function ($scope, History, $routeParams) {

        $scope.history = new Array();
        $scope.searchable = true;

//        History.query(function (data) {
//            $scope.history = data;
//        });
//
//        if($routeParams.id){
//            History.get({id: $routeParams.id}, function(data){
//                $scope.history = data;
//            });
//        }

        $window.$on('jasdhfksa', function(e, a){

        })


    }]);

$(document).ready(function(){
    $('.bet').on('click', function(e){
        $(window).trigger("betslip:add_bet", {});
    })
})

