beforeEach(function() {
	this.addMatchers({
		toBePlaying : function(expectedSong) {
			var player = this.actual;
			return player.currentlyPlayingSong === expectedSong && player.isPlaying;
		},

		toHaveClass : function(expectedClass) {
			return this.actual.hasClass(expectedClass);
		},

		toHaveProp : function(expectedProp) {
			return this.actual.prop(expectedProp);
		},

		toHaveLength : function(expectedLength) {
			return (this.actual.length == expectedLength);
		},

		toHaveAttr : function(attrName, value) {
			if(value) {
				return (this.actual.attr(attrName) == value);
			}
			else {
				return (this.actual.attr(attrName) != undefined && this.actual.attr(attrName) != null && this.actual.attr(attrName) != "");
			}
		}
	});
});

// Check EULA
var checkEULA = function() {
	if ($('#eulaDisclamerPage').is(':visible')) {
		$("#eulaChekBox").prop("checked", "true").triggerHandler('tap');
		$("#i18n_eulaAcceptButton").triggerHandler('tap');
		waits(1000);
		runs(function() {
			expect($('#loginPage')).toBeVisible();
		});
	}
};

// Go from start to home page
var homeMockResponse = {
	status : "success",
	ctn : "(123) 222-7845",
	accountId : "123456789012",
	accountName : "alpha",
	accountStatus : "Active",
	billCycleDate : moment().add("days", 7).format('MM/DD/YYYY hh:mm:ss'),
	accountBalance : "10.00",
	amountDueToday : "45.00",
	planName : "Trailblazer",
	planMRC : "55.00",
	subscriberId : "55512345",
	anniversaryDate : "01/12/2013 00:00:00",
	nextBillDueDays : "8",
	subscribers: [
        {ctn : "1111111753", subscriberId : "63822842051", status : "active", isTablet : false}
   	],
   	pinSecurity: "1",
   	totalMRC: "90"
};
var homeMultilineMockResponse = {
		status : "success",
		ctn : "(123) 222-7845",
		accountId : "123456789012",
		accountName : "alpha",
		accountStatus : "Active",
		billCycleDate : moment().add("days", 7).format('MM/DD/YYYY hh:mm:ss'),
		accountBalance : "10.00",
		amountDueToday : "45.00",
		planName : "Trailblazer",
		planMRC : "55.00",
		subscriberId : "55512345",
		anniversaryDate : "01/12/2013 00:00:00",
		nextBillDueDays : "8",
		subscribers: [
	       	{ctn : "1111111753", subscriberId : "63822842051", status : "active", isTablet : false},
	       	{ctn : "212342342", subscriberId : "123213645", status : "active", isTablet : false},
	       	{ctn : "1200546512", subscriberId : "78986565", status : "active", isTablet : true},
	       	{ctn : "02054645465", subscriberId : "6654237871312", status : "pendingActivation", isTablet : false},
	       	{ctn : "8798465654", subscriberId : "254d56454dfa", status : "active", isTablet : false}
	   	],
	   	pinSecurity: "1",
	   	totalMRC: "90"
	};
var autopayMockResponse = {
	status : "success",
	autoPayExists : "true",
	cardNumber : "**** **** **** 4343",
	cardName : "frfrfrf",
	postalCode : "43434",
	cardType : "AE",
	cardExpirationDate : "0413",
	paymentProfileId : "glghn07spf"
};
var goToHomePage = function(autoPayStatus, multiline) {
	checkEULA();

	it('Go to home ', function() {
		$('#i18n_loginUsername').val('alpha').triggerHandler('input');
		$('#i18n_loginPwd').val('pass').triggerHandler('input');

		waits(500);
		$.mockjaxClear();
		$.mockjax({
			url : '*/version',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{ "status" : "success", "version" : "0.01"}'
		});
		$.mockjax({
			url : '*/authentication/login',
			responseTime : 250,
			contentType : 'text/json',
			responseText : '{"status" : "success","sessionToken" : "2924169f"}'
		});
		var homeResponse = multiline? homeMultilineMockResponse : homeMockResponse;
		$.mockjax({
			url : '*/authentication/home',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(homeResponse)
		});

		var autoPayResponse = autoPayStatus ? autopayMockResponse : '{"status" : "success","autoPayExist" : false}';
		$.mockjax({
			url : '*/payment/auto/details',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(autoPayResponse)
		});

		$("#i18n_loginBtn").triggerHandler('tap');

		waits(1000);

		runs(function() {
			expect($('#loginPage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
		});
	});
	// we are on the home page
};
