var routes = [
    {
        "path": "/",
        "route": {
            "templateUrl": "/views/main.html",
            "controller": "MainCtrl",
            "pageClass": "home"
        }
    },
    {
        "path": "/login",
        "route": {
            "templateUrl": "/views/login.html",
            "controller": "LoginCtrl",
            "pageClass": "login"
        }
    },
    {
        "path": "/contact",
        "route": {
            "templateUrl": "/views/contact.html",
            "controller": "PageCtrl",
            "pageClass": "contact"
        }
    },
    {
        "path": "/about",
        "route": {
            "templateUrl": "/views/about.html",
            "controller": "PageCtrl",
            "pageClass": "about"
        }
    },
    {
        "path": "/blog",
        "route": {
            "templateUrl": "/views/blog.html",
            "controller": "BlogCtrl",
            "pageClass": "blog"
        }
    },
    {
        "path": "/blog/add",
        "route": {
            "templateUrl": "/views/blog-form.html",
            "controller": "BlogCtrl",
            "pageClass": "blog-add"
        }
    },
    {
        "path": "/blog/edit/:id",
        "route": {
            "templateUrl": "/views/blog-form.html",
            "controller": "BlogCtrl",
            "pageClass": "blog-single"
        }
    },
    {
        "path": "/blog/:slug/:id",
        "route": {
            "templateUrl": "/views/blog-single.html",
            "controller": "BlogCtrl",
            "pageClass": "blog-single"
        }
    }
];

// Make these routes available to the Node service.
(function (exports, _r) {
    exports.getRoutes = function () {
        return _r;
    };
})(typeof exports === 'undefined' ? this['mymodule'] = {} : exports, routes);