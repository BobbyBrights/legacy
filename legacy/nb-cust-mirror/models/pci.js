var utility = require('../lib/common/utility');
var CryptoJS = require("crypto-js");
var timeout = 1000;

// Save this more securely.
var _secret = 'yzJXD[1j~$vvd-+%UDN*_d4/TJaV,hf|T=49*Gb`5(G!A.I`ZqI^Y-y@tk+i2TnZ';

exports.getService = function (req, res) {
    var data = { result: true}
    setTimeout((function () {
        res.send(data)
    }), timeout);
};

exports.cryptService = function (req, res, next) {
    res.contentType = "application/json";
    if(req.params.type){
        if(req.params.type == 'encryption'){
            var str = JSON.stringify(req.body);
            var encrypted = '' + CryptoJS.AES.encrypt(str, _secret);
            res.send(200, {_r: encrypted});
        }
        if(req.params.type == 'decryption'){
            if(req.body._o){
                var decrypted = CryptoJS.AES.decrypt(req.body._o, _secret);
                res.send(200, JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)));
            } else {
                res.send(400, {message: "Cannot decrypt this object, should be JSON object with single property \"_o\". "});
            }
        }
    }
    res.send(400, {message: "Parameter 'type' is mandatory (encryption|decryption)"});
}


