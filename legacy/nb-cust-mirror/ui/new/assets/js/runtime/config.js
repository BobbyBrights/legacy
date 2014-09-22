angular.module('nb.config', ['nb.services']).config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        //for invalid routes
        $urlRouterProvider.otherwise("/");

        //this step is allocating the different stateObject to the corresponding state route
        //the "states" array is defined in the states.js file
        angular.forEach(states, function (r) {
            $stateProvider.state(r.stateName, r.stateObj);
        });
        $locationProvider.html5Mode(true);

        $httpProvider.defaults.useXDomain = true;
        //$httpProvider.defaults.headers.common = {};

        // HTTP Interceptor
        $httpProvider.interceptors.push(['$q', '$rootScope', '$config', function ($q, $rootScope, $config) {
            return {
                // On request success
                request: function (config) {
                    //console.log("Test", config);
                    // Dont authenticate for partials or Angular bootstrap#
                    console.log(config);

                    var base_url = '';
                    var exclude = /^(\/partials|template|\/crypt|\/modals|\/forms)/;
                    var sendToNode = /^(\/bet\?)/;
                    var connectWithRealServer = /^(\/user*|\/subscriptions*|\/bets*|\/lotteries*|\/add_card*|\/lead|\/.*\/pin|\/wallet|\/lines\/.*|\/notification.*)/;

                    if (!exclude.test(config.url)) {
                        
                        if($config.http.testing){

                            if ($config.http.testing && ! sendToNode.test(config.url)) {
                                //the line below is used to send the request to the apiary-mock server
                                //base_url = $config.http.servers.test ;

                                console.log('set the base_url as the same as the desired one');
                                
                                console.log('The url on the fly is:'+config.url);
                            }

                            //test if the uri is contained in the request path
                            //if does then send to the real server
                            //if not then send to the mock server
                            if( true == $config.http.ciTest && 
                                connectWithRealServer.test(config.url)){
                                base_url = $config.http.servers.local_node;
                                console.log('The url with the real server is:'+config.url);
                            }

                            //update the url on the fly
                            config.url = base_url + config.url;

                            if (localStorage.getItem('nb:auth_token')) {
                                var authToken = localStorage.getItem('nb:auth_token');
                                //config['headers'] = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken};
                            }
                        }
                        else{
                            //update the url on the fly
                            config.url  = $config.http.servers.real_server_rel + config.url;
                        }
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
                    console.log('Resoponse in the interceptor is:');
                    console.log(response);
                    // Return the response or promise.
                    return response || $q.when(response);
                },

                // On response failture
                responseError: function (rejection) {
                    console.log('On responseError :');
                    console.log(rejection);

                    //add custom error message
                    switch(rejection.status){
                        case 401:
                            console.log('receive 401 error message in http interceptor:');
                            rejection.data  = {};
                            rejection.data.message = 'need authorized';
                            break;
                    }

                    console.log(rejection);
                    // Return the promise rejection.
                    return $q.reject(rejection);
                }
            };
        }]);


    }]).config(['$provide','$sceDelegateProvider', function ($provide, $sceDelegateProvider) {
    $provide.decorator('$log', function ($delegate) {
        // Grunt replaces this using grunt-replace, $log is decorated (turned off) for
        // any environment except development.
        var _env = '@@environment';
        // Toggle logging on/off
//        return _env == 'development' ? $delegate : {
//            error: function () {
//            }, info: function () {
//            }, warn: function () {
//            }, log: function () {
//            }
//        };

        return $delegate;

    });

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        //'http://54.72.103.19:8080/**',
        //'http://novaballcustomerapi.apiary-proxy.com/**'
        'http://novaballtest.apiary-mock.com/**'
    ]);

}]);


// Create some global config options
angular.module('nb.config')
    .value('$config', {
        latency: 0,
        subscription: {
            initial_num_lines: 5,
            min_num_lines: 2,
            std_ball_amount:6,
            bonus_ball_amount:1,
            default_num_draws: 8,//default number of draws initialized for the user at the beginning of time
            price_per_line:69,// the price for each line of the novaball
        },  

        affiliate: {
            affiliate_id: 1,
            irish_lottery_id: 1
        },

        http: {
            testing: false,
            ciTest : true,
            servers: {
                //test: 'http://54.72.103.19/api',
                //apiary : 'http://novaballcustomerapi.apiary-proxy.com'
                local_node: 'http://0.0.0.0:4444',
                test : 'http://novaballtest.apiary-mock.com',
                real_server_rel : '/api',
                real_server_abs: 'http://172.16.131.26',
                apiary : 'http://novaballtest.apiary-mock.com',

                requestResetPW: 'http://0.0.0.0:4444/reset-password'
            }
        }
    });
