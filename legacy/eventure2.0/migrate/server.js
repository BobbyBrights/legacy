"use strict";

var restify = require("restify");
var restifyOAuth2 = require("restify-oauth2");
var hooks = require("./hooks/cc");
var Eventure = require("./db/eventure");

// NB: we're using [HAL](http://stateless.co/hal_specification.html) here to communicate RESTful links among our
// resources, but you could use any JSON linking format, or XML, or even just Link headers.

var server = restify.createServer({
    name: "Example Restify-OAuth2 Client Credentials Server",
    version: require("./package.json").version
});

var RESOURCES = Object.freeze({
    INITIAL:    "/",
    TOKEN:      "/token",
    PUBLIC:     "/public",
    SECRET:     "/secret",
    USER:       "/user",
    EVENT:      "/events/:id",
    EVENTS:     "/events",
    PROMOTERS:  "/promoters"
});

server.use(restify.authorizationParser());
server.use(restify.bodyParser({ mapParams: false }));
restifyOAuth2.cc(server, { tokenEndpoint: RESOURCES.TOKEN, hooks: hooks });

server.get(RESOURCES.INITIAL,       Eventure.broadcast);
server.get(RESOURCES.EVENT,         Eventure.getEvent);
server.get(RESOURCES.EVENTS,        Eventure.getAllEvents);
server.post(RESOURCES.EVENTS,       Eventure.addEvent);
server.put(RESOURCES.EVENT,         Eventure.updateEvent);
server.get(RESOURCES.PROMOTERS,     Eventure.getAllPromoters);
server.post(RESOURCES.USER,         Eventure.addUser);

server.listen(3000);