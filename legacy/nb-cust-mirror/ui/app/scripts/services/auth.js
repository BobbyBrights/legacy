angular.module('nb.userSession', [])
    .service('userSession', function () {
        var username = '', customerType = '', loggedIn = false;
        return {
            getUsername: function () {
                return username;
            },
            setUsername: function(value) {
                username = value;
            },
            getCustomerType: function () {
                return customerType;
            },
            setCustomerType: function(value) {
                customerType = value;
            },
            isLoggedIn: function(){
                return loggedIn == true;
            },
            setLoggedIn: function(){
                loggedIn = true;
            },
            reset: function(){
                username = '', customerType = '', loggedIn = false;
            }
        };
    });