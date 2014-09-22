var utility = require('../lib/common/utility');
var fs = require('fs');
// Some JSON constructors
var user = '', bet = '', payment = '', customer = '', history = '';
exports.init = function () {
    console.log("Initializing templating mechanism");
    fs.readFile('./models/templates/bet.template', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        bet = data;
    });
    fs.readFile('./models/templates/payment.template', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        payment = data;
    });
    fs.readFile('./models/templates/user.template', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        user = data;
    });
    fs.readFile('./models/templates/customer.template', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        customer = data;
    });

    fs.readFile('./models/templates/history.template', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        history = data;
    });
}


this.init();

exports.getBet = function (req, res) {
    var _bet = bet;
    res.contentType = "text/plain";
    res.send(_bet);
}

exports.getUser = function (req, res) {
    var _user = user;
    if (_user.indexOf("@@bet") > -1) {
        _user = _user.replace(/@@bet/g, bet);
    }
    if (_user.indexOf("@@payment") > -1) {
        _user = _user.replace(/@@payment/g, payment);
    }
    res.contentType = "text/plain";
    res.send(_user);
}

exports.getHistory = function (req, res) {
    var _history = history;
    var response = "[ '{{repeat(8,15)}}', "+_history+"]";
    res.contentType = "text/plain";
    res.send(response);
}

exports.getCustomers = function (req, res) {
    var _customer = customer;
    if (_customer.indexOf("@@bet") > -1) {
        _customer = _customer.replace(/@@bet/g, bet);
    }
    if (_customer.indexOf("@@payment") > -1) {
        _customer = _customer.replace(/@@payment/g, payment);
    }

    var response = "[ '{{repeat(8,10)}}', "+_customer+"]";
    res.contentType = "text/plain";
    res.send(response);
}

exports.getCustomer = function (req, res) {
    var _customer = customer;
    if (_customer.indexOf("@@bet") > -1) {
        _customer = _customer.replace(/@@bet/g, bet);
    }
    if (_customer.indexOf("@@payment") > -1) {
        _customer = _customer.replace(/@@payment/g, payment);
    }

    res.contentType = "text/plain";
    res.send(_customer);
}