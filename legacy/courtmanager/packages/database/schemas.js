var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourtCategory = new Schema({
    name: String
});

var User = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    updated: Date
});

User.pre('save', function (next) {
    this.updated = new Date;
    next();
});

var Court = new Schema({
    name: {type: String, required: '{PATH} is a required field!'},
    description: String,
    _category: { type: Schema.Types.ObjectId, ref: 'CourtCategory' }
});

var Venue = new Schema({
    name: String,
    address: String,
    _manager: { type: Schema.Types.ObjectId, ref: 'User' },
    courts: [Court]
});


exports.courtSchema = Court;
exports.courtCategorySchema = CourtCategory;
exports.venueSchema = Venue;
exports.userSchema = User;
