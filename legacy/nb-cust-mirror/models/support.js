var utility = require('../lib/common/utility');
var _ = require('underscore');
var customers = require('./stub/customers.json');
var affiliates = require('./stub/affiliates.json');
var lotteries = require('./stub/lottery.json');

exports.getAffiliates = function (req, res) {
    //@Protected resource
    if (!req.clientId) {
        return res.sendUnauthorized();
    }

    var data = affiliates;
    if (req.params.id) {
        data = get(req.params.id, data, "guid");
    }
    res.contentType = "application/json";
    res.send(data);
};

exports.getCustomers = function (req, res) {
    if (!req.clientId) {
        return res.sendUnauthorized();
    }

    var _customers = [];
    _.each(customers, function (k) {
        var _v = ['guid', 'name', 'registered', 'active'],// Remove unnecessary properties.
            _t = {};
        _.each(_v, function (i) {
            _t[i] = k[i];
        })
        _customers.push(_t);
    });
    res.contentType = "application/json";
    res.send(_customers);
};

exports.getCustomer = function (req, res) {
    if (!req.clientId) {
        return res.sendUnauthorized();
    }

    var _customer = {};
    if (req.params.id) {
        _customer = get(req.params.id, customers, "guid");
    }
    res.contentType = "application/json";
    res.send(_customer);
};

exports.getLotteries = function (req, res) {
    if (!req.clientId) {
        return res.sendUnauthorized();
    }

    var _lotteries = lotteries;
    var qs = require('url').parse(req.url, true).query;

    console.log(qs);
    if (req.params.id) {
        var _f = new Date();
        _f.setDate(_f.getDate() - 7);
        var _t = qs.dateTo || new Date();

        _lotteries = get(req.params.id, _lotteries, "id");
        _lotteries.history = {
            results: require('./stub/history.json'),
            dateFrom: _f,
            dateTo: _t
        };
    }


    res.contentType = "application/json";
    res.send(_lotteries);
};

function get(id, data, idx) {
    for (var i = 0; i < data.length; i++) {
        if (data[i][idx] == id) {
            return data[i];
        }
    }
    return {};
}