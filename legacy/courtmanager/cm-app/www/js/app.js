angular.module('cmApp', ['ionic', 'starter.services', 'starter.controllers', 'google-maps'])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // the pet tab has its own child nav-view and history
            .state('tab.home', {
                url: '/home',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/main.html',
                        controller: 'HomeCtrl'
                    }
                }
            })

            .state('tab.booking', {
                url: '/bookings',
                views: {
                    'bookings-tab': {
                        templateUrl: 'templates/booking.html',
                        controller: 'BookingCtrl'
                    }
                }
            })

            .state('tab.courts-detail', {
                url: '/courts/:id',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/courts/view.html',
                        controller: 'CourtCtrl'
                    }
                }
            })

            .state('tab.courts-booking', {
                url: '/courts/:id/book',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/courts/booking.html',
                        controller: 'BookingCtrl'
                    }
                }
            })
        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');

    }).run(['$rootScope', function ($rootScope) {
        $rootScope.loggedIn = false;

        ionic.Platform.ready(function () {
            ionic.Platform.fullScreen();
        });

    }]);



