'use strict';
angular.module('nb.controllers')
    .controller('AccountController', ['$scope', '$rootScope', 'User', 'UserPayments', 'UserWallet', '$log','userInfoManager', '$state',
        function ($scope, $rootScope, User, UserPayments, UserWallet, $log, userInfoManager, $state) {


            $scope.account = null;
            $scope.userWallet = {};
            //$scope.payments = null;
            $scope.currentUrl   = $state.current.url;

/*            $scope.refreshPayments = function(){
                $scope.payments = null;
                UserPayments.query({}, function(data){
                    $scope.payments = data;
                    $log.info(data);
                });
            };*/


/*            //get userInfo instance from 'userInfoManager' service
            var userInfo = userInfoManager.getUserInfo();
            if( userInfo && 
                !_.isEmpty(userInfo)){

                $scope.account = userInfo.profile;
                // For the helper function
                $scope.userWallet.currency = $scope.account.walletCurrency;
                $scope.userWallet.amt = $scope.account.walletAmt;
                // Real time payment updates.
                $scope.refreshPayments();
                UserWallet.get({}, function(data){
                    $scope.userWallet = data;
                    console.log('Refresh the user wallet:');
                    $log.info(data);
                });
            }else{
                //TODO: deal with the situation that cant refresh the wallet
            }*/

            console.log('the state variable is:');
            console.log($state);

            //update the user's wallet info
            userInfoManager.updateUserWallet().then(function(){
                //if update successfully then fetch the updated wallet
                $scope.userWallet = userInfoManager.getUserWallet();


            },function(errMsgObj){
                //error handler when cant load credit cards info
                console.log('This is the error object when loading user wallet:');
                console.log(errMsgObj);
                
            });

            $scope.addCard = function () {
                $log.info("Adding card");


                var ModalInstanceCtrl = function ($scope, $modalInstance) {
                    /*
                     TODO - Call a service here that returns a unique identifier based on the logged in customer and the token, which will be used in the iFrame call.
                     Also may need to implement an ajax loader, as the resource call may be unresponsive for some time.
                     */
                    $scope.pci_iframe_url = 'views/fragments/loader.html';

                    PCIServiceToken.get({}, function(data){
                        $scope.pci_iframe_url = $sce.trustAsResourceUrl('http://localhost/pci-form.html');
                    });

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                };

                var modalInstance = $modal.open({
                    templateUrl: 'addCard.html',
                    controller: ModalInstanceCtrl
                });
            };

        }]);
