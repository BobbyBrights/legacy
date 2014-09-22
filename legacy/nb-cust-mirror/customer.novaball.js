"use strict";
console.log("Novaball Middleware (NodeJS) API - v1.0 ");

var restify = require("restify"),
    nstatic = require("node-static"),
    oauth = require("restify-oauth2"),
    hooks = require("./providers/cc/hooks"),
    stat = require('node-static'),
    _ = require("underscore"),
    _api = require("./routes/endpoints"),
    modRewrite = require('connect-modrewrite'),
    appRoutes = require('./ui/new/assets/js/navigation/states'),
    services = require('./package.json').services,
    Mustache = require('mustache'),
    fs = require('fs'),
    url = require('url'),
    http = require('http'),
    express = require('express'),
    Buffer = require('buffer');

// Allow authentication CORS
restify.CORS.ALLOW_HEADERS.push('authorization');

// Create the server
var server = restify.createServer({
    name: "Novaball Restify-OAuth2 Client Credentials Server",
    version: require("./package.json").version
});

// Some middleware.
server.use(restify.authorizationParser());
//server.use(restify.bodyParser({ mapParams: false }));
server.use(express.bodyParser());
server.use(restify.queryParser());

// Set up rewrite routes
server.use(modRewrite(appRoutes.getModRewriteRoutes()));

//enable the cookie parser
server.use(express.cookieParser());

