var utility = require('../lib/common/utility');
exports.getHistory = function (req, res) {
    //@Protected resource
    if (!req.clientId) {
        return res.sendUnauthorized();
    }


    var data = require('./stub/history.json');
    if (req.params.id) {
        data = find_history_item(req.params.id, data);
    }

    res.contentType = "application/json";
    res.send(data);
};

function find_history_item(id, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            return data[i];
        }
    }
    return {};
}