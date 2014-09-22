"use strict";
require('newrelic');

var restify = require("restify"),
    nstatic = require("node-static"),
    restifyOAuth2 = require("restify-oauth2"),
    hooks = require("./providers/cc/hooks"),
    _ = require("underscore"),
    modRewrite = require('connect-modrewrite'),
    apiRoutes = require('./lib/endpoints'),
    appRoutes = require('./ui/app/lib/routes');

// Allow authentication CORS
restify.CORS.ALLOW_HEADERS.push('authorization');

// Create the server
var server = restify.createServer({
    name: "PixieWebDesign Restify-OAuth2 Client Credentials Server",
    version: require("./package.json").version
});

// Some middleware.
server.pre(restify.pre.sanitizePath());
server.use(restify.authorizationParser());
server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.queryParser({ mapParams: false }));

var routes = new Array();
var _a = appRoutes.getRoutes();
for(var i in _a){
    // Parameters are added in Angular as :param, need to transpose these to a valid regex group.
    _a[i].path = _a[i].path.replace(":id","([A-Za-z0-9]+)");
    _a[i].path = _a[i].path.replace(":slug",".*");
    routes.push('^' + _a[i].path + (_a[i].hasQueryString ? '(\\?.*)?' : '') + '$ /index.html [L]');
}

console.log("Setting up the following routes:\n" , routes);
// Mod rewrites
server.use(modRewrite(routes));

// Register our OAuth server
restifyOAuth2.cc(server, { tokenEndpoint: "/api/token", hooks: hooks });

// Get our API routes
server.get("/api/blog/:id/:mode", apiRoutes.getBlog);
server.get("/api/blog/read", apiRoutes.getBlog);
server.get("/api/blog/:id", apiRoutes.getBlog);

server.get("/api/categories", apiRoutes.getBlogCategories);
server.post("/api/blog", apiRoutes.addBlog);
server.put("/api/blog/:id", apiRoutes.updateBlog);



// Serve static files
var file = new nstatic.Server('./ui/app/');
server.get(/^.*/, function (req, res, next) {
    file.serve(req, res, function (err) {
        if (err) {
            throw err;
        }
        next();
    });
});

// Startup
server.listen(process.env.PORT || 4444, function () {
    console.log('Started up and listening on %s', server.url);
});