//register the proxy server for some spicific path
server.use(function(request, response, next) {

    //log info
    console.log('Request Method:');
    console.log(request.method);
    console.log('Request Url:');
    console.log(request.url);
    //console.log('Request Uri:');
    //console.log(request.uri);
    //console.log('Request Headers:');
    //console.log(request.headers);

    //--------------------------------
    //test dumy data
    /*var someuser = {"name": "user1",
                    "password": "user1",
                    "email": "user1@xxx.com",
                    "affiliateId": 1,
                    "role": "user",   
                    "profile": {
                        "title": "Mr.",
                        "firstName": "Name1",
                        "lastName": "Surname1",
                        "birthDate": "1984-04-21",
                        "email": "user1@xxx.com",
                        "countryOfResidence": "GB",
                        "mobileNo": "+00 00000001",
                        "marketingOptIn" : true,
                        "userType": "user"   
                        }
                    };

    var jsonBody = JSON.stringify(someuser);*/
    //-----------------------------------


    //test for the url, if it is detected then redirect this request to the real server
    var connectWithRealServer = /^(\/user.*|\/subscriptions*|\/bets*|\/lotteries.*|\/add_card*|\/lead.*|\/.*\/pin|\/wallet|\/lines\/.*|\/notification.*)/;

    var cardRequest = /^(\/add_card*)/;

    var pinRequest = /^(\/.*\/pin)/;

    var udpateCardExpiry = /^(\/user\/card\/.*)/;

    var toServerRequest = /^(\/api\/.*)/;

    var resumeRequest = /^(\/api\/user\/subscriptions\/resume)/;

    if( !connectWithRealServer.test(request.url) && 
        !toServerRequest.test(request.url)){
        console.log('Do not contain the desired parts in the url : '+request.url);
        //if not then continue the next path match
        return next();
    }

    console.log('===Contains the USER in the url====');

    var headers = request.headers;

    console.log('Original Headers:');
    console.log(request.headers);

    console.log('Original Body:');
    console.log(request.body);
    console.log('Type of the request.body is: '+ typeof request.body);

    var jsonBody = request.body;

    if(resumeRequest.test(request.url)){
        var resultStr = "";
        for(var key in request.body){
            if(resultStr != ""){
                resultStr += "&";
            }
            resultStr += key + "=" + encodeURIComponent(request.body[key]);
        }
        jsonBody    = resultStr;

        console.log('-----------------------------');
        console.log('The body after serialized is:');
        console.log(resultStr);
        console.log('-----------------------------');
    }
    else{
        jsonBody    = JSON.stringify(request.body);
    }

    console.log('********The json Body is:****************');
    console.log(jsonBody);
    console.log('*****************************************');
    //headers['content-length'] = parseInt(request.headers['content-length']);
    //headers['content-length'] = 0;

    //set the authorization header for path '/user/login'
    if('/user/login' == request.url){
        //headers['authorization'] = request.headers.authorization;
        headers['content-type'] = 'application/json';
        headers['content-length'] = 0;
    }

    //handle user registration
    if( ('/user' == request.url && 
         'POST' == request.method ) ||
        ('/user/subscriptions' == request.url && 
         'POST' == request.method) ||
         '/lead' == request.url ){
        headers['content-type'] = 'application/json';
        //headers['content-type'] = 'application/x-www-form-urlencoded';
        //headers['content-length'] = 0;
        headers['content-length'] = jsonBody.length;
    }
    else if(cardRequest.test(request.url) && 
         'POST' == request.method){
        headers['content-type'] = 'application/x-www-form-urlencoded';

        console.log('Type of the reqeust body');
        console.log(typeof request.body);
        var formString = '';
        //generate the form string before encoded
        for(var property in request.body){
            formString += property + "="+encodeURIComponent(request.body[property])+'&';
        }
        headers['content-length'] = formString.length;
    }
    else if(pinRequest.test(request.url) && 
         'POST' == request.method){
        headers['content-type'] = 'application/json';
        headers['content-length'] = jsonBody.length;
    }
    else if(udpateCardExpiry.test(request.url) && 
        'PATCH' == request.method){
        console.log('=====');
        for(var num=0;num<20;num++){
            console.log('*');
        }

        headers['content-type'] = 'application/json';
        headers['content-length'] = jsonBody.length;
    }

    //exceptions for the request '/api/user/subscriptions/resume'
    if(resumeRequest.test(request.url)){
        headers['content-type'] = 'application/x-www-form-urlencoded';
    }


    //handle user adding card
    if('/user/card' == request.url && 
        'POST' == request.method){
        response.send('card validation');
    }

    console.log('The new HEADER is:');
    console.log(headers);

    //reset the host
    //headers.host = '54.72.103.19:8080';
    //headers.host = '54.72.103.19';
    headers.host = '172.16.131.26';
    //headers.host = 'novaballtest.apiary-mock.com';

    var options = {
        //hostname: '54.72.103.19',
        hostname: '172.16.131.26',
        //port: 8080,
        path: '/api'+request.url,
        headers: headers,
        method: request.method
    };

    if(cardRequest.test(request.url) || 
        toServerRequest.test(request.url)){
        console.log('Rewriting the requset sent to add_card');
        //headers.host = '54.72.210.157';
        //options.hostname = '54.72.210.157';
        //options.path = request.url;
        options.path = request.url;
        //options.query = {'final_url': 'http%3A%2F%2F0.0.0.0%3A4444'};

    }

    /*var options = {
        hostname: 'novaballtest.apiary-mock.com',
        path: request.url,
        headers: headers,
        method: request.method
    };*/

    

    console.log('New options are:');
    console.log(options);

    //handle the proxy request
    var proxy_request = http.request(options, function(proxy_response){
        console.log('2');
        //console.log('LOGGING THE PROXY_RESPONSE');
        //console.log(proxy_response);
        console.log('STATUS: ' + proxy_response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(proxy_response.headers));

        //proxy_request.on('response', function (proxy_response) {
        console.log('3');
        
        proxy_response.on('data', function(chunk) {
            response.write(chunk, 'binary');

            console.log('BODY: '+ chunk);
        });

        proxy_response.on('end', function() {
            response.end();
        });

        //write the response from the issued request to the response which will be sent back to the browser
        response.writeHead(proxy_response.statusCode, proxy_response.headers);
        //});
    });

    var body = '';

    request.on('data', function(chunk) {
        console.log('Got a chunk');
        body += chunk;
        proxy_request.write(chunk, 'binary');
    });
    
    request.on('end', function(chunk) {
        //console.log('The proxy_request before sent is: ');
        //console.log(proxy_request);
        console.log('--==END Event is fired==--');
        if(chunk){
            body += chunk;
        }
        //console.log('Full body:');
        //console.log(body);
        proxy_request.end();
    });

    //--------------------------------------------------------
    console.log(jsonBody);
    console.log('Type of jsonBody: '+ typeof jsonBody);

    if( cardRequest.test(request.url) && 
        'POST' == request.method){
        console.log('Type of the request body');
        console.log(request.body);

        //var newBody = request.body;
        //var newBody = 'card_type=MC';

        var formString = '';
        //generate the form string before encoded
        for(var property in request.body){
            formString += property + "="+encodeURIComponent(request.body[property])+'&';
        }    
        proxy_request.write(formString);   
    }
    else{
        proxy_request.write(jsonBody);    
    }
    

    //-------------------------------------------------------

    console.log('The body of proxy_request before sent:');
    console.log(proxy_request);

    proxy_request.end();
    //old version of adding listener
    /*proxy_request.addListener('response', function (proxy_response) {
        proxy_response.addListener('data', function(chunk) {
            response.write(chunk, 'binary');
        });
        proxy_response.addListener('end', function() {
            response.end();
        });
        response.writeHead(proxy_response.statusCode, proxy_response.headers);
    });
  
    request.addListener('data', function(chunk) {
        proxy_request.write(chunk, 'binary');
    });
    
    request.addListener('end', function() {
        proxy_request.end();
    });*/

});

