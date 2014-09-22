'use strict';
/*

 */
angular.module('novaballApp')
    .controller('AccountCtrl', ['$scope', 'User', '$sce', '$modal', 'PCIServiceToken',
        function ($scope, User, $sce, $modal, PCIServiceToken) {

            $scope.account = {};
            $scope.wallet = {};

            User.get({id: 'customer'}, function (data) {
                $scope.account = data.account;

                // For the helper function
                $scope.wallet.currency = $scope.account.walletCurrency;
                $scope.wallet.amt = $scope.account.walletAmt;

            });

            $scope.addCard = function () {
                console.log("Adding card");


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
