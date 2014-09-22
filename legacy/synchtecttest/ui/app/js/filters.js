'use strict';

angular.module('sttApp').filter('getImage', function () {
    return function (input) {
        // input.link is either an array or object.
        // We need a sensible default here because some of the "second sized" images
        // are actually 600 pixels wide. So we'll set the base height and width to 64 pix
        var height = 64, width = 64;
        var _image = 'Test'; // Should probably be a default image.
        if (!_.isArray(input.link) && !_.isUndefined(input.link['@rel']) && input.link['@rel'] === 'folder') {
            _image = '<img src="/images/folder.png" width="' + width + '" height="' + height + '" />';
        } else {
            var img = input.images[1];
            _image = '<img src="' + img.file + '" width="' + (img.width > width ? width : img.width) + '" height="' + (img.height > height ? height : img.width) + '" />'
            //_image = input.images[1].
        }
        return _image;
    };
}).filter('dateFormat', function () {
    return function (input) {
        // 2014-03-18T19:48:39.891Z
        var _d = moment(input, "YYYY-MM-DDTH:m:s.SSS[Z]");
        return _d.format('LLLL');
    };
}).filter('formatBytes', function () {
    return function (input) {
        return input.byteFormat();
    };
}).filter('getSystemAttribute', function ($filter) {
    return function (input, a) {
        // A contains the item we want to get.
        var _t = (a == 'Tags') ? 'None' : 'Unknown';

        if (!_.isUndefined(input.systemAttribute)) {
            for (var i in input.systemAttribute) {
                var _s = input.systemAttribute[i];
                if (_s['@name'] == a) {
                    // Is this a date object??
                    if (/\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(_s['$'])) {
                        var _d = moment(_s['$'], "YYYY-MM-DDTH:m:s.SSS[Z]");
                        _t = _d.format('LLLL');
                    } else if (a == 'Duration') {
                        _t = moment.duration(parseInt(_s['$'])).as('seconds') + " seconds";
                    } else {
                        _t = _s['$'];
                    }
                }
            }
        }
        return _t;
    };
}).filter('getFileAttribute', function () {
    return function (input, a) {
        // A contains the item we want to get.
        if (!_.isUndefined(input.fileAttribute)) {
            for (var i in input.fileAttribute) {
                var _s = input.fileAttribute[i];
                if (_s['@name'] == a) {
                    // Check is date.

                    return _s['$'];
                }
            }
        } else {
            return 'Unknown';
        }
    };
}).filter('getLinkByRel', ['$sce', function ($sce) {
    return function (input, a) {
        // A contains the item we want to get.
        if (!_.isUndefined(input.link)) {
            var prop = '';
            for (var i in input.link) {
                var _s = input.link[i];
                if (_s['@rel'] == a) {
                    prop = _s['$'];
                    // Issue with external audio/video not trusted resources.
                    if (prop.indexOf('http://') > -1) {
                        prop = $sce.trustAsResourceUrl(prop);
                    }
                }
            }
            return prop;
        } else {
            return 'Unknown';
        }
    };
}]).filter('hasPlaylist', function () {
    return function (input) {
        return !_.isUndefined(input.viewUid) && input.viewUid['@viewType'] == 'playlist';
    };

}).filter('getPlaylist', function () {
    return function (input) {
        return !_.isUndefined(input.viewUid) && input.viewUid['@viewType'] == 'playlist' ? input.viewUid.$ : '';
    };
});

String.prototype.byteFormat = function () {
    var a = parseInt(this);

    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (a == 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(a) / Math.log(1024)));

    return Math.round(a / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

