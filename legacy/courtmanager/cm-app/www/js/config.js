angular.module('cm.config', []).provider('cmConfig', function () {
    var cfg = {
        //host: 'http://courtmanager.pixiewebdesign.net',
        host: 'http://localhost:3010',
        modal: {
            content: 'Loading court info..',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 500
        }
    };

    this.getConfig = function () {
        return cfg;
    };

    var _self = this;
    this.$get = function () {
        return _self.getConfig();
    };
});