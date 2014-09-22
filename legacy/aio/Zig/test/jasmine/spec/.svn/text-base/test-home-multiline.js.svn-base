describe("Home Page (autopay off)", function() {
	goToHomePage(false, true);
	
	// check home values
	it('Due days is correct', function() {
		expect($('#daysLeft').text()).toBe(homeMultilineMockResponse.nextBillDueDays);
	});
	it('Account ID is correct', function() {
		expect($('.headerAccount')[0].innerHTML).toBe(homeMultilineMockResponse.accountId);
	});
	it('PhoneNumber is correct', function() {
		expect($('.headerPhone')[0].innerHTML).toBe("4 Active Phone Lines");
	});
	it('User name is correct', function() {
		expect($('.hi').text()).toBe("Hi!");
	});
	it('Refuel Date is OK', function() {
		var nextRefuel = moment(homeMultilineMockResponse.billCycleDate, [ "MM/DD/YYYY HH:mm:ss", "MM/DD/YYYY", "X" ]);
		expect($('#refuelDate').text()).toBe(nextRefuel.format("MMMM Do"));
	});
	it('My Credit is OK', function() {
		expect($('#myCredit').text()).toBe('$' + homeMultilineMockResponse.accountBalance);
	});
	it('I Owe is OK', function() {
		expect($('#iOwe').text()).toBe('$' + homeMultilineMockResponse.amountDueToday);
	});
	it('MRC is OK', function() {
		expect($('#i18n_monthlyTotalText').text()).toContain('Your monthly service total is $' + homeMultilineMockResponse.totalMRC);
	});

	it('AutoPayStatus is correct', function() {
		expect($('#i18n_homeSetupAutoPayButton').attr('data-state')).toBe("deactivated");
	});

	it('Number of line is correct', function() {
		expect($('#i18n_yourLineTitle').text()).toContain("Your Lines ("+homeMultilineMockResponse.subscribers.length+")");
		expect($('#yourLines').children().length).toBe(homeMultilineMockResponse.subscribers.length * 2);
	});

	it('Phone line is OK', function() {
		expect($('#phone_0').text()).toContain("Phone "+ application.displayPhoneNumber(homeMultilineMockResponse.subscribers[0].ctn));
		expect($('#phone_0').next().children().length).toBe(3);
	});

	it('Tablet line is OK', function() {
		expect($('#phone_2').text()).toContain("Tablet "+ application.displayPhoneNumber(homeMultilineMockResponse.subscribers[2].ctn));
		expect($('#phone_2').next().children().length).toBe(2);
	});

	it('Pending line is OK', function() {
		expect($('#phone_3').text()).toContain("Phone "+ application.displayPhoneNumber(homeMultilineMockResponse.subscribers[3].ctn) + ' - Pending');
		expect($('#phone_3').next().children().first().text()).toContain("This line hasn't been activated yet.");
	});
});
