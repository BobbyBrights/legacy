var _ = require("underscore"),
    data = require('../data/items.json')
    moment = require('moment');

function image_sorter(a, b) {
    // See if both heights are available
    if (a.height > -1 && b.height > -1) {
        return a.height - b.height;
    }
    // If not, see if widths are available
    if (a.width > -1 && b.width > -1) {
        return a.width - b.width;
    }
    // otherwise, return 0 (no sorting).
    return 0;
}

exports.getItems = function (req, res, next) {
    res.contentType = "application/json";

    var _items = {};
    var _records = [];


    // Load up our folders
    for (var i in data.folder.folder) {
        _records.push(data.folder.folder[i]);
    }

    // Load up our files.
    for (var i in data.folder.file) {
        _records.push(data.folder.file[i]);
    }

    // Need to store this for pagination purposes
    _items.totalSize = _records.length;


    // Image sorting function
    for (var i in _records) {
        var record = _records[i];
        record.images = [];
        // Assign a type to each.. use extension
        if(_.isUndefined(record.extension)){
            record.type = 'Folder';
        } else {
            switch(true){
                case /jpg/.test(record.extension.$):
                    record.type = 'Image';
                    break;
                case /mp3/.test(record.extension.$):
                    record.type = 'MP3';
                    break;
                case /mp4/.test(record.extension.$):
                    record.type = 'Movie';
                    break;
                default:
                    record.type = '';
                    break;
            }
        }


        for (var j in record.link) {
            var link = record.link[j];
            // Images
            if (!_.isUndefined(link['@a:mimeType']) && /image\//.test(link['@a:mimeType'])) {

                // If both image height and width are set, then we should
                // set this as the aspect ratio.
                if (!_.isUndefined(link['@a:height']) && link['@a:height'] > -1 && !_.isUndefined(link['@a:width']) && link['@a:width'] > -1) {
                    //record.aspect_ratio
                }

                var img = {};
                img.file = link.$ || 'Not set';
                img.size = parseInt(link['@a:size']) || 'Not specified';
                img.mimeType = link['@a:mimeType'] || 'Not specified';
                // Worst case scenario, if either width or height are unavailable, assume the
                // Image is square, and set height/width accordingly.
                // Ideally we would run the image through a parser to determine the
                // aspect ratio (GD for example) , and set the width/height accordingly.
                img.height = parseInt(link['@a:height']) > -1 ? parseInt(link['@a:height']) : (parseInt(link['@a:width']) || -1);
                img.width = parseInt(link['@a:width']) > -1 ? parseInt(link['@a:width']) : (parseInt(link['@a:height']) || -1);

                record.images.push(img);
            }
        }

        // Images is populated, now to sort
        record.images.sort(image_sorter);
    }

    // Handle offsets and limits.
    var limit = parseInt(req.query.limit) || 0;
    var offset = parseInt(req.query.offset) || 0;
    var order = req.query.order || 'asc';

    var sort = req.query.sort || 'name';

    // Sort stuff!
    _records.sort(function (a, b) {
        switch (true) {
            case /name/.test(sort):
                var _a = a.name.$.toLowerCase();
                var _b = b.name.$.toLowerCase();
                if (_a < _b) return order == 'asc' ? -1 : 1 ;
                if (_a > _b) return order == 'asc' ? 1 : -1;
                return 0;
                break;
            case /type/.test(sort):
                var _a = a.type.toLowerCase();
                var _b = b.type.toLowerCase();
                if (_a < _b) return order == 'asc' ? -1 : 1;
                if (_a > _b) return order == 'asc' ? 1 : -1;

                return 0;
                break;
            case /created/.test(sort):
                var _fmt = "YYYY-MM-DDTH:m:s.SSS[Z]";
                var _a = moment(a.versionCreated.$, _fmt );
                var _b = moment(b.versionCreated.$, _fmt);

                if (_a.unix() < _b.unix()) return order == 'asc' ? -1 : 1;
                if (_a.unix() > _b.unix()) return order == 'asc' ? 1 : -1;

                return 0;
                break;

            default:
                return 0;
                break;
        }
    });

    // Limit

    var _t = _records.slice(offset, limit + offset);
    _items.records = _t;

    // Simulate latency
    // setTimeout(function(){
    res.send(200, _items);
    //}, 2000);
};

exports.getItem = function (req, res, next) {
    res.contentType = "application/json";
    res.send(200, {});
};