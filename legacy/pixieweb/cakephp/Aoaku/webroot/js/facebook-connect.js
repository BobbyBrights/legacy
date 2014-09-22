// Additional JS functions here
window.fbAsyncInit = function () {
    FB.init({
        appId: '435045276575378', // App ID
        channelUrl: '//aoaku.com/aoaku/channel', // Channel File
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true // parse XFBML
    });
};


// Load the SDK Asynchronously
(function (d) {
    var js, id = 'facebook-jssdk',
        ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));


var facebook_helper = {
	connect: function(){
		var fb = this;
	    FB.getLoginStatus(function (response) {
	        if (response.status === 'connected') {
	            fb.get_details(response);
	    	} else {
	            fb.login();
	        }
	    });		
	}, 
	
	get_details: function(details){
		var fb = this;
		FB.api('/me', function (response) {
			//console.log('Details: ', response);
			// First, check if the user exists, if not, add him.
			var check = $.post("/aoaku/users/check", {d: response.email}, function(data) {
				var result = JSON.parse(data);
				if(result._response.length == 0){
					//console.log("User does not exist");
					// Add user 
					var $user = {
						"data[User][username]" : details.authResponse.userID,
						"data[User][password]" : details.authResponse.accessToken, 
						"data[User][firstname]" : response.first_name, 
						"data[User][surname]" : response.last_name,
						"data[User][email]" : response.email,
						"data[User][gender]" : response.gender,
						"data[User][account_type_id]" : 1,
						// Add a token
						"data[Token][service]" : "facebook",
						"data[Token][token]" : JSON.stringify(details)
					};
					
					// Assign handlers immediately after making the request,
					// and remember the jqxhr object for this request
					var add = $.post("/aoaku/users/add", $user, function(data) {
						toggle_modal(true);
						var $r = JSON.parse(data);
						//console.log('Added user');
						fb.passthrough($user);
					}).done(function(data) {}).fail(function(data){
						toggle_modal(false);
					}).always(function(data) {}); 		
				} else {
					//console.log("User exists, log them in.");
					fb.passthrough({ "data[User][email]" : response.email });
				}				 
			}).done(function(data) {}).fail(function(data) {}).always(function(data) {});
	    });
	}, 
	
	passthrough: function(user){
		console.log('Logging in', user);	
		var x = $.post("/aoaku/users/single_sign_on", user, function(data) {
			console.log(data);
			toggle_modal(false);
			location.href = '/aoaku/users/me';
		}).done(function(data) {}).fail(function(data){
			toggle_modal(false);
		}).always(function(data) {}); 		
	}, 
	
	login: function(){
		var fb = this;
		FB.login(function (response) {
			if (response.authResponse) {
				console.log(response);
				fb.get_details(response);
			} else {
				toggle_modal(false);
			}
		}, {scope: 'email, user_location, user_likes'} );
	}
};

// Document Ready handlers - keeping the Facebook one separate from site ones. 
$(function() {
	$('.facebook-connect').on('click', function(e){
		e.preventDefault();
		toggle_modal(true);
		facebook_helper.connect();
	})
});
