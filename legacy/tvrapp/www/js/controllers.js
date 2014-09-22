angular.module('starter.controllers', [])

    .controller('DashCtrl', ['$rootScope', '$scope', 'Show', function ($rootScope, $scope, Show) {

        $scope.shows = [];
        Show.query({}, function (a) {
            $scope.shows = a;
            console.log(a);
        });
    }])

    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function ($scope) {
    });
