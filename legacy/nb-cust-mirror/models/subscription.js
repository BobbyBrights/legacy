var utility = require('../lib/common/utility');
exports.getSubscription = function (req, res) {
    //@Protected resource
    if (!req.clientId) {
        return res.sendUnauthorized();
    }
    var data = require('./stub/subscription.json');
    res.contentType = "application/json";
    res.send(data);
};

exports.setSubscription = function (req, res) {
    //@Protected resource
    if (!req.clientId) {
        return res.sendUnauthorized();
    }

    if (req.body) {
        res.contentType = "application/json";

        if (Math.floor(Math.random() * 3) + 1 == 1) {
            res.send(400, {message: "Your credit card information is invalid"});
        }

        if (Math.floor(Math.random() * 3) + 1 == 3) {
            res.send(302, {message: "3ds", url: "http://example.com?randomseed=19023801923801928309128309128309123&returnUrl=http://novaball:4444/payment-accepted"});
        }
        res.send(200);
    }
    res.send(400);

};