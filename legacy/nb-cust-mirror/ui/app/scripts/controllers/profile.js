'use strict';

angular.module('novaballApp')
    .controller('ProfileCtrl', ['$scope', 'User', 'Subscription', '$route', '$location', '$rootScope', 'PCIServiceToken', '$modal', '$sce', '$timeout', 'CryptoService', '$routeParams',
        function ($scope, User, Subscription, $route, $location, $rootScope, PCIServiceToken, $modal, $sce, $timeout, CryptoService, $routeParams) {
            $scope.profile = {}, $scope.subscription = {};
            var els = {}, modalInstance = {}, _timeout = 0;
            // Check if we are returning here after adding a card
            console.log($routeParams);

            if ($location.path().indexOf("complete") > 0 && localStorage.getItem("_enc_user_obj")) {
                console.log("Returning after adding a card.");
                var user = localStorage.getItem("_enc_user_obj");
                CryptoService.decrypt({_o: user}, function (data) {
                    $scope.profile = data;
                });
            }

            if ($location.path().indexOf("register") < 0) {
                var userId = 22983;
                User.get({id: userId}, function (data) {
                    $scope.profile = data.profile;
                    Subscription.get({userId: userId}, function (subscription) {
                        $scope.subscription = subscription
                    });
                });
            } else {
                $scope.profile.name = "Test User",
                    $scope.profile.username = "smcelhinney",
                    $scope.profile.email = "test@test.ie",
                    $scope.profile.phone = "08300333330",
                    $scope.profile.address = "Test address, \n test something else";
            }
            var user = new User();

            $scope.createUser = function () {
                user = new User($scope.profile);
                //localStorage.setItem("")
                CryptoService.encrypt(user, function (data) {
                    localStorage.setItem("_enc_user_obj", data._r);
                    $scope.addCard();
                });
            }

            $scope.sendPIN = function () {
                $scope.sendingPin = true;
                // Simulate a server request/response
                $timeout(function () {
                    $scope.sendingPin = false;
                    $scope.pinSent = true;

                }, _timeout);
            }

            $scope.verifyPIN = function () {
                $scope.verifyingPin = true;
                // Simulate a server request/response
                $timeout(function () {
                    $location.path("/register/add-details");
                }, _timeout);
            }

            $scope.addCard = function () {
                console.log("Adding card");
                var ModalInstanceCtrl = function ($scope, $modalInstance) {
                    /*
                     TODO - Call a service here that returns a unique identifier based on the logged in customer and the token, which will be used in the iFrame call.
                     */
                    $scope.pci_iframe_url = '/views/fragments/loader.html';

                    PCIServiceToken.get({}, function (data) {
                        $scope.pci_iframe_url = $sce.trustAsResourceUrl('http://pci.local/pci-form.html');

                    });

                    $scope.cancel = function () {
                        $rootScope.$emit('nb:flashMessage', {title: 'Error', message: 'Error - You must add a credit card to make payments', type: 'warning'});
                        $modalInstance.dismiss('cancel');
                    };
                };
                // First check if the form is valid,
                this.formValid = true;
                if (this.formValid) {

                    modalInstance = $modal.open({
                        templateUrl: 'addCard.html',
                        controller: ModalInstanceCtrl
                    });

                    modalInstance.result.then(function (selectedItem) {
                        console.log(els.get('profile'));

                    }, function () {

                    });

                    $rootScope.$on("nb:closeModals", function () {
                        if (typeof modalInstance === 'object') {
                            modalInstance.close();
                        }
                    });

                } else {
                    $rootScope.$emit('nb:flashMessage', {title: 'Error', message: 'Error - There are problems with the form, please check again', type: 'warning'});
                }


            };


            $scope.confirmDelete = function () {
                console.log("Deleting subscription");
                var ModalInstanceCtrl = function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $modalInstance.close(true);
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.settings = {
                        header: "Confirm delete",
                        message: "Are you sure you want to delete your subscription?",
                        btn_ok: "OK",
                        btn_cancel: "Cancel"
                    }
                };

                var modalInstance = $modal.open({
                    templateUrl: 'deleteModal.html',
                    controller: ModalInstanceCtrl
                });

                modalInstance.result.then(function (response) {
                    // Triggered when the Ok button is clicked
                    console.log("Deleted.")
                }, function () {
                    // Modal dismissed
                });

            };

        }]);
