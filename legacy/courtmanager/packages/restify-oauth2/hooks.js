"use strict";

var _ = require("underscore");
var crypto = require("crypto");
var tokensToClientIds = {};
var schema = require('../database/schemas');
var mongoose = require('mongoose');


function generateToken(data) {
    var random = Math.floor(Math.random() * 100001);
    var timestamp = (new Date()).getTime();
    var sha256 = crypto.createHmac("sha256", random + "WOO" + timestamp);
    return sha256.update(data).digest("base64");
}

exports.grantClientToken = function (clientId, clientSecret, cb) {
    var User = mongoose.model('User', schema.userSchema);
    User.findOne({"email": clientId, "password": clientSecret},
        function (err, data) {
            if (err || data == null) {
                console.log(err);
                cb(null, false);
            }
            else {
                console.log(data);
                var token = generateToken(clientId + ":" + clientSecret);
                tokensToClientIds[token] = clientId;
                // Call back with the token so Restify-OAuth2 can pass it on to the client.
                return cb(null, token);
            }
        });
};

exports.authenticateToken = function (token, cb) {
    if (_.has(tokensToClientIds, token)) {
        var username = tokensToClientIds[token];
        return cb(null, username);
    }
    // If the token does not authenticate, call back with `false` to signal that.
    // Calling back with an error would be reserved for internal server error situations.
    cb(null, false);
};