angular.module('starter.controllers', ['cm.config'])
    .controller('HomeCtrl', ['$scope', 'Court', '$ionicLoading', 'cmConfig',
        function ($scope, Court, $ionicLoading, cmConfig) {

            $scope.load_courts = function (isRefresh) {
                $scope.courts = [];
                if (!isRefresh) {
                    $scope.loading = $ionicLoading.show(cmConfig.modal);
                }

                Court.query({latest: true}, function (data) {
                    $scope.courts = data;
                    $scope.loading.hide();
                    // Broadcast event.
                    if (isRefresh) {
                        $scope.$broadcast('scroll.refreshComplete');
                    }
                }, function (error) {
                    // alert(error);
                    $scope.loading.hide();
                });
            };
            $scope.load_courts(false);

        }])

    .controller('CourtCtrl', ['$scope', 'Court', '$stateParams', '$ionicLoading',
        function ($scope, Court, $stateParams, $ionicLoading) {
            $scope.map = {
                center: {
                    latitude: 45,
                    longitude: -73
                },
                zoom: 8
            };
            $scope.courts = [], $scope.court = {};
            if ($stateParams.id) {
                Court.get({id: $stateParams.id}, function (data) {
                    $scope.court = data;
                });
            }
        }])

    .controller('BookingCtrl', ['$scope', 'Court', '$ionicModal', '$ionicLoading', '$rootScope', 'cmConfig', 'Token',
        function ($scope, Court, $ionicModal, $ionicLoading, $rootScope, cmConfig, Token) {
            console.log($rootScope.loggedIn);

            if (!$rootScope.loggedIn) {

                // Object to store our properties.
                $scope.loginForm = {};
                $ionicModal.fromTemplateUrl('login.html', function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                }, {
                    // Use our scope for the scope of the modal to keep it simple
                    scope: $scope,
                    // The animation we want to use for the modal entrance
                    animation: 'slide-in-up'
                });

                $scope.closeModal = function () {
                    $scope.modal.hide();
                };

                $scope.login = function () {
                    // Setup modal
                    $scope.opts = cmConfig.modal;
                    $scope.opts.content = "Logging in";
                    $scope.loggingIn = $ionicLoading.show($scope.opts);

                    // Basic auth required
                    var basicAuth = CryptoJS.enc.Latin1.parse($scope.loginForm.email + ":" + $scope.loginForm.password).toString(CryptoJS.enc.Base64);
                    Token({'Content-Type': 'application/json', 'Authorization': 'Basic ' + basicAuth})
                        .retrieve({grant_type: 'client_credentials'}, function (data) {
                            var token = data.access_token;
                            $rootScope.loggedIn = true;
                            localStorage.setItem("cm.auth_token", token);
                            $scope.loggingIn.hide();
                            $scope.modal.hide();
                        }, function(err){
                            $scope.loggingIn.hide();
                            alert(err.data.error_description);
                        });
                };

                //Be sure to cleanup the modal
                $scope.$on('$destroy', function () {
                    $scope.modal.remove();
                });

            } else {

            }
        }]);