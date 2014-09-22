// Intercepting HTTP calls with AngularJS.
angular.module('novaballApp')
    .factory('authInterceptor', ['$q', 'nbConfig', '$rootScope', function ($q, nbConfig, $rootScope) {
        return {
            // On request success
            request: function (config) {
                var url = config.url;
                if (url.indexOf("views/") < 0) {
                    if (localStorage.getItem(nbConfig.localStorage.key)) {
                        var authToken = localStorage.getItem(nbConfig.localStorage.key);
                        config['headers'] = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken};
                        //console.log(authToken); // Contains the data about the request before it is sent.
                    }
                }
                // Return the config or wrap it in a promise if blank.
                return config || $q.when(config);
            },

            // On request failure
            requestError: function (rejection) {
                // console.log(rejection); // Contains the data about the error on the request.

                // Return the promise rejection.
                return $q.reject(rejection);
            },

            // On response success
            response: function (response) {
                // console.log(response); // Contains the data from the response.

                // Return the response or promise.
                return response || $q.when(response);
            },

            // On response failture
            responseError: function (rejection) {

                //console.log(rejection.headers());

                // Need to make sure that the response is only handled for API requests
                // and not partials
                var url = rejection.config.url;
                if (url.indexOf("views/") < 0) {
                    switch (rejection.status) {
                        case 302:
                            // Redirect required
                            $rootScope.$emit('nb:redirectModal', rejection.data);
                            break;
                        case 401:
                            console.log(localStorage);
                            if (localStorage[nbConfig.localStorage.key]) {
                                // We have a key but it's invalid
                                localStorage.removeItem(nbConfig.localStorage.key);
                                // TODO - Theres a bug here, we need to force the httpInterceptor to retry the request.
                                $rootScope.$emit('nb:updateview', {});
                            } else {
                                $rootScope.$emit('nb:flashMessage', {title: 'Login', message: 'Unauthorized', type: 'warning'});
                            }

                            break;
                        default:
                            var msg = '';
                            if (!_.isUndefined(rejection.data.message)) {
                                msg = " - " + rejection.data.message;
                            }
                            $rootScope.$emit('nb:flashMessage', {title: 'Error', message: 'Error ' + rejection.status + msg, type: 'warning'});
                            break;
                    }
                }
                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    }]);


angular.module('novaballApp')
    .config(['$httpProvider', function ($httpProvider) {
        // Add the interceptor to the $httpProvider.
        $httpProvider.interceptors.push('authInterceptor');

    }]);


