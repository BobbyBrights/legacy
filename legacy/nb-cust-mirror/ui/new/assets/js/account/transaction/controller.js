'use strict';

angular.module('nb.controllers')
	.controller('AccountTransactionController',['$scope',
		function($scope){
			$scope.totalItems = 64;
		  	$scope.currentPage = 4;

			$scope.setPage = function (pageNo) {
				$scope.currentPage = pageNo;
			};

			$scope.pageChanged = function() {
				console.log('Page changed to: ' + $scope.currentPage);
			};

			$scope.itemsPerPage = 15;
			$scope.maxSize = 4;
			//$scope.bigTotalItems = 20;
			$scope.bigCurrentPage = 1;

			$scope.transDataArray	= [];


			//generate the transaction data array
			
			for(var num=0;num<30;num++){
				$scope.transDataArray.push({
					time:'24/06/14 - 11:16 am',
					type:'Bet(Bet ID:1234567)',
					debit:'$'+(20+num)+'.00',
					credit:'$10.00',
					balance:'$500,000,000.00'
				});	
			}
			
	}]);