describe("Transaction history", function() {
	var transactionsHistoryMockResponse = $.parseJSON('{"status":"success","transactionsHistory":[{"dateAndTime":"1371331246361","transactionType":"Direct Debit","description":"MRC paid by direct debit","amount":"47.88","balance":"0.00"},{"dateAndTime":"1368652846361","transactionType":"Direct Debit","description":"MRC paid by direct debit","amount":"47.88","balance":"0.00"},{"dateAndTime":"1366060846361","transactionType":"Direct Debit","description":"MRC paid by direct debit","amount":"47.88","balance":"0.00"},{"dateAndTime":"1363386046361","transactionType":"Direct Debit","description":"MRC paid by direct debit","amount":"47.88","balance":"0.00"},{"dateAndTime":"1360966846361","transactionType":"Direct Debit","description":"MRC paid by direct debit","amount":"47.88","balance":"0.00"},{"dateAndTime":"1358288446361","transactionType":"Direct Debit","description":"MRC paid by direct debit","amount":"47.88","balance":"0.00"},{"dateAndTime":"1355610046361","transactionType":"Direct Debit","description":"MRC paid by direct debit","amount":"47.88","balance":"0.00"},{"dateAndTime":"1353018046361","transactionType":"Direct Debit","description":"MRC paid by direct debit","amount":"47.88","balance":"0.00"},{"dateAndTime":"1350339646361","transactionType":"Direct Debit","description":"MRC paid by direct debit","amount":"47.88","balance":"0.00"}]}');
	
	goToHomePage();
	
	it('Transition from home to transaction history page is working', function() {
		$.mockjaxClear();
		$.mockjax({
			url : '*/payment/transactions',
			responseTime : 250,
			contentType : 'text/json',
			responseText : JSON.stringify(transactionsHistoryMockResponse)
		});
		
		application.gotoPage("transactionsHistoryPage");

		waits(500);

		runs(function() {
			expect($('#loginPage')).toBeHidden();
			expect($('#transactionsHistoryPage')).toBeVisible();
		});
	});
	
	waits(1000);
	
	describe("Transaction history is well populated", function() {

		runs(function() {
			expect($("#historyContainer .dateLine")).toHaveLength(transactionsHistoryMockResponse.transactionsHistory.length);
			expect($("#historyContainer .descLine")).toHaveLength(transactionsHistoryMockResponse.transactionsHistory.length);
		});
	});
});