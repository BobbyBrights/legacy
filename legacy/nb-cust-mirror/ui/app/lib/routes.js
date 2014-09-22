var routes = [
    {
        "path": "/",
        "route": {
            "templateUrl": "/views/customer-ui/main.html",
            "controller": "MainCtrl"
        }
    },
    {
        "path": "/lines",
        "route": {
            "templateUrl": "/views/customer-ui/profile/view.html",
            "controller": "ProfileCtrl"
        }
    },
    {
        "path": "/lines/edit",
        "route": {
            "templateUrl": "/views/customer-ui/subscription/edit.html",
            "controller": "SubscriptionCtrl"
        }
    },
    {
        "path": "/account",
        "route": {
            "templateUrl": "/views/customer-ui/account/view.html",
            "controller": "AccountCtrl"
        }
    },
    {
        "path": "/account/topup",
        "route": {
            "templateUrl": "/views/customer-ui/account/topup.html",
            "controller": "AccountCtrl"
        }
    },
    {
        "path": "/account/topup/success",
        "route": {
            "templateUrl": "/views/customer-ui/account/topup-success.html",
            "controller": "AccountCtrl"
        }
    },
    {
        "path": "/register",
        "route": {
            "templateUrl": "/views/customer-ui/profile/verify-phone.html",
            "controller": "ProfileCtrl"
        }
    },
    {
        "path": "/register/add-details",
        "route": {
            "templateUrl": "/views/customer-ui/profile/add-details.html",
            "controller": "ProfileCtrl"
        }
    },
    {
        "path": "/register/add-card",
        "route": {
            "templateUrl": "/views/customer-ui/profile/add-card.html",
            "controller": "PCICtrl"
        }
    },
    {
        "path": "/register/complete", hasQueryString: true,
        "route": {
            "templateUrl": "/views/customer-ui/profile/finished.html",
            "controller": "ProfileCtrl"
        }
    },
    {
        "path": "/results",
        "route": {
            "templateUrl": "/views/customer-ui/lottery/index.html",
            "controller": "LotteryCtrl"
        }
    },
    {
        "path": "/results/:id",
        "route": {
            "templateUrl": "/views/customer-ui/lottery/index.html",
            "controller": "LotteryCtrl"
        }
    },
    {
        "path": "/history/:id",
        "route": {
            "templateUrl": "/views/customer-ui/history/view.html",
            "controller": "HistoryCtrl"
        }
    }
];

// Make these routes available to the Node service.
(function (exports, _r) {
    exports.getRoutes = function () {
        return _r;
    };
})(typeof exports === 'undefined' ? this['mymodule'] = {} : exports, routes);
