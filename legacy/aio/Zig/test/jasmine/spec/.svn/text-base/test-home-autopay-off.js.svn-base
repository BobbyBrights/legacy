describe("Home Page (autopay off)", function() {
	goToHomePage();

	// check home values
	it('Due days is correct', function() {
		expect($('#daysLeft').text()).toBe(homeMockResponse.nextBillDueDays);
	});
	it('Account ID is correct', function() {
		expect($('.headerAccount')[0].innerHTML).toBe(homeMockResponse.accountId);
	});
	it('PhoneNumber is correct', function() {
		expect($('.headerPhone')[0].innerHTML).toBe(application.displayPhoneNumber(homeMockResponse.subscribers[0].ctn));
	});
	it('User name is correct', function() {
		expect($('.hi').text()).toBe("Hi "+ homeMockResponse.accountName +"!");
	});
	it('Refuel Date is OK', function() {
		var nextRefuel = moment(homeMockResponse.billCycleDate, [ "MM/DD/YYYY HH:mm:ss", "MM/DD/YYYY", "X" ]);
		expect($('#refuelDate').text()).toBe(nextRefuel.format("MMMM Do"));
	});
	it('My Credit is OK', function() {
		expect($('#myCredit').text()).toBe('$' + homeMockResponse.accountBalance);
	});
	it('I Owe is OK', function() {
		expect($('#iOwe').text()).toBe('$' + homeMockResponse.amountDueToday);
	});
	it('MRC is OK', function() {
		expect($('#i18n_monthlyTotalText').text()).toContain('Your monthly service total is $' + homeMockResponse.totalMRC);
	});

	it('AutoPayStatus is correct', function() {
		expect($('#i18n_homeSetupAutoPayButton').attr('data-state')).toBe("deactivated");
	});

	it('Number of line is correct', function() {
		expect($('#i18n_yourLineTitle').text()).toContain("Your Lines");
		expect($('#yourLines').children().length).toBe(homeMockResponse.subscribers.length * 2);
	});

	it('Phone line is OK', function() {
		expect($('#phone_0').text()).toContain("Phone "+ application.displayPhoneNumber(homeMockResponse.subscribers[0].ctn));
		expect($('#phone_0').next().children().length).toBe(3);
	});

});
