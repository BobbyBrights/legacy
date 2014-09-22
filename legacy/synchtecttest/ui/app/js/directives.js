'use strict';
angular.module('sttApp').directive('thumbnailImage', function ($interpolate) {
    return {
        restrict: 'E',
        //transclude: true,
        scope: {
            type: '='
        },
        template: '<img src="{{src}}" width="30" />',
        link: function (scope, element, x) {
            var content = element.html();
            //console.log(x);
            scope.src = '/images/folder.png';
            //console.log($interpolate(content)(scope));

        }
    };
});