var utility = require('../lib/common/utility');
var user = require('./stub/user-1.json');
var customers = require('./stub/customers.json');
var _ = require("underscore");
var restify = require("restify");

exports.sendPIN = function (req, res) {
    res.send(200);
};

exports.getUser = function (req, res) {
    //@Protected resource
    if (!req.clientId) {
        return res.sendUnauthorized();
    }

    res.contentType = "application/json";
    res.send(user);
};

exports.getUsers = function (req, res) {
    //@Protected resource
    var _users = [];
    var fields = ['guid', 'name', 'active', 'email'];
    _.each(customers, function (k, i) {
        _users.push(_.pick(k, fields));
    });

    res.contentType = "application/json";
    res.send(_users);
};

exports.markComplete = function(req, res){
    res.contentType = "application/json";
    res.send(200);
}

exports.addUser = function (req, res, next) {
    res.contentType = "application/json";
    if (req.body) {
        _.each(['name', 'username', 'email', 'phone', 'address'], function (a) {
            if (_.isUndefined(req.body[a])) {
                res.send(new restify.InvalidContentError("Invalid user details entered"));
            }
        });

        var _user = req.body;
        _user.guid = utility.guid();
        _user.active = false;
        _user.registered = new Date();
        customers.unshift(_user);
        res.send(200, _user);
    }
    res.send(400);
}

exports.getMe = function (req, res) {
    //@Protected resource
    if (!req.clientId) {
        return res.sendUnauthorized();
    }
    console.log(req.clientId);

    res.contentType = "application/json";
    res.send({
        customerName: req.clientId,
        customerType: req.clientId
    });
};
