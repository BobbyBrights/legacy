var schema = require('./schemas');
var mongoose = require('mongoose');
var cfg = require('../../config/db');
// Configurable parameter to simulate latency for AJAX requests.
var _timeout = 1500;

mongoose.connect(cfg.live.connection_url);

var Court = mongoose.model('Court', schema.courtSchema);
var CourtCategory = mongoose.model('CourtCategory', schema.courtCategorySchema);
var Venue = mongoose.model('Venue', schema.venueSchema);
var User = mongoose.model('User', schema.userSchema);

exports.getVenues = function (req, res, next) {
    Venue
        .find()
        .populate('_manager', 'name email')
        .exec(function (err, records) {
            if (err) res.send(400, err);
            res.send(200, records);
        });
}

exports.addUser = function (req, res, next) {
    var _u = new User(req.body);
    _u.save(function (err) {
        if (err) res.send(400, err);
        res.send(200);
    });
}

exports.addCourtCategory = function (req, res, next) {
    var cc = new CourtCategory(req.body);
    cc.save(function (err) {
        if (err) // ...
            console.log('meow');
        res.send(200);
    });
}


exports.addCourt = function (req, res, next) {
    var court = new Court(req.body);
    court.save(function (err) {
        if (err) res.send(400, err);
        res.send(200);
    });
}

exports.getCourts = function (req, res, next) {
    if (req.params.id) {
        Court
            .findOne({ '_id': req.params.id })
            .populate('_category')
            .exec(function (err, records) {
                res.contentType = "application/json";
                if (err) res.send(400, err);
                setTimeout(function () {
                    res.send(200, records);
                }, _timeout);
            });

    } else {
        Court
            .find()
            .populate('_category')
            .exec(function (err, records) {
                res.contentType = "application/json";
                if (err) res.send(400, err);
                setTimeout(function () {
                    res.send(200, records);
                }, _timeout);
            });
    }
}

exports.getCourtCategory = function (req, res, next) {
    res.contentType = "application/json";
    if (req.params.id) {
        CourtCategory.findOne({ '_id': req.params.id }, function (err, court) {
            if (err) res.send(400, err);
            res.send(200, court);

        });
    } else {
        CourtCategory.find(function (err, records) {
            if (err) res.send(400, err);
            res.send(200, records);
        });
    }
}

exports.addVenue = function (req, res, next) {
    var v = new Venue(req.body);
    v.save(function (err) {
        if (err) // ...
            console.log('meow');
        res.send(200);
    });
}

