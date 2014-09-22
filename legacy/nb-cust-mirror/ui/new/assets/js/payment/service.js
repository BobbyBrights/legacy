'use strict';

angular.module('nb.services')
	.factory('PaymentService',['$modal', '$rootScope','$state',
		function($modal, $rootScope, $state){
			var openPaymentSuccess = function(){

				$rootScope.$emit('nb:displayErrMsg',{
                    mainTitle: "WELCOME TO NOVABALL",
                    modalHeading: "",
                    errorMsgArray: ['Payment Successful!'],
                    submitBtnText: 'CONTINUE',
                    actionAfterClose: function(){
                    	$state.go('root.home');
                    },
                    actionAfterSubmit: function(){
                    	$state.go('root.home');
                    }
                });
			};

			var openPaymentFailed = function(){

				$rootScope.$emit('nb:displayErrMsg',{
                    mainTitle: "WELCOME TO NOVABALL",
                    modalHeading: "",
                    errorMsgArray: ['Payment Failed!'],
                    submitBtnText: 'CONTINUE',
                    actionAfterClose: function(){
                    	$state.go('root.home');
                    },
					actionAfterSubmit: function(){
                    	$state.go('root.home');
                    }
                });
			};

			return{
				openPaymentSuccess: openPaymentSuccess,
				openPaymentFailed: openPaymentFailed
			}
	}]);