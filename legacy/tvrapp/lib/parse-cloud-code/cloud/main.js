// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

Parse.Cloud.define("getShowCount", function (request, response) {
    var Show = Parse.Object.extend("Show");
    var query = new Parse.Query(Show);
    query.find().then(function (shows) {
        response.success(shows);
    });
});

Parse.Cloud.define("addShow", function (request, response) {

    var show = JSON.parse(request.body);
    var seasons = show.seasons;
    delete show.seasons;

    var Show = Parse.Object.extend("Show");
    var _show = new Show();

    var saveEpisodes = function (_parent, _seasons, res) {
        var _episodes = [];
        var Episode = Parse.Object.extend("Episode");
        var show = new Show();
        show.id = _parent;

        // Populate an array.
        for (var i = 0; i < _seasons.length; i++) {
            var season = _seasons[i];
            for (var j = 0; j < season.episodes.length; j++) {
                var episode = season.episodes[j];
                episode.originalAirDate = new Date(episode.originalAirDate);

                var _ep = new Episode(episode);
                _ep.set("parent", show);
                _episodes.push(_ep);
            }
        }

        Parse.Object.saveAll(_episodes, {
            success: function (list) {
                // All the objects were saved.
                res.episodesSaved = true;
                response.success(res);
            },
            error: function (error) {
                res.episodesSaved = false;
                res.error = error;
                response.success(res);
                // An error occurred while saving one of the objects.
            }
        });

    };

    _show.save({
        name: show.title,
        guid: show.guid,
        image: show.mainImage
    }).then(function (res) {
        // Added show successfully
        var _objectId = res.objectId;
        saveEpisodes(_objectId, seasons, res);

    }, function (err) {
        console.log("FFFFFF" + JSON.stringify(err));

        if (err.message) {
            var _e = JSON.parse(err.message);
            if (_e.status == 409) {
                // The show already exists, so lets just add the episodes.
                saveEpisodes(_e.object.objectId, seasons, {updated: true});
            }
        } else {
            response.error(err);
        }
    });
});

Parse.Cloud.beforeSave("Show", function (request, response) {
    var query = new Parse.Query("Show");
    query.equalTo("guid", request.object.get("guid"));
    query.find({
        success: function (results) {
            if (results.length > 0) {
                response.error(JSON.stringify({status: 409, object: results[0]}));
            } else {
                response.success();
            }
        },
        error: function () {
            response.error();
        }
    });
});


//Parse.Cloud.job("updateEpisodes", function (request, status) {
//
//
//    Parse.Cloud.useMasterKey();
//
//    var query = new Parse.Query(Parse.User);
//    query.find().then(function (users) {
//        var promises = [];
//        _.each(users, function (user) {
//            promises.push((function (user) {
//                var promise = new Parse.Promise();
//                console.log(user.toJSON().objectId);  // user objectId is correct here
//                var submissionQuery = new Parse.Query('submission');
//                submissionQuery.equalTo('user', user.toJSON().objectId);
//                submissionQuery.find({  // this doesnt seem to ever run, i have tried .each as well
//                    success: function (submissions) {
//                        var votes = 0;
//                        for (var i = 0; i < submissions.length; i++) {
//                            var submission = submissions[i];
//                            votes = votes + submission.get('votes').length;
//                        }
//                        user.set('submission_count', submissions.length);
//                        user.set('vote_count', votes);
//                        user.save({
//                            success: function (user) {
//                                promise.resolve();
//                            }
//                        });
//                    },
//                    error: function (error) {
//                        status.error(error);
//                    }
//                });
//                return promise;
//            })(user));
//        });
//        return Parse.Promise.when(promises);
//    })
//        .then(function () {
//            status.success('leaderboard updated.');
//        });
//});

