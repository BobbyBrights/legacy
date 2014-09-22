"use strict";
if (typeof console !== 'undefined') {
    console.log("JIX Server - starting up");
}
var restify = require("restify"),
    request = require("request"),
    nstatic = require("node-static"),
    _ = require("underscore"),
    config = require("./rt/config"),
    passport = require('passport'),
    LdapStrategy = require('passport-ldapauth').Strategy;

passport.use(new LdapStrategy(config.ldap));

var argv = require('minimist')(process.argv);

// Create the server
var server = restify.createServer({
    name: "JIX Server",
    version: require("./package.json").version
});


// Body parsers
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(passport.initialize());

server.post('/login', passport.authenticate('ldapauth', {session: false}), function (req, res, next) {
    res.send({status: 'ok'});
}, function (a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);

});

server.get("/ticket", function (req, res, next) {

    // TODO - Obviously replace this with the currently logged in user.
    req.params.originatorId = 'MCELHINNEYS';

    var options = {
        url: config.jira.api.search + req.params.originatorId,
        headers: {
            'Authorization': 'Basic ' + config.jira.base64credentials
        }
    };

    if (!!argv['use-proxy'] && argv['use-proxy'] === 'true') {
        options.proxy = config.proxy;
    }

    console.log(options);

    var cb = function cb(error, response, body) {
        if (!error) {
            var _o = JSON.parse(body);
            _.each(_o.issues, function (i, j) {
                _o.issues[j].url = config.jira.http + _o.issues[j].key;
            });
            res.send(200, _o.issues);
        } else {
            console.log(error, response, body);
            res.send(response.statusCode, {
                error: error, response: response, body: body
            });
        }
    };

    //res.send(200, {});
    request.get(options, cb);
});

server.get("/ticket/:id", function (req, res, next) {
    console.log("Retrieving ticket by id");


});

server.post("/ticket", function (req, res, next) {
    console.log(req.body);

    var _r = {
        "fields": {
            "project": {
                "key": config.jira.project.key
            },
            "summary": req.body.summary,
            "description": req.body.description,
            "issuetype": {
                "name": "Task"
            }
        }
    };

    _r.fields["customfield_" + config.jira.originatorFieldId] = req.body.name;

    console.log(_r);

    var options = {
        url: config.jira.api.ticket,
        headers: {
            'Authorization': 'Basic ' + config.jira.base64credentials
        },
        json: _r
    };

    if (!!argv['use-proxy'] && argv['use-proxy'] === 'true') {
        options.proxy = config.proxy;
    }

    console.log(options);

    var cb = function cb(error, response, body) {
        if (!error) {
            body.url = config.jira.http + body.key;
            console.log(body);
            res.send(200, body);
        } else {
            console.log(error, response, body);
            res.send(response.statusCode, {
                error: error, response: response, body: body
            });
        }
    };

    //res.send(200, {});
    request.post(options, cb);
});

// Serve the rest as static files
var file = new nstatic.Server('./ui/');
server.get(/^.*/, function (req, res, next) {
    file.serve(req, res, function (err) {
        if (err) {
            throw err;
        }
        next();
    });
});

// Startup
server.listen(process.env.PORT || 8082, function () {
    if (typeof console !== 'undefined') {
        console.log('Started up and listening on %s', server.url);
    }
});
