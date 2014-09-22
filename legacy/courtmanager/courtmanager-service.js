"use strict";
console.log("CourtManager starting up");

var restify = require("restify"),
    nstatic = require("node-static"),
    restifyOAuth2 = require("restify-oauth2"),
    hooks = require("./packages/restify-oauth2/hooks"),
    _ = require("underscore"),
    database = require('./packages/database/main');

// Create the server
var server = restify.createServer({
    name: "Novaball Restify-OAuth2 Client Credentials Server",
    version: require("./package.json").version
});
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
});

// Allow authorization
restify.CORS.ALLOW_HEADERS.push('authorization');

// Some middleware.
server.use(restify.authorizationParser());
server.use(restify.queryParser());
server.use(restify.bodyParser({ mapParams: false }));

// Register our OAuth server
restifyOAuth2.cc(server, { tokenEndpoint: "/token", hooks: hooks });

// Endpoints
server.get("/court", database.getCourts);
server.get("/court/:id", database.getCourts);
server.get("/court_category", database.getCourtCategory);
server.get("/venue", database.getVenues);

server.post("/court", database.addCourt);
server.post("/court_category", database.addCourtCategory);
server.post("/venue", database.addVenue);

// User
server.post("/user", database.addUser);


// Nice hack.
server.get("/cordova.js", function(req, res){
    res.send(404);
});


// Serve static files
var file = new nstatic.Server('./cm-app/www/');
server.get(/^.*/, function (req, res, next) {
    file.serve(req, res, function (err) {
        if (err) {
            throw err;
        }
        next();
    });
});

// Startup
server.listen(process.env.PORT || 3010, function () {
    console.log('Started up and listening on %s', server.url);
});