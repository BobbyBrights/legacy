var pci = require('../models/pci');
var http = require('http');
var _ = require("underscore");

//function for parsing the cookie
function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = unescape(parts.join('='));
    });

    return list;
}

var _endpoints = {
        patch: [
            {
                endpoint: '/user/card/.*',
                callback: function(req, res, next){
                    console.log('Inside the patch endpoints body');
                }
            },
            {
                endpoint: '/user.*',
                callback: function(req, res, next){
                    console.log('Inside the patch endpoints body');
                }
            }
            ,
            {
                endpoint: '/notification.*',
                callback: function(req, res, next){
                    console.log('Inside the patch endpoints body');
                }
            }
        ],
        delete: [
            {
                endpoint: '/user.*',
                callback: function(req, res, next){
                    console.log('Inside the patch endpoints body');
                }
            }
        ],
        post: [
            {
                endpoint: '/crypt',
                callback: pci.cryptService
            },
            {
                endpoint: '/lines/.*',
                callback: function(req, res, next){
                    console.log('Inside the _endpoints body');
                }
            },
            {
                endpoint: '/user',
                callback: function(req, res, next){
                    console.log('Inside the _endpoints body');
                }
            },
            {
                endpoint: '/user/.*',
                callback: function(req, res, next){
                    console.log('Inside the _endpoints body');
                }
            },
            {
                endpoint: '/api/user/.*',
                callback: function(req, res, next){
                    console.log('Inside the _endpoints body');
                }
            },
            {
                endpoint: '/user/card',
                callback: function(req, res, next){

                }
            },

            {
                endpoint: '/user/subscriptions',
                callback: function(req, res, next){

                }
            },
            {
                endpoint: '/user/card/:cardid',
                callback: function(req, res, next){
                    console.log('Inside the patch endpoints body');
                }
            }
            ,
            {
                endpoint: '/add_card/:amid',
                callback: function(req, res,next){

                }
            },
            {
                endpoint: '/lead.*',
                callback: function(req, res, next){

                }
            },
            {
                endpoint: '/.*/pin',
                callback: function(req, res, next){

                }
            },
            {
                endpoint: '/user/login',
                callback: function (req, res, next){
                    console.log('The request url is:'+req.url);
                    console.log('Headers:');
                    console.log(req.headers);
                    /*console.log('POST =>Handling the request sent to /user/login');
                    //console.log(req);
                    

                    var options = {
                        hostname: '54.72.103.19',
                        port: 8080,
                        path: '/api/user/login',

                        //hostname: 'novaballtest.apiary-mock.com',
                        //path: '/user/login',

                        method: 'POST'
                    };

                    var callback = function (response){
                        console.log('Catch the response for the /user/login:'+response);

                        var str = '';

                        //another chunk of data has been recieved, so append it to `str`
                        response.on('data', function (chunk) {
                            console.log('BODY: ' + chunk);
                            str += chunk;
                            
                        });

                        //response.pipe(res,{end:true});

                        //the whole response has been recieved, so we just print it out here
                        response.on('end', function () {
                            
                            console.log('The received response from real server is:');
                            console.log(str);
                            //res.contentType = "application/json";
                            //'res.send(200,str);
                            res.write(str);
                            res.end();
                        });


                        // To Read a Cookie
                        var cookies = parseCookies(req);
                        console.log(cookies);
                        console.log(response.cookie);
                        console.log(response.cookies);
                        console.log(response.header);


                        console.log(response);

                        console.log(response.headers);
                        //console.log(res.headers.getHeaders());
                       
                        // To Write a Cookie
                        //res.writeHead(200, {
                            //'Set-Cookie': 'mycookie=test',
                            //'Content-Type': 'text/plain'
                        //});

                    }

                    request.addListener('data', function(chunk) {
                        proxy_request.write(chunk, 'binary');
                      });
                      request.addListener('end', function() {
                        proxy_request.end();
                      });*/

                    //http.request(options, callback).end();
                    //http.request(options, callback).end();



                    //req.pipe(connector,{end:true});

                    //res.redirect('http://54.72.103.19:8080/api/user/login');

                    var options = {
                        //hostname: '54.72.103.19',
                        hostname: '172.16.131.26',
                        port: 8080,
                        path: '/api/'+req.url,
                        headers: req.headers,
                        method: req.method
                    };

                    var proxy_request = http.request(options, function(proxy_response){
                        console.log('2');
                        //proxy_request.on('response', function (proxy_response) {
                        console.log('3');
                        proxy_response.on('data', function(chunk) {
                            res.write(chunk, 'binary');
                        });
                        proxy_response.on('end', function() {
                            res.end();
                        });

                        console.log("proxy_response.statusCode:"+proxy_response.statusCode);
                        res.writeHead(proxy_response.statusCode, proxy_response.headers);
                        //});
                    });

                    req.on('data', function(chunk) {
                        proxy_request.write(chunk, 'binary');
                    });
                    
                    req.on('end', function() {
                        proxy_request.end();
                    });
                }
            }
        ],
        get: [
            {
                endpoint: '/pin',
                callback: function(req, res, next){
                    res.send(200);
                }
            },
            {
                endpoint: '/add_card',
                callback: function(req, res,next){
                    
                }
            },
            {
                endpoint: '/notification.*',
                callback: function(req, res,next){
                    
                }
            },
            {
                endpoint: '/bet',
                callback: function (req, res, next) {

                    var options = {
                        hostname: 'novaballcustomerapi.apiary-mock.com',
                        path: '/bet'
                    };

                    var callback = function (response) {
                        var str = '';

                        //another chunk of data has been recieved, so append it to `str`
                        response.on('data', function (chunk) {
                            str += chunk;
                        });

                        //the whole response has been recieved, so we just print it out here
                        response.on('end', function () {
                            var results = [];

                            if(!_.isUndefined(req.query.drawId)){
                                console.log("Draw id", req.query.drawId);
                                var data = JSON.parse(str);
                                for(var i in data){
                                    var _t = data[i];
                                    console.log(_t);

                                    if(_t.draw_id == req.query.drawId){
                                        results.push(_t);
                                    }
                                }
                            }
                            res.contentType = "application/json";
                            res.send(200, results);
                        });
                    }

                    console.log("Ready to run the http request method");
                    http.request(options, callback).end();

                }
            },
            {
                endpoint: '/user',
                callback: function (req, res, next){
                    /*console.log('GET =>Handling the request sent to /user');
                    console.log('The request url is:'+req.url);
                    var options = {
                        hostname: '54.72.103.19',
                        port: 8080,
                        //hostname: 'novaballcustomerapi.apiary-mock.com',
                        path: '/api/user',
                        method: 'GET'
                    };

                    var callback = function (response){
                        console.log('Catch the response for the /user:');
                        //console.log('==========/USER RESPONSE============');
                        //console.log(response);
                        //console.log("------------------------------------");

                        var str = '';

                        //another chunk of data has been recieved, so append it to `str`
                        response.on('data', function (chunk) {
                            console.log('BODY: ' + chunk);
                            str += chunk;
                            
                        });

                        //response.pipe(res,{end:true});

                        //the whole response has been recieved, so we just print it out here
                        response.on('end', function () {
                            
                            console.log('The received response from real server is:');
                            console.log(str);
                            //res.contentType = "application/json";
                            
                            res.write(str);
                            res.send(200);
                            res.end();
                        });

                    }*/

                    var options = {
                        //hostname: '54.72.103.19',
                        hostname: '172.16.131.26',
                        port: 8080,
                        path: '/api/'+request.url,
                        headers: request.headers,
                        method: request.method
                    };

                    var proxy_request = http.request(options, function(proxy_response){
                        console.log('2');
                        //proxy_request.on('response', function (proxy_response) {
                        console.log('3');
                        proxy_response.on('data', function(chunk) {
                            response.write(chunk, 'binary');
                        });
                        proxy_response.on('end', function() {
                            response.end();
                        });
                        response.writeHead(proxy_response.statusCode, proxy_response.headers);
                        //});
                    });

                    request.on('data', function(chunk) {
                        proxy_request.write(chunk, 'binary');
                    });
                    
                    request.on('end', function() {
                        proxy_request.end();
                    });

                    //var connector = http.request(options, callback).end();

                    //req.pipe(connector,{end:true});
                }
            }
        ]
    }
    ;

exports.endpoints = _endpoints;

