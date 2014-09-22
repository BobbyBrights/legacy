'use strict';
angular.module('sttApp')
    .controller('MainCtrl', ['$scope', 'Item', '$modal', '$sce',
        function ($scope, Item, $modal, $sce) {

            $scope.item = {};
            $scope.perPage = 15;
            $scope.currentPage = 1;
            $scope.offset = 0;
            $scope.sorter = 'name';
            $scope.numPages = 0;
            $scope.order = 'asc';



            $scope.$watch('sorter', function (n, v) {
                $scope.getItems();
            });

            $scope.$watch('order', function (n, v) {
                $scope.getItems();
            });

            $scope.$watch('currentPage', function (n, v) {
                //
                $scope.offset = $scope.perPage * ($scope.currentPage - 1);
                $scope.getItems();
            });

            $scope.getItems = function () {
                $scope.loading = true;

                Item.get({limit: $scope.perPage, offset: $scope.offset, sort: $scope.sorter, order: $scope.order},
                    function (data) {
                        //console.log(data);
                        $scope.items = data.records;
                        $scope.numItems = data.totalSize;
                        $scope.numPages = parseInt($scope.items / $scope.limit) - 1;
                        $scope.loading = false;
                    });

            };

            $scope.getItems();

            $scope.sortBy = function (sorter) {
                $scope.sorter = sorter;
                if ($scope.order == 'asc') {
                    $scope.order = 'desc';
                } else {
                    $scope.order = 'asc';
                }
            };

            $scope.openViewer = function (item) {
                /* Modals */
                $scope.item = item;

                var modalInstance = $modal.open({
                    templateUrl: 'modal.html',
                    controller: 'FileViewModal',
                    resolve: {
                        item: function () {
                            return $scope.item;
                        }
                    }
                });
            };


        }]).controller('FileViewModal', ['$scope', '$modalInstance', 'item',
        function ($scope, $modalInstance, item) {

            $scope.item = item;

            $scope.ok = function () {
                $modalInstance.close();
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }]);
