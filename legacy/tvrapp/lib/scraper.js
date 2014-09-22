exports = module.exports = {};

var _ = require('underscore'),
    cheerio = require('cheerio'),
    f = require('./functions'),
    moment = require('moment'),
    _parse = require('./parse');

exports.parse = function (body, url, id) {

    var _x = /<pre>((?:.|\n|\r)*?)<\/pre>/.exec(body);
    var $ = cheerio.load(body);

    var show = {}, _seasons = [];

    show.title = $('h1').text();
    show.epguidesURL = url;
    show.lastUpdate = $('h3 em').text();
    show.mainImage = url + $('td.headright img').attr('src');
    show.episodes = [];
    show.guid = f.hexify(id);

    if (!_.isNull(_x) && _x[0]) {
        var lines = _x[0].match(/^.*([\n\r]+|$)/gm);
        for (var i = 0; i < lines.length; i++) {
            var _l = lines[i];
            if (_l.match(/^\d/)) {
                var ep = {};
                var _f = _l.split(/\s+/);
                ep.originalNumber = _f[0];
                if(moment(new Date(_f[2])).isValid()){
                    ep.originalAirDate = _f[2];
                } else if (moment(new Date(_f[3])).isValid()){
                    ep.originalAirDate = _f[3];
                } // Otherwise, we give up!

                ep.originalEpisodeNumber = _f[1];

                // Extract the episode season and number;
                var _details = /(\d)+\-(\d)+/.exec(ep.originalEpisodeNumber);
                if (_.isArray(_details)) {
                    ep.season = parseInt(_details[1]);
                    ep.episode = parseInt(_details[2]);
                    _seasons.push(ep.season);
                }

                var _lp = /<a\s[^>]*href=('|\")([^('|\")]*)('|\")[^>]*>(.*)<\/a>(?:.*)+/;
                var _lm = _lp.exec(_l);
                if (_.isArray(_lm)) {
                    ep.title = _lm[4];
                    if (ep.title.indexOf("</a>") > -1) {
                        ep.title = ep.title.substr(0, ep.title.indexOf("</a>"));
                    }
                    ep.moreLink = _lm[2];
                    ep.guid = f.hashify(ep.moreLink);
                }


                show.episodes.push(ep);

            }
        }
    }

    show.seasons = [];
    var _u = _.uniq(_seasons);

    for (var i in _u) {
        show.seasons.push({
            season: parseInt(_u[i]), episodes: []
        })

        // And add episodes
        for (var j in show.episodes) {
            if (show.episodes[j].season == _u[i]) {
                show.seasons[i].episodes.push(show.episodes[j]);
            }
        }
    }
    delete show.episodes;
    return show;
}