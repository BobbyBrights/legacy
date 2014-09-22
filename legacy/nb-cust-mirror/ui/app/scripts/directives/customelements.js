'use strict';

angular.module('novaballApp')
    .directive('lottoNumbers', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            terminal: true,
            scope: { line: '=' },
            link: function (scope, element, attrs) {
                var template = '<div class="lotto-line">' +
                    '<div class="lotto-number number-{{number}}" ng-repeat="number in line.standard">{{number}}</div>' +
                    '<div class="lotto-number bonus-ball">{{line.bonus}}</div>' +
                    '</div>';
                var newElement = angular.element(template);
                $compile(newElement)(scope);
                element.replaceWith(newElement);
            }
        }
    }]);
