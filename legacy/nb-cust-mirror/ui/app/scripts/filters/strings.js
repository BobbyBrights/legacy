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

angular.module('novaballApp')
    .filter('booleanToString',function () {
        return function (input) {
            return input ? 'Yes' : 'No';
        };

    }).filter('toSentenceCase',function () {
        return function (input) {
            return input.toSentenceCase();
        };

    }).filter('outputBetPanelHeader',function () {
        return function (input) {
            //console.log(input);
            var str = "";
            if(input && input.type) str += input.type.toProperCase() + " bet";
            return str;
        };
    }).filter('toCurrency',function () {
        return function (input) {

            var curr = input.currency == 'GBP' ? '£' : '€';
            if (input.amt) {
                return curr + parseFloat(input.amt).toFixed(2);
            } else {
                if (!isNaN(input)) {
                    return curr + input.toFixed(2);
                }
                return null;
            }

        };
    }).filter('labelClassStatus',function () {
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
    })



