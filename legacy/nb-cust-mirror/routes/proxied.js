var restify = require("restify");

exports.getUser = function (req, res, next) {


    if (!req.clientId) {
    //    res.send(401);
    }

    res.send(200, {
        "id": 256604,
        "profile": {
            "email": "user@host.com",
            "affiliateID": 12930123,
            "firstName": "Ted",
            "lastName": "Phillips",
            "phone": "+449812093131",
            "address": "Some Address, Some Street, Some Town, Some County, United Kingdom, SE1 OAP",
            "active": false,
            "verifiedPIN": false
        },
        "account": {
            "walletAmt": "35.00",
            "walletCurrency": "GBP",
            "nextPaymentDate": "2013-05-11T15:50:13 -01:00"
        }
    });

}