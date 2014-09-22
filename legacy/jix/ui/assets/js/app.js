'use strict';
// Add underscore as an angular module.
angular.module('underscore', []).factory('_', function () {
    return window._;
});

angular.module('jixApp', [
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'jix.controllers',
    'jix.resources'
]);


