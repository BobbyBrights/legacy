'use strict';
// Add underscore as an angular module.
angular.module('underscore', []).factory('_', function () {
    return window._;
});

angular.module('nbApp', [
    'ngResource',
    'ui.router',
    'ncy-angular-breadcrumb',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'nb.controllers',
    'nb.resources',
    'nb.services',
    'nb.config',
    'nb.events',
    'nb.filters',
    'nb.functions',
    'nb.directives',
    'nb.global'
]);



