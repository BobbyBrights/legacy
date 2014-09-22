angular.module('nb.config', []).provider('nbConfig', function () {

    var cfg = {
        localStorage: {
            key: 'nb.authToken'
        }
    };

    // This to be configured by affiliate - bets will fail if it is not set properly.
    cfg.affiliateId = 'AFF081298301';

    this.getConfig = function () {
        return cfg;
    };

    var _self = this;
    this.$get = function () {
        return _self.getConfig();
    };
});