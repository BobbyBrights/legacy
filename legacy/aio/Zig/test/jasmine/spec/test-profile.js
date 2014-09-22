describe("Profile", function() {
	goToHomePage();

	it('Transition from home to more page is working', function() {
		application.gotoPage('morePage');
		waits(500);
		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
		});
	});

	waits(1000);

	var profileMockResponse = {
		status : "success",
		name : "Zippy",
		accountId : "777666555",
		accountStatus : "Active",
		nextBillDue : "06/18/2013 22:33:34",
		nextBillDueDays : "9",
		homePhoneNumber : "03455430",
		businessPhoneNumber : "67899876",
		email : "u.langer@work.com",
		address : {
			addressType : "S",
			streetAddress : "9401 NW 106TH ST",
			postalCode : "54321",
			city : "Zigopolis",
			state : "MO"
		},
		subscriberDetails:[
           	{
       			ctn:"334445555",
       			device:"Samsung S3",
       			deviceIMEI:"463717274969035"
       		}
       	]
	};

	it('Transition from more to profile is working', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/profile/details',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(profileMockResponse)
		});
		$.mockjax({
			url : '*/logout',
			responseTime : 0,
			contentType : 'text/json',
			responseText : '{"status":"success"}'
		});

		$("#morePageProfileBtn").triggerHandler('tap');
		waits(500);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#myProfilePage')).toBeVisible();
		});
	});

	waits(1000);

	it('Check that values are correct', function() {
		runs(function() {
			callPhantom({cmd : 'capture',name : 'profile'});
			expect($('#profileInfoName').html()).toContain('Zippy');
			expect($('#profileInfoAccountId').html()).toContain('777666555');
			expect($('div.deviceInfo').first().find('tr:nth-of-type(1) td:nth-of-type(2)').html()).toContain('334445555');
			expect($('div.deviceInfo').first().find('tr:nth-of-type(2) td:nth-of-type(2)').html()).toContain('Samsung S3');
			expect($('div.deviceInfo').first().find('tr:nth-of-type(3) td:nth-of-type(2)').html()).toContain('46371-72749-69035');
			expect($('#profileInfoCycleRestart').html()).toContain('June 18th 2013');
			expect($('#profileInfoAccountStatus').html()).toContain('Active');
			expect($('#profileInfoHomePhone').html()).toContain('03455430');
			expect($('#profileInfoWorkPhone').html()).toContain('67899876');
			expect($('#profileInfoEmail').html()).toContain('u.langer@work.com');
			expect($('#profileInfoBillingAndShipping').html()).toContain('9401 NW 106TH ST');
			expect($('#profileInfoBillingAndShipping').html()).toContain('54321');
			expect($('#profileInfoBillingAndShipping').html()).toContain('Zigopolis');
			expect($('#profileInfoBillingAndShipping').html()).toContain('MO');
			expect(application.connector.myProfileModel.attr).not.toEqual({});
		});
	});

	it('Back to more page', function() {
		$("#myProfilePage .back-button").triggerHandler('tap');

		waits(2000);

		runs(function() {
			expect($('#myProfilePage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
		});
	});
	
	var profileMultilineMockResponse = {
			status : "success",
			name : "Zippy",
			accountId : "777666555",
			accountStatus : "Active",
			nextBillDue : "06/18/2013 22:33:34",
			nextBillDueDays : "9",
			homePhoneNumber : "03455430",
			businessPhoneNumber : "67899876",
			email : "u.langer@work.com",
			address : {
				addressType : "S",
				streetAddress : "9401 NW 106TH ST",
				postalCode : "54321",
				city : "Zigopolis",
				state : "MO"
			},
			subscriberDetails:[
	           	{ctn:"334445555",device:"Samsung S3",deviceIMEI:"463717274969035"},
	       		{ctn:"1111111754", device:"Sansung Galaxy S4", deviceIMEI:"123456789101113"},
	       		{ctn:"1111111753", device:"iPhone 5", deviceIMEI:"123456789101112"}
	       	]
		};

	it('Transition from more to profile is working', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/profile/details',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(profileMultilineMockResponse)
		});
		$.mockjax({
			url : '*/logout',
			responseTime : 0,
			contentType : 'text/json',
			responseText : '{"status":"success"}'
		});

		$("#morePageProfileBtn").triggerHandler('tap');
		waits(500);
		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#myProfilePage')).toBeVisible();
		});
	});

	waits(1000);

	it('Check that values are correct', function() {
		runs(function() {
			callPhantom({cmd : 'capture',name : 'profile'});
			expect($('#profileInfoName').html()).toContain('Zippy');
			expect($('#profileInfoAccountId').html()).toContain('777666555');
			expect($('#profileInfoCycleRestart').html()).toContain('June 18th 2013');
			expect($('#profileInfoAccountStatus').html()).toContain('Active');
			expect($('#profileInfoHomePhone').html()).toContain('03455430');
			expect($('#profileInfoWorkPhone').html()).toContain('67899876');
			expect($('#profileInfoEmail').html()).toContain('u.langer@work.com');
			expect($('#profileInfoBillingAndShipping').html()).toContain('9401 NW 106TH ST');
			expect($('#profileInfoBillingAndShipping').html()).toContain('54321');
			expect($('#profileInfoBillingAndShipping').html()).toContain('Zigopolis');
			expect($('#profileInfoBillingAndShipping').html()).toContain('MO');
			expect(application.connector.myProfileModel.attr).not.toEqual({});
		});
	});
	
	it('Check that all multiline accounts are correct', function() {
		runs(function() {
			expect($('div.deviceInfo').first().find('tr:nth-of-type(1) td:nth-of-type(2)').html()).toContain('334445555');
			expect($('div.deviceInfo').first().find('tr:nth-of-type(2) td:nth-of-type(2)').html()).toContain('Samsung S3');
			expect($('div.deviceInfo').first().find('tr:nth-of-type(3) td:nth-of-type(2)').html()).toContain('46371-72749-69035');

			expect($('div.deviceInfo').first().next().find('tr:nth-of-type(1) td:nth-of-type(2)').html()).toContain('1111111754');
			expect($('div.deviceInfo').first().next().find('tr:nth-of-type(2) td:nth-of-type(2)').html()).toContain('Sansung Galaxy S4');
			expect($('div.deviceInfo').first().next().find('tr:nth-of-type(3) td:nth-of-type(2)').html()).toContain('12345-67891-01113');

			expect($('div.deviceInfo').last().find('tr:nth-of-type(1) td:nth-of-type(2)').html()).toContain('1111111753');
			expect($('div.deviceInfo').last().find('tr:nth-of-type(2) td:nth-of-type(2)').html()).toContain('iPhone 5');
			expect($('div.deviceInfo').last().find('tr:nth-of-type(3) td:nth-of-type(2)').html()).toContain('12345-67891-01112');
		});
	});
	
	

	it('Back to more page', function() {
		$("#myProfilePage .back-button").triggerHandler('tap');

		waits(2000);

		runs(function() {
			expect($('#myProfilePage')).toBeHidden();
			expect($('#morePage')).toBeVisible();
		});
	});

	it('Back to home', function() {
		application.gotoPage("homePage");

		waits(2000);

		runs(function() {
			expect($('#morePage')).toBeHidden();
			expect($('#homePage')).toBeVisible();
		});
	});

	it('Log out', function() {
		$("#i18n_homeLogOutButton").triggerHandler("tap");

		waits(2000);

		runs(function() {
			expect($('#homePage')).toBeHidden();
			expect($('#loginPage')).toBeVisible();
			expect(application.connector.myProfileModel.attr).toEqual({});
		});
	});
});
