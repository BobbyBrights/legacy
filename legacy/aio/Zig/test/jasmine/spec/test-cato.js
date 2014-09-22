describe('CATO features', function() {
	/*it('All empty tags have a label via aria-label, aria-labelledby or aria-described by attribute', function() {
		var $emptyButMustBeLabelledElements = $("body").find("*:empty:visible:not(input):not(img):not(.spacer):not(#alertWrapper):not(.page-bottom-margin):not([aria-label]):not([aria-labelledby]):not([aria-describedby])");
		
		runs(function() {
			expect($emptyButMustBeLabelledElements).toHaveLength(0);
		});
	});*/
	
	it('All WAI-ARIA attributes like "labelled-by" must contain a valid and existing block ID', function() {
		var wayAriaByAttrs = ["aria-describedby", "aria-labelledby"];
		
		runs(function() {
			$.each(wayAriaByAttrs, function(index, attrName) {
				var $wayAriaBy = $("*[" + attrName + "]");
				
				$.each($wayAriaBy, function(index, elt) {
					var $elt = $(elt);
					expect($("#" + $elt.attr(attrName))).toExist();
				});
			});
		});
	});
	
	it('All IMG tags have a correct alt attribute', function() {
		var $pictures = $("IMG");
		
		runs(function() {
			$.each($pictures, function(index, picture) {
				var $picture = $(picture);
				expect($picture).toHaveAttr("alt");
			});
		});
	});
	
	it('All disabled elements must have an aria-disabled attribute', function() {
		var $disabledElements = $("*[disabled], .disabled");
		
		runs(function() {
			$.each($disabledElements, function(index, disabled) {
				var $disabled = $(disabled);
				expect($disabled).toHaveAttr("aria-disabled", "true");
			});
		});
	});
	
	it('Navbar WAI-ARIA attributes are presents', function() {
		var $navBar = $("#footer").find(".nav-grid");
		
		runs(function() {
			expect($navBar).toHaveAttr("role", "menubar");
			
			$.each($navBar.find("a"), function(index, link) {
				var $link = $(link);
				expect($link).toHaveAttr("role", "menuitem");
			});
		});
	});
	
	it('Buttons WAI-ARIA attributes are presents', function() {
		var $buttons = $(".button, .inline-button");
		
		runs(function() {
			$.each($buttons, function(index, button) {
				var $button = $(button);
	
				expect($button).toHaveAttr("role", "button");
				if($button.hasClass("disabled")) {
					expect($button).toHaveAttr("aria-disabled", "true");
				}
			});
		});
	});
	
	it('Checkboxes WAI-ARIA attributes are presents', function() {
		var $checkboxes = $("input[type=checkbox]");
		
		runs(function() {
			$.each($checkboxes, function(index, checkbox) {
				var $checkbox = $(checkbox);
	
				expect($checkbox).toHaveAttr("role", "checkbox");
				if($checkbox.is(":checked")) {
					expect($checkbox).toHaveAttr("aria-checked", "true");
				}
			});
		});
	});
	
	it('Pages content is hidden while UI is locked', function() {
		var $pages = $("div.page");
		
		runs(function() {
			application.blockUI();
		});
		
		waits(1000);
		
		runs(function() {
			$.each($pages, function(index, page) {
				var $page = $(page);
	
				expect($page).toHaveAttr("aria-hidden", "true");
			});
		});
	});
	
	it('Navbar is hidden while UI is locked', function() {
		runs(function() {
			expect($("#footer")).toHaveAttr("aria-hidden", "true");
		});
	});
		
	it('Current page content is not hidden while UI is unlocked', function() {
		var $pages = $("div.page");

		runs(function() {
			application.unBlockUI();
		});
		
		waits(1000);
		
		runs(function() {
			$.each($pages, function(index, page) {
				var $page = $(page);
	
				expect($page).toHaveAttr("aria-hidden", ("#" + page.id) == application.currentPage ? "false" : "true");
			});
		});
	});

	it('Navbar is hidden while navbar is hidden', function() {
		runs(function() {
			expect($("#footer")).toHaveAttr("aria-hidden", "true");
		});
	});
	
	it('Pages content is hidden while a popup is displayed', function() {
		var $pages = $("div.page");
		
		runs(function() {
			window.zAlerts.alert("Test popup", "You're executing a useful unit test !", function() {void(0);});
		});
		
		waits(1000);
		
		runs(function() {
			$.each($pages, function(index, page) {
				var $page = $(page);
	
				expect($page).toHaveAttr("aria-hidden", "true");
			});
		});
	});
	
	it('Navbar is hidden while a popup is displayed', function() {
		runs(function() {
			expect($("#footer")).toHaveAttr("aria-hidden", "true");
		});
	});
	
	it('Current page content is not hidden while no popup is displayed', function() {
		var $pages = $("div.page");
		
		runs(function() {
			$("#zAlert .bright").trigger("tap");
		});
		
		waits(1000);
		
		runs(function() {
			$.each($pages, function(index, page) {
				var $page = $(page);
	
				expect($page).toHaveAttr("aria-hidden", ("#" + page.id) == application.currentPage ? "false" : "true");
			});
		});
	});

	it('Navbar is still being hidden while navbar is hidden', function() {
		runs(function() {
			expect($("#footer")).toHaveAttr("aria-hidden", "true");
		});
	});
});