"use strict";
console.log("PixieWebDesign.net (NodeJS) API - v1.0 ");

var restify = require("restify"),
    nstatic = require("node-static"),
    restifyOAuth2 = require("restify-oauth2"),
    hooks = require("./lib/hooks"),
    _ = require("underscore"),
    endpoints = require("./lib/endpoints");


// Allow authentication CORS
restify.CORS.ALLOW_HEADERS.push('authorization');

// Create the server
var server = restify.createServer({
    name: "Pixie Restify-OAuth2 Client Credentials Server",
    version: require("./package.json").version
});

// Prerender!
server.use(require('prerender-node'));

// Some middleware.
server.use(restify.authorizationParser());
server.use(restify.bodyParser({ mapParams: false }));
// Register our OAuth server
restifyOAuth2.cc(server, { tokenEndpoint: "/token", hooks: hooks });

// Routes
server.get("/api", endpoints.getAPI);
server.get("/portfolio", endpoints.getPortfolio);
server.post("/portfolio", endpoints.addPortfolio);
server.get("/portfolio/:id", endpoints.getPortfolio);
server.post("/blog", endpoints.addBlog);
server.get("/blog", endpoints.getBlog);
server.get("/blog/:id", endpoints.getBlog);
server.post("/contact", endpoints.postContact);
server.post("/category", endpoints.addCategory);

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
server.listen(process.env.PORT || 3333, function(){
    console.log('Started up and listening on %s', server.url);
});

