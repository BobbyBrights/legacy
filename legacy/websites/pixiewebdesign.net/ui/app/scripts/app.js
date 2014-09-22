'use strict';
/* Load Underscore.js globally */
var underscore = angular.module('underscore', []);
underscore.factory('_', function () {
    return window._;
});

var app = angular.module('pixiewebApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angularFileUpload'
])

app.config(function ($routeProvider, $locationProvider) {
    // Routes is defined elsewhere, but included before this file is loaded. As it is also included in the node service
    angular.forEach(routes, function (r) {
        $routeProvider.when(r.path, r.route);
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});

// Resources
app.factory('Portfolio', ['$resource', function ($resource) {
    return $resource('/api/portfolio/:id', {id: "@id"});
}]).factory('Blog', ['$resource', function ($resource) {
    return $resource('/api/blog/:id/:mode', {id: "@id", mode: '@mode'}, {
        'update': {method: 'PUT'}
    });
}]).factory('BlogCategory', ['$resource', function ($resource) {
    return $resource('/api/categories', {});
}]).factory('Contact', ['$resource', function ($resource) {
    return $resource('/api/contact', {});
}]).factory('Token', ['$resource', function ($resource) {
    //console.log($resource);
    return function (customHeaders) {
        return $resource('/api/token', {grant_type: 'client_credentials'}, {
            'retrieve': {
                method: 'POST',
                headers: customHeaders || {},
                interceptor: {
                    responseError: function (data) {
                        if (data.status === 401) {
                            alert("Invalid login credentials");
                        }
                    }
                }
            },
            'validate': {
                method: 'GET',
                headers: customHeaders || {}
            }
        });
    }
}]);

app.controller('LoginCtrl', ['$scope', '$rootScope', '$routeParams', 'Token',
    function ($scope, $rootScope, $routeParams, Token) {

        $scope.formLogin = {};
        $scope.formLogin.email = 'stephen@hok.io',
            $scope.formLogin.password = 'stephen23';

        $scope.login = function () {
            localStorage.clear();
            if (!_.isUndefined($scope.formLogin)) {
                if ($scope.formLogin.email && $scope.formLogin.password) {
                    var basicAuth = CryptoJS.enc.Latin1.parse($scope.formLogin.email + ":" + $scope.formLogin.password).toString(CryptoJS.enc.Base64)
                    Token({
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + basicAuth// Fluffed for now
                    }).retrieve({grant_type: 'client_credentials'},
                        function (data) {
                            var token = data.access_token;
                            localStorage.setItem("_auth_token", token);
                            $rootScope.$emit("px:notify", {message: 'Logged in successfully', type: 'success'});
                        }
                    );
                } else {
                    $rootScope.$emit("px:notify", {message: 'Work with me here, username and password are required.', type: 'warning'});
                }
            }
        }
    }]);

app.controller('PortfolioCtrl', ['$scope', '$rootScope', 'Portfolio', '$routeParams',
    function ($scope, $rootScope, Portfolio, $routeParams) {
        $scope.portfolio = [];
        Portfolio.query({}, function (data) {
            $scope.portfolio = data;
            console.log(data);
        });
        if ($routeParams.id) {
            Portfolio.get({id: $routeParams.id}, function (data) {
                $scope.portfolio = data;
                console.log(data);
            });
        }
    }]);

app.controller('PageCtrl', ['$scope', '$rootScope', 'Contact', '$location', function ($scope, $rootScope, Contact, $location) {
    console.log('PageCtrl called on ', $location.path());
    switch ($location.path()) {
        case '/about':

            break;
        case '/contact':
            // Load our Mapbox map
            var _mcfg = 'stephen-pwd.hm4dikfo';
            var map = L.mapbox.map('map', _mcfg);
            var geocoder = L.mapbox.geocoder(_mcfg);
            geocoder.query('Donabate', function (err, data) {
                map.fitBounds(data.lbounds);
            });


            map.on('ready', function (data) {
                console.log("Hi..");
                console.log(this.featureLayer, data);
                // map.panTo(e.layer.getLatLng());
            });

            // Contact form
            $scope.formError = 'There were problems sending your form, all fields are mandatory.';
            $scope.hasErrors = $scope.isSent = $scope.sending = false;
            $scope.contact_form = {};

//            $scope.contact_form = {
//                name: 'Stephen',
//                email: 'test@test.ie',
//                query: 'lkdlskdf sldfkjlsdf slkjdflksd'
//            };

            $scope.submit_contact_form = function () {
                console.log($scope.contact_form);
                if (!$scope.contact_form.name || !$scope.contact_form.email || !$scope.contact_form.query) {
                    $scope.hasErrors = true;
                } else {
                    $scope.$apply(function () {
                        $scope.hasErrors = false;
                    });

                    $scope.sending = true;
                    Contact.save($scope.contact_form, function (data) {
                        if (data.status == 'ok') {
                            $scope.isSent = true;
                        } else {
                            $scope.hasErrors = true;
                            $scope.formError = 'Problem sending the email, please try again later';
                        }
                    });
                }
            }
            break;
        default:
            break;

    }


}]);

app.controller('MainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

}]);

