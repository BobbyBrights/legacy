/*
 This file is shared across Node/Angular to allow HTML5 pushState create absolute URLs for Angular state.
 */
var states = [
    //default root page is 'index.html'
    {
        stateName: 'root',
        
        stateObj: {
            url: '/',
            views: {
                "topNavBar@": {
                    templateUrl: "/partials/forms/login.html",
                    //controller: 'UserController'
                },
                "main": {
                    templateUrl: "/partials/pages/home.html",
                    //controller: 'SubscriptionController'
                },
                "banner@root":{
                    templateUrl: "/partials/includes/banner.html"
                },
                "body@root":{
                    templateUrl: "/partials/includes/pick-balls.html",
                    controller: 'SubscriptionController'
                },
                "prizes@root":{
                    templateUrl: "/partials/includes/allPrizes.html",
                },
                "novainfo@root":{
                    templateUrl: "/partials/includes/novaballInfo.html",
                },
                "footer@":{
                    templateUrl: "/partials/includes/footer.html"
                }
            },
            data: {
                ncyBreadcrumbSkip: true
            },
            resolve:{
                greeting:function($stateParams,$q, $timeout, userInfoManager, UserService, $rootScope){
                    var deferred = $q.defer();

                    console.log('inside the resolve function body');
                    //console.log($state);
                    console.log($stateParams);
                    /*
                    var state = this;
                    console.log('logging the state');
                    console.log(state);

                    console.log('the current name is:');
                    console.log($state.current.name);
                    console.log($state.current.url);

                    console.log('checking the state with include method');
                    console.log($state.includes('root'));
                    console.log($state.$current.name);

                    if($state.current.name == "root"){
                        console.log('change the current name');
                        $state.go('root.home');
                    }*/
                    /*if (!true) {
                        deferred.resolve();
                    }
                    else{

                        $timeout(function(){
                            console.log('finish resolving in states');
                            deferred.resolve();
                        },5000);
                    }*/
                    /*userInfoManager.updateUserInfo().then(function(data){
                        console.log('has got user profile,user is logged-in inside the resolve function'); 

                        UserService.funcListAfterLogin();                       
                        UserService.funcListAfterGetUser();
                        $rootScope.iniLoading = true;
                        deferred.resolve();

                    },function(err){
                        console.log('cant get user profile, user is not logged-in inside the resolve function');
                        $rootScope.iniLoading = true;
                        deferred.resolve();
                    });*/
                    
                    deferred.resolve();
                    $rootScope.iniLoading = true;
                    
                    return deferred.promise;
                }
            }
        }
        
    },
    {
        stateName: 'root.loggedin',
        
        stateObj: {
            url: '/',
            views: {
                "topNavBar@": {
                    templateUrl: "/partials/forms/login.html",
                    //controller: 'UserController'
                },
                "main": {
                    templateUrl: "/partials/pages/home.html",
                    //controller: 'SubscriptionController'
                },
                "banner@root":{
                    templateUrl: "/partials/includes/banner.html"
                },
                "body@root":{
                    templateUrl: "/partials/includes/pick-balls.html",
                    controller: 'SubscriptionController'
                },
                "footer@":{
                    templateUrl: "/partials/includes/footer.html"
                }
            },
            data: {
                ncyBreadcrumbLabel: 'home'
            }
        }
    },
    {
        stateName: 'root.pages',
        stateObj: {
            abstract: true,
            data: {
                ncyBreadcrumbSkip: "truthyString"
            }
        }
    },
    {
        stateName: 'root.pages.faq',
        stateObj: {
            url: "faq",
            views: {
                "banner@": {
                    templateUrl: "/partials/includes/banner-inner.html"
                },
                "main@": {
                    templateUrl: "/partials/pages/content/faq.html"
                }
            },
            data: {
                ncyBreadcrumbLabel: 'faq'
            }
        }
    },
    /*{
        stateName: 'root.forgot-password',
        stateObj: {
            url: "forgot-password",
            onEnter: function($stateParams, $state, $modal){

                var modalInstance;

                modalInstance = $modal.open({
                    templateUrl: '/partials/modals/forget-password.html',
                    controller: 'ForgotPWController',
                    windowClass: 'forgotpw-modal-window'

                });

                modalInstance.result.then(function(){

                },function(){
                    $state.go('root');
                });
            }
        }
    },*/
    /*{
        stateName: 'root.login',
        stateObj: {
            url: "login",
            views: {
                "banner@": {
                    templateUrl: "/partials/includes/banner-inner.html"
                },
                "main@": {
                    controller: 'UserController',
                    templateUrl: "/partials/forms/login-big.html"
                }
            }
        }
    },*/
    {
        stateName: 'root.login',
        stateObj: {
            url: "login",
            onEnter: function(UserService){

                UserService.openLoginForm({},{
                    autoRedirect:'open',
                    funcAfterSuccess: function(){
                        //just empty body
                    }
                });
            },
             data: {
                //ncyBreadcrumbLabel: 'login',
                //ncyBreadcrumbParent: 'root'
                ncyBreadcrumbSkip: "truthyString"
            }
            
        }
    },
    {
        stateName: 'root.forgot-password',
        stateObj: {
            url: "forgot-password",
            onEnter: function(UserService){

                UserService.openForgotPWForm();
            },
            data: {
                ncyBreadcrumbSkip: "truthyString"
            }
        }
    },
    {
        stateName: 'root.reset-password',
        stateObj: {
            url: "reset-password",
            onEnter: function(UserService){

                UserService.openResetPWForm();
            },
            data: {
                ncyBreadcrumbSkip: "truthyString"
            }
        }
    },
    {
        stateName: 'root.register',
        stateObj: {
            url: "register?step",
            //controller: 'RegisterController',
            onEnter: function ($stateParams, $state, $modal, VerifyPhone, subscriptionManager) {

                console.log('Log the stateParams:');
                console.log($stateParams);
                console.log($state);

                var modalInstance;

                if( $stateParams && 
                    'payment' == $stateParams.step){
                    //open the payment form
                    modalInstance = $modal.open({
                        templateUrl: '/partials/modals/payment.html',
                        controller: 'RegisterController',
                        windowClass: "reg-modal-window",
                    });
                }
                else{
                    //open the page when fire the "url"
                    modalInstance = $modal.open({
                        templateUrl: '/partials/modals/register.html',
                        controller: 'RegisterController',
                        windowClass: "reg-modal-window",
                        size:'lg'
                    });
                }

                modalInstance.result.then(function (data) {
                    console.log('received data when closeing reg modal');
                    console.log(data);
                    if( !_.isUndefined(data) ){
                        if( !_.isUndefined(data.funcAfterModalClose) && 
                            'function' === typeof data.funcAfterModalClose){
                            data.funcAfterModalClose();
                        }
                    }
                }, function (data) {

                    if( !_.isUndefined(data) ){
                        if( !_.isUndefined(data.funcAfterModalDismiss) && 
                            'function' === typeof data.funcAfterModalDismiss){
                            data.funcAfterModalDismiss();
                        }
                        else{
                            $state.go('root');
                        }
                    }
                    else{
                        $state.go('root');
                    }
                });
            },
            data: {
                ncyBreadcrumbSkip: "truthyString"
            }
        }
    },
    {
        stateName: 'root.account',
        stateObj: {
            url: "account",
            //-------------------
            //TODO:enable the line below when in product mode
            authenticate: true,
            //-----------------------------
            views: {
                "topNavBar@": {
                    templateUrl: "/partials/forms/login.html",
                },
                "main@": {
                    templateUrl: "/partials/pages/account.html",
                    controller: 'AccountController'
                },
                "footer@":{
                    //templateUrl:''
                }
            },
            data: {
                ncyBreadcrumbLabel: 'account'
            }
        }
    }
    ,
    {
        stateName: 'root.account.detail',
        stateObj: {
            url: "/detail",
            //-------------------
            //TODO:enable the line below when in product mode
            authenticate: true,
            //-----------------------------
            views: {
                "topNavBar@": {
                    //templateUrl: "/partials/forms/login.html",
                },
                "main@": {
                    templateUrl: "/partials/pages/account.html",
                    controller: 'AccountController',
                },
                "navBar@root.account.detail": {
                    templateUrl: "/partials/forms/login.html",
                },
                "section@root.account.detail":{
                    templateUrl: "/partials/pages/account/detail.html",
                    controller: 'AccountDetailController'
                },
                "footer@":{
                    //templateUrl:''
                }
            },
            data: {
                ncyBreadcrumbLabel: 'detail'
            }
        }
    }
    ,
    {
        stateName: 'root.account.payment',
        stateObj: {
            url: "/payment",
            //-------------------
            //TODO:enable the line below when in product mode
            authenticate: true,
            //-----------------------------
            views: {
                "topNavBar@": {
                },
                "main@": {
                    templateUrl: "/partials/pages/account.html",
                    controller: 'AccountController'
                },
                "navBar@root.account.payment": {
                    templateUrl: "/partials/forms/login.html",
                },
                "section@root.account.payment":{
                    templateUrl: "/partials/pages/account/payment.html",
                    controller: 'AccountPaymentController'
                },
                "footer@":{
                    //templateUrl:''
                }
            },
            data: {
                ncyBreadcrumbLabel: 'payment'
            }
        }
    }
    ,
    {
        stateName: 'root.account.withdraw',
        stateObj: {
            url: "/withdraw",
            //-------------------
            //TODO:enable the line below when in product mode
            authenticate: true,
            //-----------------------------
            views: {
                "topNavBar@": {
                },
                "main@": {
                    templateUrl: "/partials/pages/account.html",
                    controller: 'AccountController'
                },
                "navBar@root.account.withdraw": {
                    templateUrl: "/partials/forms/login.html",
                },
                "section@root.account.withdraw":{
                    templateUrl: "/partials/pages/account/withdraw.html",
                    controller: 'AccountWithdrawController'
                },
                "footer@":{
                    //templateUrl:''
                }
            },
            data: {
                ncyBreadcrumbLabel: 'withdraw'
            }
        }
    }
    ,
    {
        stateName: 'root.account.transaction',
        stateObj: {
            url: "/transaction",
            //-------------------
            //TODO:enable the line below when in product mode
            //authenticate: true,
            //-----------------------------
            views: {
                "topNavBar@": {
                },
                "main@": {
                    templateUrl: "/partials/pages/account.html",
                    controller: 'AccountController'
                },
                "navBar@root.account.transaction": {
                    templateUrl: "/partials/forms/login.html",
                },
                "section@root.account.transaction":{
                    templateUrl: "/partials/pages/account/transaction.html",
                    controller: 'AccountTransactionController'
                },
                "footer@":{
                    //templateUrl:''
                }
            },
            data: {
                ncyBreadcrumbLabel: 'transaction'
            }
        }
    }
    ,
    {
        stateName: 'root.home',
        stateObj: {
            url: "home",
            //controller: 'SubscriptionController',
            authenticate: true,

            views: {
                "topNavBar@": {
                    templateUrl: "/partials/forms/login.html",
                    //controller: 'UserController'
                },
                "main": {
                    templateUrl: "/partials/pages/home.html",
                    //controller: 'SubscriptionController'
                },
                "banner@root":{
                    templateUrl: "/partials/includes/banner-small.html"
                },
                "body@root":{
                    templateUrl: "/partials/pages/edit-draw.html",
                    controller: 'SubscriptionEditController'
                },
                "prizes@root.home":{
                    templateUrl: "/partials/includes/allPrizes.html",
                },
                "novainfo@root.home":{
                    templateUrl: "/partials/includes/novaballInfo.html",
                },
                "footer":{
                    templateUrl: "/partials/includes/footer.html"
                }
            },
            data: {
                ncyBreadcrumbLabel: 'home'
            }
        }
    }
    ,
    {
        stateName: 'root.home.result',
        stateObj: {
            url: "/sub-result",
            //controller: 'SubscriptionController',
            authenticate: true,

            views: {
                "topNavBar@": {
                    templateUrl: "/partials/forms/login.html",
                    //controller: 'UserController'
                },
                "main": {
                    //templateUrl: "/partials/pages/home.html",
                },
                "banner@root":{
                    //templateUrl: "/partials/includes/banner-small.html"
                },
                "body@root":{
                    templateUrl: "/partials/pages/subscription/result.html",
                    controller: 'SubscriptionResultController'
                },
                "footer":{
                    templateUrl: "/partials/includes/footer.html"
                }
            },
            data: {
                ncyBreadcrumbLabel: 'subscription result',
                ncyBreadcrumbParent: 'root.home'
            }
        }
    }
    ,
    {
        stateName: 'root.home.result-latest',
        stateObj: {
            url: "/sub-latest-result",
            authenticate: true,

            views: {
                "topNavBar@": {
                    templateUrl: "/partials/forms/login.html",
                },
                "main": {
                    templateUrl: "/partials/pages/home.html",
                },
                "banner@root":{
                    templateUrl: "/partials/includes/banner-small.html"
                },
                "body@root":{
                    templateUrl: "/partials/pages/subscription/latest-result.html",
                    controller: 'SubscriptionResultController'
                },
                "footer":{
                    templateUrl: "/partials/includes/footer.html"
                }
            },
            data: {
                ncyBreadcrumbLabel: 'subscription result',
                ncyBreadcrumbParent: 'root.home'
            }
        }
    }
    ,
    {
        stateName: 'root.home.draw',
        stateObj: {
            abstract: true,
            data: {
                ncyBreadcrumbSkip: "truthyString"
            }
        }
    }
    ,
    {
        stateName: 'root.home.draw.result',
        stateObj: {
            url: "/draw-result",
            //TODO: enable the authenticate under procudction mode
            authenticate: true,

            views: {
                "topNavBar@": {
                    templateUrl: "/partials/forms/login.html",
                },
                "main": {
                    //templateUrl: "/partials/pages/home.html",
                },
                "banner@root":{
                    //templateUrl: "/partials/includes/banner-small.html"
                },
                "body@root":{
                    templateUrl: "/partials/pages/draw-result.html",
                    //controller: 'SubscriptionEditController'
                },
                "footer":{
                    templateUrl: "/partials/includes/footer.html"
                }
            },
            data: {
                ncyBreadcrumbLabel: 'draw result',
                ncyBreadcrumbParent: 'root.home'
            }
        }
    }
    ,
    {
        stateName: 'root.subscription',
        stateObj: {
            abstract: true,
            data: {
                ncyBreadcrumbSkip: "truthyString"
            }
        }
    }
    ,
    /*
     * Result page for Subscription
    */
    /*{
        stateName: 'root.subscription.result',
        stateObj: {
            url: "subscription/result",
            //controller: 'SubscriptionResultController',
            //TODO: enable the line below to force the authentication
            authenticate: true,
            views: {
                "topNavBar@": {
                    templateUrl: "/partials/forms/login.html",
                    resolve:{
                        getRelativePath: function(){
                            return {'relPath':'../'};
                        }
                    },
                    controller: function($scope, getRelativePath){
                        $scope.relPath = getRelativePath.relPath;
                    }
                },
                "//topNavBar@root.subscription.result": {
                    //templateUrl: "/partials/forms/login.html",
                //},
                "main": {
                    templateUrl: "/partials/pages/home.html",
                },
                "banner@root":{
                    templateUrl: "/partials/includes/banner-small.html"
                },
                "body@root":{
                    templateUrl: "/partials/pages/subscription-result.html",
                },
                "footer":{
                    templateUrl: "/partials/includes/footer.html"
                }
            }
        }
    }*/
    /*{
        stateName: 'root.subscription.result',
        stateObj: {
            url: "/result",
            controller: 'SubscriptionResultController',
            //TODO: enable the line below to force the authentication
            authenticate: true,
            views: {
                "banner@": {
                    templateUrl: "/partials/includes/banner-inner.html"
                },
                "main@": {
                    templateUrl: "/partials/pages/subscription-result.html"
                },
                "rightSide@root.subscription.result":{
                    templateUrl: "/partials/pages/right-side-draw-result.html"
                }
            }
        }
    }*/
    ,
    {
        stateName: 'root.subscription.afterDraw',
        stateObj: {
            url: "/after-draw",
            controller: 'SubscriptionResultController',
            authenticate: true,
            views: {
                "banner@": {
                    templateUrl: "/partials/includes/banner-inner.html"
                },
                "main@": {
                    templateUrl: "/partials/pages/after-draw.html"
                },
                "rightSide@root.subscription.afterDraw":{
                    templateUrl: "/partials/pages/right-side-draw-result.html"
                }
            }
        }
    }
    ,
    {
        stateName: 'root.subscription.editDraw',
        stateObj: {
            url: "/edit-draw",
            authenticate: true,
            views: {
                "banner@": {
                    templateUrl: "/partials/includes/banner-inner.html"
                },
                "main@": {
                    templateUrl: "/partials/pages/edit-draw.html",
                    controller: 'SubscriptionEditController',
                },
                "rightSide@root.subscription.editDraw":{
                    templateUrl: "/partials/pages/right-side-draw-result.html"
                }
            }
        }
    }
    ,
    {
        stateName: 'root.home.payment',
        stateObj: {
            abstract: true,
            data: {
                ncyBreadcrumbSkip: true
            }
        }
    }
    ,
    {
        stateName: 'root.home.payment.success',
        stateObj: {
            url: "/3ds_success",
            authenticate: true,
            onEnter: function(PaymentService){

                PaymentService.openPaymentSuccess();
            },
             data: {
                ncyBreadcrumbSkip: "truthyString",
                //ncyBreadcrumbLabel: 'payment success',
                ncyBreadcrumbParent: 'root.home.payment'
            }
            
        }
    }
    ,
    {
        stateName: 'root.home.payment.failed',
        stateObj: {
            url: "/3ds_fail",
            authenticate: true,
            onEnter: function(PaymentService){

                PaymentService.openPaymentFailed();
            },
             data: {
                ncyBreadcrumbSkip: "truthyString"
                //ncyBreadcrumbLabel: 'payment failed',
                //ncyBreadcrumbParent: 'root'
            }
            
        }
    }
];

