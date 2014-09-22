"use strict";
var restify = require("restify"),
    nstatic = require("node-static"),
    restifyOAuth2 = require("restify-oauth2"),
    hooks = require("./packages/oauth/hooks"),
    _ = require("underscore"),
    modRewrite = require('connect-modrewrite'),
    appRoutes = require('./ui/app/lib/routes'),
    Parse = require('parse').Parse,
    cfg = require('./package.json');

// Setup Parse
Parse.initialize(cfg.parse.app_id, cfg.parse.js_key);

// Allow authentication CORS
restify.CORS.ALLOW_HEADERS.push('authorization');

// Create the server
var server = restify.createServer({
    name: "Hok.io Restify-OAuth2 Client Credentials Server",
    version: require("./package.json").version
});

// Some middleware.
server.pre(restify.pre.sanitizePath());
server.use(restify.authorizationParser());
server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.queryParser({ mapParams: false }));

var routes = new Array();
var _a = appRoutes.getRoutes();

for (var i in _a) {
    // Parameters are added in Angular as :param, need to transpose these to a valid regex group.
    _a[i].url = _a[i].url.replace(":id", "([A-Za-z0-9]+)");
    _a[i].url = _a[i].url.replace(":slug", ".*");
    routes.push('^' + _a[i].url + (_a[i].hasQueryString ? '(\\?.*)?' : '') + '$ /index.html [L]');
}

console.log("Setting up the following routes:\n", routes);
// Mod rewrites
server.use(modRewrite(routes));



// Register our OAuth server
restifyOAuth2.cc(server, { tokenEndpoint: "/api/token", hooks: hooks });

// Set up api endpoints here.
server.get("/api", function (req, res, next) {
    res.send(200, {api: 'hok.io', version: '0.1'});
});

server.get("/search", function (req, res, next) {
    console.log("Searching");
//    var Venue = Parse.Object.extend("Venue");
//    var query = new Parse.Query(Venue);
//
//    query.find({
//        success: function(data) {
//            res.send(200, data);
//        },
//        error: function(object, error) {
//            res.send(400, error);
//        }
//    });

    res.send(200, [
        {
            "user": "Stephen",
            "skill": "English Teacher",
            "location": "Dublin",
            "rating": 4.5,
            "gender": "male"
        },{
            "user": "Fiona",
            "skill": "English Teacher",
            "location": "Cork",
            "rating": 3.5,
            "gender": "female"
        }
    ])
});

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
server.listen(process.env.PORT || 3535, function () {
    console.log('Started up and listening on %s', server.url);
});