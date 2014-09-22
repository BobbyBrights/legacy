'use strict';

angular.module('nb.services')
	.factory('CardService', ['Card', '$q', 'UpdateCard',
		function(Card, $q, UpdateCard){

			var getCardForm = function (amid){

				var deferred = $q.defer();
				console.log('the amid in getCardForm service is:'+amid);
				Card.get(
					{
						amid:amid
					},
					function(htmlData){
						//success handler function
						deferred.resolve(htmlData);
					},function(err){
						//error handler function

				});

				return deferred.promise;
			};

			var updateCardExpiryDate = function(cardid, newDate){
				var deferred = $q.defer();

				var cardObj = new UpdateCard();
				cardObj.expiry = newDate;

				return cardObj.$update({
					cardid:cardid
				},function(data){

				},function(){

				})
			}

			return {
				getCardForm : getCardForm,
				updateCardExpiryDate: updateCardExpiryDate
			};

	}]);