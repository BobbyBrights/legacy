'use strict';

angular.module('nb.controllers')
	.controller('NotificationModalController',['$scope','$modalInstance', '$modal','UserService',
		function($scope,$modalInstance, $modal, UserService){


		$scope.notiArray = [{category:'prize',title:"You're a winner !",body:'You won &#163;25 in the Sat 21 September draw. Congratulations!'},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {category:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"}];


		$scope.close = function(){
			$modalInstance.dismiss();
		};

		$scope.showNotiDetail = function(notiIndex){

			if( _.isNaN(notiIndex) ||
				notiIndex <0 ||
				notiIndex >=$scope.notiArray.length){
				return;
			}
			console.log('the index of the notification is:'+ notiIndex);
			//get the notification type
			var notiObj = $scope.notiArray[notiIndex];
			
			var mainTitle = 'NOTIFICATION';
			switch(notiObj.type){
				case 'winner':
					mainTitle = "YOU ARE A WINNER!";
					break;
				case 'normal':
					mainTitle = "NOTIFICATION";
					break;
				default:
					mainTitle = 'NOTIFICATION';
			}


			$modalInstance.dismiss();

			var notiInstance = $modal.open({
				templateUrl: '/partials/modals/notification.html',
				windowClass: 'noti-modal-window',
				controller: function($scope, $modalInstance, $state){
					$scope.mainTitle = mainTitle;

					$scope.openMyAccount = function(){
						$modalInstance.close();
						UserService.openAccountPage();
					}

					$scope.goToMyAccount = function(){
						$modalInstance.close();
						$state.go('root.account');
					}
				}
			});
		};



	}]);