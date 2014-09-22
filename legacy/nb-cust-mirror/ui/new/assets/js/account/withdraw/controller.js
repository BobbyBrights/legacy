'use strict';

angular.module('nb.controllers')
	.controller('AccountWithdrawController', ['$scope', 'UserService', 'userInfoManager',
		function($scope, UserService, userInfoManager){
				
			$scope.userCards 	= [];
			$scope.choosedCardName 		= 'Please Choose';
			$scope.choosedCardIndex 	= '';
			$scope.amount 		= "0.00";

			$scope.updateChoosedCard = function(){
				$scope.choosedCardName = ('' === $scope.choosedCardIndex) ? 'Please Choose' : $scope.userCards[$scope.choosedCardIndex].masked;
			}

			$scope.withDraw = function(){
				
				var withDrawInfo = {
					amount : $scope.amount,
					cardId : ('' === $scope.choosedCardIndex ? '' : $scope.userCards[$scope.choosedCardIndex].cardId)
				};
				UserService.withDraw(withDrawInfo).then(function(data){
					console.log('result after successfully withdraw :');
					console.log(data);
				},function(err){
					console.log('result after withdraw failed:');
					console.log(err);
				});	
			}

			/*******************
             * Main Logic Part *
             *******************/

            userInfoManager.updateUserCards().then(function(){
            	var updateUserCards = userInfoManager.getUserCards();
            	$scope.userCards 	= !_.isUndefined(updateUserCards.cards) ? updateUserCards.cards : [];

            	console.log('the user cards are');
            	console.log($scope.userCards);
            },function(){

            });
			
	}]);