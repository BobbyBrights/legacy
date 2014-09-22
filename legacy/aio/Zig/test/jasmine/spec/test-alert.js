describe('Testing zAlert popup plugin', function() {
	
	// go to the home page
	goToHomePage(true);
	
	// it(s)
	it('Vertical with one button', function() {
		application.showMsg("This is a popup with one vertical button", 
							"Test", 
							{orientation: "vertical", 
							buttons: [{label: 'Button 1', callback: function() {}}]});
		
		waits(1000);

		runs(function() {
			expect($('#zAlert')).toExist();
			expect($('#zAlert')).toBeVisible();
			expect($('#zAlert').find(".button")).toHaveLength(1);
			callPhantom({cmd : 'capture', name:'1 vertical button'});
			$('#zAlert').find(".button").trigger("tap");
			expect($('#zAlert')).not.toExist();
		});
	});

	it('Vertical with two button', function() {
		application.showMsg("This is a popup with two vertical buttons", 
							"Test", 
							{orientation: "vertical", 
							buttons: [{label: 'Button 1', callback: function() {}}, {label: 'Button 2', callback: function() {}}]});
		
		waits(1000);

		runs(function() {
			expect($('#zAlert')).toExist();
			expect($('#zAlert')).toBeVisible();
			expect($('#zAlert').find(".button")).toHaveLength(2);
			callPhantom({cmd : 'capture', name:'2 vertical buttons'});
			$('#zAlert').find(".button").trigger("tap");
			expect($('#zAlert')).not.toExist();
		});
	});

	it('Vertical with three button', function() {
		application.showMsg("This is a popup with three vertical buttons", 
							"Test", 
							{orientation: "vertical", 
							buttons: [{label: 'Button 1', callback: function() {}}, {label: 'Button 2', callback: function() {}}, {label: 'Button 3', callback: function() {}}]});
		
		waits(1000);

		runs(function() {
			expect($('#zAlert')).toExist();
			expect($('#zAlert')).toBeVisible();
			expect($('#zAlert').find(".button")).toHaveLength(3);
			callPhantom({cmd : 'capture', name:'3 vertical buttons'});
			$('#zAlert').find(".button").trigger("tap");
			expect($('#zAlert')).not.toExist();
		});
	});
	
	it('Horizontal with one button', function() {
		application.showMsg("This is a popup with one vertical button", 
							"Test", 
							{orientation: "horizontal", 
							buttons: [{label: 'Button 1', callback: function() {}}]});
		
		waits(1000);
		
		runs(function() {
			expect($('#zAlert')).toExist();
			expect($('#zAlert')).toBeVisible();
			expect($('#zAlert').find(".button")).toHaveLength(1);
			callPhantom({cmd : 'capture', name:'1 vertical button'});
			$('#zAlert').find(".button").trigger("tap");
			expect($('#zAlert')).not.toExist();
		});
	});

	it('Horizontal with two button', function() {
		application.showMsg("This is a popup with two vertical buttons", 
							"Test", 
							{orientation: "horizontal", 
							buttons: [{label: 'Button 1', callback: function() {}}, {label: 'Button 2', callback: function() {}}]});
		
		waits(1000);
		
		runs(function() {
			expect($('#zAlert')).toExist();
			expect($('#zAlert')).toBeVisible();
			expect($('#zAlert').find(".button")).toHaveLength(2);
			callPhantom({cmd : 'capture', name:'2 vertical buttons'});
			$('#zAlert').find(".button").trigger("tap");
			expect($('#zAlert')).not.toExist();
		});
	});

	it('Horizontal with three button', function() {
		application.showMsg("This is a popup with three vertical buttons", 
							"Test", 
							{orientation: "horizontal", 
							buttons: [{label: 'Button 1', callback: function() {}}, {label: 'Button 2', callback: function() {}}, {label: 'Button 3', callback: function() {}}]});
		
		waits(1000);
		
		runs(function() {
			expect($('#zAlert')).toExist();
			expect($('#zAlert')).toBeVisible();
			expect($('#zAlert').find(".button")).toHaveLength(3);
			callPhantom({cmd : 'capture', name:'3 vertical buttons'});
			$('#zAlert').find(".button").trigger("tap");
			expect($('#zAlert')).not.toExist();
		});
	});
});