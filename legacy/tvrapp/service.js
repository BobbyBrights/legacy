"use strict";
console.log("TVR Node Service starting");

var restify = require("restify"),
    fs = require('fs'),
    _ = require('underscore'),
    http = require("http"),
    scraper = require('./lib/scraper'),
    request = require('request'),
    _parse = require('./lib/parse-test');

// Create the server
var server = restify.createServer({
    name: "Novaball Restify-OAuth2 Client Credentials Server"
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


// Endpoints
server.post("/show", function (req, res, next) {
    console.log(req.body);

    _parse.addShow(req.body).then(function (_s) {
        res.send(201, _s);
    }, function (_e) {
        res.send(_e.status || 400, _e);
    });
});

server.get("/show", _parse.getShows);
server.get("/show/:guid", _parse.getShow);

server.post("/device", function (req, res, next) {
    _parse.addDevice(req.body).then(function (_s) {
        res.send(201, _s);
    }, function (_e) {
        res.send(400, _e);
    })
});


server.get("/scrape/:id", function (req, res, next) {
    res.contentType = "application/json";
    request({uri: 'http://epguides.com/' + req.params.id + '/'}, function (err, response, body) {
        //Just a basic error check
        if (err && response.statusCode !== 200) {
            res.send(response.statusCode, err);
        }

        var show = scraper.parse(body, response.request.href, req.params.id);
        res.send(200, show);

    });
});


// Startup
server.listen(process.env.PORT || 3100, function () {
    console.log('Started up and listening on %s', server.url);
});