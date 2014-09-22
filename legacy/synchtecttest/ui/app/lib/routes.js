// Routes file for STT Node service (for Angular & Node routing)
// Note: paths are absolute as required by connect-modrewrite.
// This allows us to use HTML5 pushState for pretty URLs (no hasnbang).

var routes = [
    {
        "path": "/",
        "route": {
            "templateUrl": "/views/partials/main.html",
            "controller": "MainCtrl"
        }
    }
];

// Make these routes available to the Node service.
(function (exports, _r) {
    exports.getRoutes = function () {
        return _r;
    };
})(typeof exports === 'undefined' ? this['sttmodule'] = {} : exports, routes);