// Make these routes available to the Node service.
(function (exports, _r) {

    var _ = typeof require === 'undefined' ? {} : require("underscore");

    exports.getModRewriteRoutes = function () {
        //
        var stateArray = {};


        function stringToObj(path, value, obj) {
            var parts = path.split("."), part;
            while (part = parts.shift()) {
                if (typeof obj[part] != "object") obj[part] = {};
                obj = obj[part]; // update "pointer"
            }
            obj["url"] = value;
        }

        for (var i in _r) {
            var state = _r[i];
            if (typeof state.stateObj.url !== 'undefined') {
                stringToObj(state.stateName, state.stateObj.url, stateArray)
            }
        }

        // stateArray contains the parsed states, but we'll use this dummy one for now.
        // TODO replace this in production.

        var routes = [
            '/',
            '/home',
            '/forgot-password',
            '/reset-password',
            '/login',
            '/home/3ds_success([\?]*)(.*)',
            '/home/3ds_fail([\?]*)(.*)',
            '/register(.*)',
            '/account',
            '/account(.*)',
            '/home/draw-result',
            '/subscription/result',
            '/home/sub-result',
            '/home/sub-latest-result',
            '/faq'
        ];

        var res = [];

        for (var i in routes) {
            res.push('^' + routes[i].replace(":id", "([A-Za-z0-9]+)") + '$ /index.html [L]');
        }

        return res;

    };

})(typeof exports === 'undefined' ? this['stateModule'] = {} : exports, states);

