'use strict';

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

String.prototype.toSentenceCase = function () {
    var rg = /(^\w{1}|\.\s*\w{1})/gi;
    return this.replace(rg, function (toReplace) {
        return toReplace.toUpperCase();
    });
}

angular.module('nb.filters', [])
    .filter('booleanToString', function () {
        return function (input) {
            return input ? 'Yes' : 'No';
        };

    }).filter('toSentenceCase', function () {
        return function (input) {
            return input.toSentenceCase();
        };

    }).filter('outputBetPanelHeader', function () {
        return function (input) {
            var str = "";
            if (input && input.type) str += input.type.toProperCase() + " bet";
            return str;
        };
    }).filter('toCurrency', function () {
        return function (input, args) {
            //var curr = (!_.isUndefined(args.currency) && args.currency == 'GBP') ? '£' : '€';
            return "£" + parseFloat(input).toFixed(2);
        };
    }).filter('labelClassStatus', function () {
        return function (input) {
            var _cl = 'label-default';
            input = input.toString().toLowerCase();
            switch (input) {
                case 'complete':
                case 'true':
                    _cl = 'label-success';
                    break;
                case 'false':
                    _cl - 'label-warning';
                    break;
                case 'failed':
                    _cl = 'label-danger';
                    break;
                default:
                    break;
            }

            return _cl;
        };
    }).filter('boolToStringActive', function () {
        return function (input) {
            return input ? 'Active' : 'Inactive';
        };
    }).filter('normalize', function () {
        return function (input, args) {
            return input == 1 ? input + " " + args.singular : input + " " + args.plural;
        };
    }).filter('startFrom', function(){
        return function(input, start){
            start = +start;//parse to integer
            return input.slice(start);
        }
    });



