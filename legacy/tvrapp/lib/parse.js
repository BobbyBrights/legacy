exports = module.exports = {};
var cfg = require('./config').cfg,
    _ = require('underscore'),
    Parse = require('node-parse-api').Parse,
    app = new Parse(cfg.app_id, cfg.master),
    Q = require('q');


exports.addEpisode = function(ep){

};

exports.getShow = function (req, res, next) {
    app.find('Show', {guid: req.params.guid}, function (err, response) {
        if (err) res.send(400, err);
        res.send(200, response.results[0]);
    });
};

exports.getShows = function (req, res, next) {
    app.find('Show', '', function (err, response) {
        if (err) res.send(400, err);
        res.send(200, response.results);
    });
};

exports.addDevice = function (data) {
    var deferred = Q.defer();
    app.insertInstallationDataWithChannels(data.platform, data.deviceId, data.channels, function (err, response) {
        if (err) {
            console.log(err);
            deferred.reject(err);
        } else {
            console.log(response);
            deferred.resolve(response);
        }
    });
    return deferred.promise;
};

exports.addShow = function (show) {
    console.log(show);
    var deferred = Q.defer();
    this.getShow({guid: show.guid}).then(
        function (_s) {
            // Call was successful, check if the array is empty.
            if (_s.results.length == 0) {
                app.insert('Show', show, function (err, response) {
                    if (err) deferred.reject(err);
                    deferred.resolve(response);
                });
            } else {
                // Already exists
                deferred.reject({error: "Already exists", status: 409});
            }
        },
        function (_e) {
            deferred.reject(_e);
        }
    );
    return deferred.promise;
};




