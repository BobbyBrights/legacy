var routes = [
    {
        state: "home",
        url: "/home",
        templateUrl: "/views/partials/home.html",
        title: "Home",
        showInNavigation: true
    },
    {
        state: "account",
        url: "/account",
        templateUrl: "/views/partials/account.html",
        title: "Account",
        showInNavigation: true
    },
    {
        state: "user",
        url: "/user/:id",
        templateUrl: "/views/partials/user.html",
        title: "User"

    }
];

// Make these routes available to the Node service.
(function (exports, _r) {
    exports.getRoutes = function () {
        return _r;
    };
})(typeof exports === 'undefined' ? this['hokio'] = {} : exports, routes);