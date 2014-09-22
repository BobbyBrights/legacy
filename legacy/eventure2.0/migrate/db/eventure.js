var mongo = require('mongodb')
    , cfg = require('./config').live // alternate between live/test
    , stub = require('./stub')
    , save = require('save') // npm install save
    , saveMongodb = require('save-mongodb')
    , io = require('socket.io').listen(8001);

io.set('log level', 0);
io.set('log colors', true);


var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var db = new Db(cfg.dbname, new Server(cfg.host, cfg.port, cfg.options));

db.open(function (err, db) {
    if (err) console.log(err);
});

exports.addUser = function (req, res) {
    if (!req.clientId) {
        return res.sendUnauthorized();
    }

    db.collection('users', function (error, collection) {
        var userStore = save('user', { engine: saveMongodb(collection) });
        userStore.create({ clientId: req.params.clientId, clientSecret: req.params.clientSecret},
            function (error, user) {
                res.contentType = "application/hal+json";

                res.send({
                    "response": 201,
                    "message": "User created"
                });
            });
    });
}


exports.getEvent = function (req, res) {
    console.log("Getting event", req.params.id);
    // TODO can THIS user access THIS event?
    var id = req.params.id;

    if (!req.clientId) {
        //return res.sendUnauthorized();
    }


    db.collection('events', function (err, collection) {
        if (err) console.log(err);
        collection.findOne({'_id': new BSON.ObjectID(id)}, function (err, item) {
            res.send(item);
        });
    });
};

exports.getAllEvents = function (req, res) {
    // TODO restrict access to only own events
    if (!req.clientId) {
        return res.sendUnauthorized();
    }

    db.collection('events', function (err, collection) {
        collection.find().toArray(function (err, items) {
            io.emit('events', items);
            res.send(items);
        });
    });
};

exports.addEvent = function (req, res) {
    // TODO can this user add events?
    if (!req.clientId) {
        //return res.sendUnauthorized();
    }

    var event = req.body;
    event.created = event.modified = new Date();
    console.log('Adding event: ' + JSON.stringify(event));

    db.collection('events', function (err, collection) {
        collection.insert(event, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateEvent = function (req, res) {
    var id = req.params.id;
    console.log(id);

    var event = req.body;
    // Nasty hack..
    delete event._id;

    event.modified = new Date();
    if (!event.created) {
        event.created = event.modified;
    }

    db.collection('events', function (err, collection) {
        collection.update({'_id': new BSON.ObjectID(id)}, event, {safe: true}, function (err, result) {
            if (err) {
                console.log('Error updating event: ' + err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(event);
            }
        });
    });
}

exports.deleteEvent = function (req, res) {
    var id = req.params.id;
    db.collection('events', function (err, collection) {
        collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

exports.getAllPromoters = function (req, res) {
    db.collection('promoters', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
};

exports.authenticateUser = function (a, b, cb) {
    cb(null, {
        clientId: "stephen",
        clientSecret: "stephen",
        _id: "52fd372d7122e884358d08eb"
    });

    /*
     db.open(function (error, connection) {
     connection.collection('users').findOne({clientId: a, clientSecret: b}, function (err, user) {
     if (err) {
     connection.close();
     cb(err);
     }
     if (user) {
     console.log(user);
     connection.close();
     cb(null, user);
     }
     connection.close();
     cb({"error": "no_such_user"});
     });
     });
     */
};

exports.broadcast = function (req, res) {
    res.contentType = "application/json";
    res.send({
        "message": "This API requires authentication"
    });
};