'use strict';

angular.module('nb.services')
	.factory('AccountService',[ '$q', 'UserWalletResource', 'Notification',
		function($q, UserWalletResource, Notification){
		var getWalletInfo = function(){

			var deferred = $q.defer();

			UserWalletResource.get(
				{},
				function(data){
					//success handler
					deferred.resolve(data);

				},function(err){
					//error handler
					console.log('handle error msg when userwalletResource.get() failed:');
					console.log(err);

					deferred.reject({
						hasError: true,
						msg:err.data,
						responseStatus:err.status
					});
			});
			return deferred.promise;
		};

		var getWalletAllCards = function(){
			var deferred = $q.defer();

			UserWalletResource.get({param:'all'},function(data){

				deferred.resolve(data);
			},function(err){
				if(err.status == 404){
					deferred.resolve({});
				}

				deferred.reject({
					hasError: true,
					msg:err.data,
					responseStatus:err.status
				});

			});

			return deferred.promise;
		};

		var getNotifications = function(){
			var deferred = $q.defer();

			Notification.get({},function(data){
				deferred.resolve(data);
			},function(err){
				deferred.reject(err);
			})

			return deferred.promise;
		};

		var hasReadNoti = function(notiId){
			var deferred = $q.defer();

			Notification.update({
				param1:notiId,
				param2:'markread'
			},function(data){
				deferred.resolve(data);
			},function(err){
				deferred.reject(err);
			})

			return deferred.promise;
		}

		return{
			getWalletInfo: 		getWalletInfo,
			getWalletAllCards: 	getWalletAllCards,
			getNotifications: 	getNotifications,
			hasReadNoti: 		hasReadNoti		
		}
	}])
	.factory('notiManager',['$q', 'AccountService',
		function( $q, AccountService){

		var notiManager = {
			_notiArray : [],

			getNotifications : function() {
				return this._notiArray;
			},

			setNotifications : function(notiArray) {
				this._notiArray = notiArray;
			},

			updateNotifications: function() {
				var deferred = $q.defer();

				AccountService.getNotifications().then(function(data){
					this._notiArray 	= data;
					deferred.resolve();
				},function(err){
					deferred.reject();
				});

				return deferred.promise;
			}

		};

		return notiManager;
	}]);