app.controller('BlogCtrl', ['$scope', '$rootScope', 'Blog', '$routeParams', '$location', 'BlogCategory',
    function ($scope, $rootScope, Blog, $routeParams, $location, BlogCategory) {


        $scope.blogs = [], $scope.blog = {}, $scope.categories = [];


        if ($location.path() == '/blog') {
            Blog.query({mode: 'read'}, function (data) {
                $scope.blogs = data;
                BlogCategory.query({}, function (data) {
                    $scope.categories = data;
                    console.log("This far..");
                });
            });
        }

        if ($routeParams.id) {
            var params = {id: $routeParams.id};
            if ($location.path().match(/^\/blog\/edit/)) {
                //params.populate = false;
                params.mode = 'edit';
            }
            Blog.get(params, function (data) {
                $scope.blog = data;
            });
        }

        $scope.$on('$viewContentLoaded', function (event) {
            //console.log("BlogCtrl loaded");
        });


        // For the add field.
        if ($location.path() == '/blog/add') {
            $scope.blog.author = "stephen", $scope.blog.published = false;
        }
        $scope.addBlog = function () {
            if ($scope.blog._id) {
                // Its an update.
                Blog.update({id: $scope.blog._id}, $scope.blog, function (data) {
                    console.log(data);
                    $rootScope.$emit("px:notify", {redirect: '/blog', message: 'Blog updated', type: 'success'});
                });

            } else {
                // Its an add.
                var $blog = new Blog($scope.blog);
                $blog.$save(function (data) {
                    console.log(data);
                    $rootScope.$emit("px:notify", {redirect: '/blog', message: 'Blog added', type: 'success'});
                }, function (err) {
                    console.log(err);
                })
            }
        };

        // toggle selection for a given fruit by name
        $scope.toggleSelection = function toggleSelection(id) {
            if (_.isUndefined($scope.blog.categories)) {
                $scope.blog.categories = [];
            }
            var idx = $scope.blog.categories.indexOf(id);
            if (idx > -1) {
                $scope.blog.categories.splice(idx, 1);
            } else {
                $scope.blog.categories.push(id);
            }
        };

    }]);

app.directive('blogCkEditor', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);
            if (!ngModel) return;

            scope.$on('dataReady', function () {
                // Had to hack this .. urgghh..
                ck.setData(scope.blog.body);
            });

            function updateModel() {
                scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            }

            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);

            ngModel.$render = function (value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
});

app.run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function (e, curr) {
        $rootScope.pageClass = 'page_' + curr.$$route.pageClass;
        // Fix the bootstrap dropdown menu - doesnt hide because there's no page transition.
        $('.navbar-collapse.in').removeClass('in').addClass('collapse');
    });
    $rootScope.$on("px:notify", function (e, f) {
        // f holds the config options
        if (!_.isUndefined(f.redirect)) {
            $location.path(f.redirect);
        }
        toastr[!_.isUndefined(f.type) ? f.type : 'info'](f.message);
    });
}]);

// Set up some auth interceptors
// Intercepting HTTP calls with AngularJS.
app.factory('authInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
    return {
        // On request success
        request: function (config) {
            // If there's an authToken saved, send it.
            if (localStorage.getItem("_auth_token")) {
                var authToken = localStorage.getItem("_auth_token");
                config['headers'] = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken};
            }

            // Return the config or wrap it in a promise if blank.
            return config || $q.when(config);
        },

        // On request failure
        requestError: function (rejection) {
            // Return the promise rejection.
            return $q.reject(rejection);
        },

        // On response success
        response: function (response) {
            // Return the response or promise.
            return response || $q.when(response);
        },

        // On response failture
        responseError: function (rejection) {
            // Need to make sure that the response is only handled for API requests
            // and not partials
            var url = rejection.config.url;
            if (url.indexOf("views/") < 0) {
                switch (rejection.status) {
                    case 401:
                        $rootScope.$emit('px:notify', {type: 'error', message: 'Oi, chancer, you\'re not allowed here..'});
                        break;
                    default:
                        var msg = '';
                        if (!_.isUndefined(rejection.data.message)) {
                            msg = " - " + rejection.data.message;
                        }
                        $rootScope.$emit('px:notify', {type: 'error', message: 'Error ' + rejection.status + msg});
                        break;
                }
            }
            // Return the promise rejection.
            return $q.reject(rejection);
        }
    };
}]);


app.config(['$httpProvider', function ($httpProvider) {
    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('authInterceptor');
}]);


app.filter('slugify', function () {
    return function (input) {
        return input.substring(0, 50).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    };
}).filter('truncate', function () {
    return function (input) {
        return input.length > 50 ? input.substring(0, 50) + "..." : input;
    };
}).filter('excerpt', function () {
    return function (input) {
        return  input.substring(0, 255) + "...";
    };
})