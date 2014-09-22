describe("Global tests", function() {
	it("There is no duplicated element ID", function() {
		var blocksWithId = $("*[id]");

		$.each(blocksWithId, function(index, element) {
			if(element.id) {
				/*
				 *  #myid selector does not select all elements with myid id, it selects the first one.
				 *  To get all elements with the myid id, we should use *[id=myid] selector.
				 */
				var $element = $("*[id=" + element.id + "]");
				
				runs(function() {
					expect($element).toHaveLength(1);
				});
			}
		});
	});
	
	it("Data amount calculation is well displayed", function() {
		var uup20		= Math.pow(2, 20);
		var uup10		= Math.pow(2, 10);
		var uup01		= Math.pow(2, 0);
		
		var tests		= new Array();
		tests.push((new App()).convertDataUsage(2.00 * uup01, 'kb', 2));
		tests.push((new App()).convertDataUsage(2.00 * uup10, 'kb', 2));
		tests.push((new App()).convertDataUsage(2.01 * uup10, 'kb', 2));
		tests.push((new App()).convertDataUsage(5.50 * uup01, 'mb', 2));
		tests.push((new App()).convertDataUsage(5.51 * uup01, 'gb', 2));
		tests.push((new App()).convertDataUsage(5.50 * uup20, 'kb', 2));
		tests.push((new App()).convertDataUsage(8.23 * uup20, 'mb', 2));
		tests.push((new App()).convertDataUsage(0.00 * uup01, 'mb', 2));
		tests.push((new App()).convertDataUsage(0.00 * uup10, 'kb', 2));
		tests.push((new App()).convertDataUsage("250.000", 'MB', 2));
		tests.push((new App()).convertDataUsage("2500.000", 'MB', 2));
		
		runs(function() {
			while(tests.length > 0) {
				expect(tests.pop()).not.toMatch(/.00/);
			}
		});
	});
	
	it("Form validator", function() {
		expect(application.formValidator.password("unDeux47")).toBeTruthy();
		expect(application.formValidator.password("undeux47")).toBeTruthy();
		expect(application.formValidator.password("UNDEUX47")).not.toBeTruthy();
		expect(application.formValidator.password("unDeuxTrois")).not.toBeTruthy();
		expect(application.formValidator.password("123456789")).not.toBeTruthy();
		expect(application.formValidator.password("1234")).not.toBeTruthy();
		expect(application.formValidator.password("012345678901234567890")).not.toBeTruthy();
		
		expect(application.formValidator.phoneNumber("2345678901")).toBeTruthy();
		expect(application.formValidator.phoneNumber("0123456789")).not.toBeTruthy();
		expect(application.formValidator.phoneNumber("1234567890")).not.toBeTruthy();
		expect(application.formValidator.phoneNumber("123456789")).not.toBeTruthy();
		expect(application.formValidator.phoneNumber("12345678900")).not.toBeTruthy();
		
		expect(application.formValidator.email("test@test.com")).toBeTruthy();
		expect(application.formValidator.email("test.com")).not.toBeTruthy();
		expect(application.formValidator.email("test@com")).not.toBeTruthy();
		
		expect(application.formValidator.cardExpirationDate("5/15")).toBeTruthy();
		expect(application.formValidator.cardExpirationDate("05/15")).toBeTruthy();
		expect(application.formValidator.cardExpirationDate("")).not.toBeTruthy();
		expect(application.formValidator.cardExpirationDate("05/13")).not.toBeTruthy();
		expect(application.formValidator.cardExpirationDate("15/05")).not.toBeTruthy();
		
		expect(application.formValidator.date("12/31/2012")).toBeTruthy();
		expect(application.formValidator.date("31/12/2012")).not.toBeTruthy();
		expect(application.formValidator.date("BadDate")).not.toBeTruthy();
		
		expect(application.formValidator.price("47")).toBeTruthy();
		expect(application.formValidator.price("47.6")).toBeTruthy();
		expect(application.formValidator.price("47.")).toBeTruthy();
		expect(application.formValidator.price("-47.6")).not.toBeTruthy();
		expect(application.formValidator.price("trente")).not.toBeTruthy();
		
		expect(application.formValidator.length("un",2)).toBeTruthy();
		expect(application.formValidator.length("un",1)).not.toBeTruthy();

		expect(application.formValidator.maxLength("cinq",5)).toBeTruthy();
		expect(application.formValidator.maxLength("cinq",3)).not.toBeTruthy();
		
		expect(application.formValidator.minLength("un",2)).toBeTruthy();
		expect(application.formValidator.minLength("un",3)).not.toBeTruthy();
		
		expect(application.formValidator.rangeLength("cinq",3,5)).toBeTruthy();
		expect(application.formValidator.rangeLength("un",3,5)).not.toBeTruthy();
		expect(application.formValidator.rangeLength("trente",3,5)).not.toBeTruthy();
		
		expect(application.formValidator.digits("47")).toBeTruthy();
		expect(application.formValidator.digits("trente")).not.toBeTruthy();
	});
});