// Register our OAuth server
/*oauth.cc(server, {
    tokenEndpoint: "/user/login",
    hooks: hooks
});*/

//test for hooking the request to /user/login

/*server.on('request', function(request, response) {
    console.log('Intercepting the request ' + request.url);
    if('/user/login' != request.url){
        return;
    }
    request.pause();
    //var options = url.parse(request.url);
    //options.headers = request.headers;
    //options.method = request.method;
    //options.agent = false;

    var options = {
                        //host: '54.72.103.19',
                        //port: 8080,
                        //path: '/api/user/login',

                        hostname: 'novaballtest.apiary-mock.com',
                        path: '/user/login',

                        method: 'POST'
                    };

    var connector = http.request(options, function(serverResponse) {
            serverResponse.pause();
            response.writeHead(serverResponse.statusCode, serverResponse.headers);
            serverResponse.pipe(response);
            serverResponse.resume();
    });
    request.pipe(connector);
    request.resume();
});*/

// Register the endpoints
_.each(_api.endpoints.get, function (e) {
    server.get(e.endpoint, e.callback);
});

_.each(_api.endpoints.post, function (e) {
    server.post(e.endpoint, e.callback);
});

_.each(_api.endpoints.patch, function (e) {
    server.patch(e.endpoint, e.callback);
});

_.each(_api.endpoints.delete, function (e) {
    server.del(e.endpoint, e.callback);
});

//
// This API
server.get("/api", function (req, res) {
    res.contentType = "application/json";
    res.send(_api.endpoints);
});

// Documentation (done using Markdown)
var virtualPath = "/docs/:filename";

server.get(virtualPath, function (req, res, next) {

    var marked = require('marked')
        , Mustache = require('mustache')
        , physicalPath = './documentation/specification/' + req.params.filename + ".md"
        , toc = require('marked-toc');


    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    });


    fs.readFile(physicalPath, 'utf8', function (err, data) {
        if (err) {
            return next(new restify.ResourceNotFoundError("This file is not found."));
        }

        var view = {
            now: new Date,
            content: marked(data),
            toc: marked(toc(data)),
            title: 'Documentation'
        };

        fs.readFile('./documentation/markdown.mst', 'utf8', function (_e, _d) {
            if (_e) {
                return next(new restify.ResourceNotFoundError("Template file was not found."));
            }
            var body = Mustache.render(_d, view);
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(body),
                'Content-Type': 'text/html'
            });
            res.write(body);
            res.end();
        })


    });
});


// Serve the rest as static files
var file = new nstatic.Server('./ui/new/');
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