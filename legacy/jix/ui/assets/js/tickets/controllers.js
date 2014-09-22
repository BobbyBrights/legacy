'use strict';
angular.module('jix.controllers', [])
    .controller('TicketController', ['$scope', '$rootScope', 'Ticket',
        function ($scope, $rootScope, Ticket) {
            console.log("Hey!");
            $scope.issues = [];
            $scope.ticket = {
                name: 'Stephen',
                email: 'mclhins@tcd.ie',
                summary: 'Test',
                description: 'Test description'
            };

            $scope.ticket = {};

            $scope.addIssue = function addIssue(){
                $scope.isSending = true;
                console.log($scope.ticket);

                Ticket.save($scope.ticket, function(data){
                    console.log(data);
                    $scope.isSending = false;
                    $scope.jira = data;
                }), function(data){
                    console.log(data);
                    $scope.isSending = false;
                };
            };

            $scope.updateTickets = function updateTickets(){
                $scope.issues = [];
                $scope.showLoader = true;
                Ticket.query({}, function(data){
                    $scope.showLoader = false;
                    $scope.issues = data;
                });
            };


        }]);