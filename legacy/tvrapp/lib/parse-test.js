var show = require('./stub/show.json'),
    shows = require('./stub/shows.json');

exports = module.exports = {};

exports.addEpisode = function (ep) {

};

exports.getShow = function (req, res, next) {
    res.contentType = "application/json";
    res.send(200, show);
};

exports.getShows = function (req, res, next) {
    res.contentType = "application/json";
    res.send(200, shows);
};

exports.addDevice = function (data) {
    res.send(200, {});
};

exports.addShow = function (show) {
    res.send(200, {});
};




