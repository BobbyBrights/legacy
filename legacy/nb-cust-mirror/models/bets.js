var utility = require('../lib/common/utility');
exports.getBets = function (req, res) {
    //@Protected resource
    if (!req.clientId) {
        return res.sendUnauthorized();
    }

    var data = new Array();

    for (var i = 0; i < 1; i++) {
        data.push(
            {id: "8721" + i, date: "27/02/2014", lottery: "Irish Lottery", lines: [
                utility.generate_line(7, 46),
                utility.generate_line(7, 46),
                utility.generate_line(7, 46),
                utility.generate_line(7, 46),
                utility.generate_line(7, 46)
            ], winner: false});
    }

    if(req.params.id){
        data = find_bet(req.params.id, data);
    }

    res.contentType = "application/json";
    res.send(data);
};

function find_bet(id, data){
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            return data[i];
        }
    }
    return {};
}