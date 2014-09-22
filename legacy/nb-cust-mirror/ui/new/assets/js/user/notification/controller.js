'use strict';

angular.module('nb.controllers')
	.controller('NotificationController',['$scope', '$config', '$modal','UserService', 'Auth', 'AccountService','notiManager', 'Functions',
		function($scope, $config, $modal, UserService, Auth, AccountService, notiManager, Functions){


		$scope.notiArray = [{type:'winner',title:"You're a winner !",body:'You won &#163;25 in the Sat 21 September draw. Congratulations!'},
                                {type:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {type:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {type:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {type:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {type:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {type:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {type:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {type:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {type:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {type:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {type:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"},
                                {type:'normal', title:"Welcome to NovaBall !", body:"Best of luck in the next draw!"}];



        console.log('check user anthenticated and load notifications');
		if(Auth.isAuthenticated){
			//get all notifications from the notification manager
			
			/*notiManager.updateNotifications($config.affiliate.affiliate_id, fromDateStr, toDateStr).then(function(data){
				$scope.notiArray 	= notiManager.getNotifications();
			},function(){

			});*/
		}
	}]);