"use strict";
console.log("Starting up web service for STT.. ");

var restify = require("restify"),
    nstatic = require("node-static"),
    _ = require("underscore"),
    modRewrite = require('connect-modrewrite'),
    appRoutes = require('./ui/app/lib/routes'),
    service = require('./services/api');

// Create the server
var server = restify.createServer({
    name: "STT Client Credentials Server",
    version: require("./package.json").version
});

// Some middleware.
server.use(restify.authorizationParser());
server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.queryParser());

// For pretty URL rewriting, we use a common routes file.
// Angular already knows what to do with these, so we just forward every request
// to index.html, and let Angular take over. Then, HTML5 pushState allows us to have non hashbang URI's
var routes = new Array();
var _a = appRoutes.getRoutes();
for(var i in _a){
    // Parameters are added in Angular as :param, need to transpose these to a valid regex group.
    _a[i].path = _a[i].path.replace(":id","([A-Za-z0-9]+)");
    routes.push('^' + _a[i].path + (_a[i].hasQueryString ? '(\\?.*)?' : '') + '$ /index.html [L]');
}
console.log("Setting up the following routes:\n" , routes);
// Mod rewrites
server.use(modRewrite(routes));

// API routes
server.get("/item", service.getItems);
server.get("/item/:id", service.getItem);

// Serve static files using Node Static
var file = new nstatic.Server('./ui/app/');
server.get(/^.*/, function (req, res, next) {
    file.serve(req, res, function (err) {
        if (err) {
            throw err;
        }
        next();
    });
});

// Startup the server.
server.listen(process.env.PORT || 3636, function () {
    console.log('Started up and listening on %s', server.url);
});