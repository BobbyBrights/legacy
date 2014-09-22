describe(
		"Usage Page",
		function() {
			var usageSummaryResponse1 = $
					.parseJSON('{"status":"success","limitedServices":[{"totalAllowance":"100","consumedAllowance":"10","remainingAllowance":"90","uom":"MB","serviceType":"Data","thresholdLower":"50","thresholdLimit":"75"}]}');
			var usageSummaryResponse2 = $
					.parseJSON('{"status":"success","limitedServices":[{"totalAllowance":"100","consumedAllowance":"60","remainingAllowance":"40","uom":"MB","serviceType":"Data","thresholdLower":"50","thresholdLimit":"75"}]}');
			var usageSummaryResponse3 = $
					.parseJSON('{"status":"success","limitedServices":[{"totalAllowance":"100","consumedAllowance":"80","remainingAllowance":"20","uom":"MB","serviceType":"Data","thresholdLower":"50","thresholdLimit":"75"}]}');
			var usageSummaryResponse4 = $
			.parseJSON('{"status":"success","limitedServices":[{"totalAllowance":"100","consumedAllowance":"120","remainingAllowance":"00","uom":"MB","serviceType":"Data","thresholdLower":"50","thresholdLimit":"75"}, {"totalAllowance":"60","consumedAllowance":"20","remainingAllowance":"40","uom":"minutes","titleOfFeature":"International Call","serviceType":"Voice","thresholdLower":"50","thresholdLimit":"75"}]}');
			var usageDetailsResponse1 = $
					.parseJSON('{"status":"success","usageDetails":[{"dateAndTime":"07/24/2013 11:06:34","type":"Data","quantity":"2048","unit":"kB","calledNumber":"-"},{"dateAndTime":"06/30/2013 3:30:29","type":"Data","quantity":"2965","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/01/2013 19:49:24","type":"Data","quantity":"4495","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/03/2013 23:20:43","type":"Data","quantity":"1209","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/04/2013 17:41:51","type":"Data","quantity":"9106","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/05/2013 5:23:18","type":"Data","quantity":"6376","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/05/2013 9:3:3","type":"Data","quantity":"7840","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/07/2013 22:50:22","type":"Data","quantity":"3568","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/08/2013 20:40:45","type":"Data","quantity":"2903","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/12/2013 3:43:20","type":"Data","quantity":"7890","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/12/2013 13:53:31","type":"Data","quantity":"6835","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/12/2013 17:27:44","type":"Data","quantity":"5074","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/12/2013 22:14:23","type":"Data","quantity":"1612","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/13/2013 10:40:50","type":"Data","quantity":"6677","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/15/2013 17:39:31","type":"Data","quantity":"6094","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/16/2013 17:30:27","type":"Data","quantity":"1707","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/16/2013 17:30:27","type":"Data","quantity":"1707","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/16/2013 17:30:27","type":"Data","quantity":"1707","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/16/2013 17:30:27","type":"Data","quantity":"1707","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/16/2013 17:30:27","type":"Data","quantity":"1707","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/16/2013 17:30:27","type":"Data","quantity":"1707","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/16/2013 17:30:27","type":"Data","quantity":"1707","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/16/2013 17:30:27","type":"Data","quantity":"1707","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/16/2013 17:30:27","type":"Data","quantity":"1707","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/16/2013 17:30:27","type":"Data","quantity":"1707","unit":"kB","calledNumber":"-"},{"dateAndTime":"07/16/2013 17:30:27","type":"Data","quantity":"1707","unit":"kB","calledNumber":"-"}]}');
			var usageDetailsResponse2 = $.parseJSON('{"status":"success","usageDetails":[{"dateAndTime":"06/30/2013 3:30:29","type":"Data","quantity":"2965","unit":"kB","calledNumber":"-"}]}');

			goToHomePage(true);

			it('Transition from home to usage page is working', function() {
				$.mockjaxClear();
				$.mockjax({
					url : '*/usage/summary',
					responseTime : 100,
					contentType : 'text/json',
					responseText : JSON.stringify(usageSummaryResponse1)
				});
				$.mockjax({
					url : '*/usage/details',
					responseTime : 1000,
					contentType : 'text/json',
					responseText : JSON.stringify(usageDetailsResponse1)
				});

				application.gotoPage('usagePage');
				waits(500);
				runs(function() {
					expect($('#homePage')).toBeHidden();
					expect($('#usagePage')).toBeVisible();
				});
			});

			it('Usage summary is correctly loaded - Data lower than thresholdLower', function() {
				waits(2000);
				runs(function() {
					expect($('#monthlyUsageContent .leftBar .progress > span')).toHaveClass("green");
					expect($('#monthlyUsageContent .rightBar .progress > span').width()).toEqual(0);
				});
			});

			it('Usage details are correctly loaded', function() {
				runs(function() {
					expect($('#usageDetailsResultContent tr')).toHaveLength(usageDetailsResponse1.usageDetails.length);
					callPhantom({cmd : 'capture', name:'usage-1'});
				});
			});

			it('Back to Top button is displayed and works', function() {
				window.scrollTo(0, 5000);

				waits(1000);
				runs(function() {
					expect($('#usagePage .button-bar')).toBeVisible();
					expect(window.scrollY).toBeGreaterThan(0);
					callPhantom({cmd : 'capture', name:'usage-2'});
				});

				waits(1000);
				runs(function() {
					$("#i18n_usageBackToTopButton").triggerHandler('tap');
				});

				waits(2000);
				runs(function() {
					expect(window.scrollY).toEqual(0);
					callPhantom({cmd : 'capture', name:'usage-3'});
				});
			});

			it('Usage summary is correctly loaded - Data lower than thresholdLimit but greater than thresholdLower', function() {
				$.mockjaxClear();
				$.mockjax({
					url : '*/usage/summary',
					responseTime : 100,
					contentType : 'text/json',
					responseText : JSON.stringify(usageSummaryResponse2)
				});
				$.mockjax({
					url : '*/usage/details',
					responseTime : 100,
					contentType : 'text/json',
					responseText : JSON.stringify(usageDetailsResponse2)
				});

				runs(function() {
					application.gotoPage('morePage');
				});
				waits(1000);
				runs(function() {
					application.gotoPage('usagePage');
				});

				waits(1000);
				runs(function() {
					expect($('#monthlyUsageContent .leftBar .progress > span')).toHaveClass("yellow");
					expect($('#monthlyUsageContent .rightBar .progress > span').width()).toEqual(0);
					callPhantom({cmd : 'capture', name:'usage-4'});
				});
			});

			it('Back to Top button is not displayed because there not enough details to scroll down', function() {
				waits(1000);
				runs(function() {
					expect($('#usagePage .button-bar')).toBeHidden();
					callPhantom({cmd : 'capture', name:'usage-5'});
				});
			});

			it('Usage summary is correctly loaded - Data greater than thresholdLimit', function() {
				$.mockjaxClear();
				$.mockjax({
					url : '*/usage/summary',
					responseTime : 100,
					contentType : 'text/json',
					responseText : JSON.stringify(usageSummaryResponse3)
				});
				$.mockjax({
					url : '*/usage/details',
					responseTime : 100,
					contentType : 'text/json',
					responseText : JSON.stringify(usageDetailsResponse1)
				});

				runs(function() {
					application.gotoPage('morePage');
				});
				waits(1000);
				runs(function() {
					application.gotoPage('usagePage');
				});

				waits(1000);
				runs(function() {
					expect($('#monthlyUsageContent .leftBar .progress > span')).toHaveClass("plume");
					expect($('#monthlyUsageContent .rightBar .progress > span').width()).toEqual(0);
					callPhantom({cmd : 'capture', name:'usage-6'});
				});
			});

			it('Usage summary is correctly loaded - Data greater than monthly limit', function() {
				$.mockjaxClear();
				$.mockjax({
					url : '*/usage/summary',
					responseTime : 100,
					contentType : 'text/json',
					responseText : JSON.stringify(usageSummaryResponse4)
				});
				$.mockjax({
					url : '*/usage/details',
					responseTime : 100,
					contentType : 'text/json',
					responseText : JSON.stringify(usageDetailsResponse1)
				});

				runs(function() {
					application.gotoPage('morePage');
				});
				waits(1000);
				runs(function() {
					application.gotoPage('usagePage');
				});

				waits(1000);
				runs(function() {
					expect($('#monthlyUsageContent .leftBar .progress > span')).toHaveClass("plume");
					// 23 pixels for 320*480
					expect($('#monthlyUsageContent .rightBar .progress > span').width()).toEqual(23);
					callPhantom({cmd : 'capture', name:'usage-7'});
				});
			});

			it('Select for usage details is correctly loaded - Two limited usages', function() {
				runs(function() {
					expect($('#monthlyUsageContent .leftBar').length).toEqual(2);
					expect($('#monthlyUsageContent .leftBar:eq(1) .progress > span')).toHaveClass("green");
					expect($('#monthlyUsageContent .rightBar:eq(1)')).toBeEmpty();
				});
			});

			it('Select for usage details is correctly loaded - Anniversary date in last month', function() {
				$.mockjaxClear();
				$.mockjax({
					url : '*/usage/summary',
					responseTime : 100,
					contentType : 'text/json',
					responseText : JSON.stringify(usageSummaryResponse4)
				});
				$.mockjax({
					url : '*/usage/details',
					responseTime : 100,
					contentType : 'text/json',
					responseText : JSON.stringify(usageDetailsResponse1)
				});
				var newAnnivDate = moment().subtract("day", 7);
				application.connector.homeModel.set({
					'anniversaryDate' : newAnnivDate.format('MM/DD/YYYY hh:mm:ss')
				});

				runs(function() {
					application.gotoPage('morePage');
				});
				waits(1000);
				runs(function() {
					application.gotoPage('usagePage');
				});

				waits(1000);
				runs(function() {
					expect($('#usageDetailsSelect option')).toHaveLength(1);
					expect($('#usageDetailsSelect option:eq(0)').text()).toContain('Today - ' + newAnnivDate.format('MM/DD/YYYY'));
					callPhantom({cmd : 'capture', name:'usage-8'});
				});
			});

			it('Select for usage details is correctly loaded - Anniversary date in last two months', function() {
				var newAnnivDate = moment().subtract("day", 7).subtract("month", 1);
				var billCycleDate = application.connector.homeModel.get('billCycleDate');
				application.connector.homeModel.set({
					'anniversaryDate' : newAnnivDate.format('MM/DD/YYYY hh:mm:ss')
				});
				var currentBillCycleStart = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('month', 1);
				var previousBillCycleEnd = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('month', 1).subtract('days', 1);

				runs(function() {
					application.gotoPage('morePage');
				});
				waits(1000);
				runs(function() {
					application.gotoPage('usagePage');
				});

				waits(1000);
				runs(function() {
					expect($('#usageDetailsSelect option')).toHaveLength(2);
					expect($('#usageDetailsSelect option:eq(0)').text()).toContain('Today - ' + currentBillCycleStart.format('MM/DD/YYYY'));
					expect($('#usageDetailsSelect option:eq(1)').text()).toContain(previousBillCycleEnd.format('MM/DD/YYYY') + ' - ' + newAnnivDate.format('MM/DD/YYYY'));
					callPhantom({cmd : 'capture', name:'usage-9'});
				});
			});

			it('Select for usage details is correctly loaded - Anniversary date in last three months', function() {
				var newAnnivDate = moment().subtract("day", 7).subtract("month", 2);
				var billCycleDate = application.connector.homeModel.get('billCycleDate');
				application.connector.homeModel.set({
					'anniversaryDate' : newAnnivDate.format('MM/DD/YYYY hh:mm:ss')
				});
				var currentBillCycleStart = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('month', 1);
				var previousBillCycleEnd = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('month', 1).subtract('days', 1);
				var previousBillCycleStart = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('month', 2);
				var firstBillCycleEnd = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('month', 2).subtract('days', 1);

				runs(function() {
					application.gotoPage('morePage');
				});
				waits(1000);
				runs(function() {
					application.gotoPage('usagePage');
				});

				waits(1000);
				runs(function() {
					expect($('#usageDetailsSelect option')).toHaveLength(3);
					expect($('#usageDetailsSelect option:eq(0)').text()).toContain('Today - ' + currentBillCycleStart.format('MM/DD/YYYY'));
					expect($('#usageDetailsSelect option:eq(1)').text()).toContain(previousBillCycleEnd.format('MM/DD/YYYY') + ' - ' + previousBillCycleStart.format('MM/DD/YYYY'));
					expect($('#usageDetailsSelect option:eq(2)').text()).toContain(firstBillCycleEnd.format('MM/DD/YYYY') + ' - ' + newAnnivDate.format('MM/DD/YYYY'));
					callPhantom({cmd : 'capture', name:'usage-10'});
				});
			});

			it('Select for usage details is correctly loaded - Anniversary date in before three months', function() {
				var newAnnivDate = moment().subtract("day", 7).subtract("month", 3);
				var billCycleDate = application.connector.homeModel.get('billCycleDate');
				application.connector.homeModel.set({
					'anniversaryDate' : newAnnivDate.format('MM/DD/YYYY hh:mm:ss')
				});
				var currentBillCycleStart = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('month', 1);
				var previousBillCycleEnd = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('month', 1).subtract('days', 1);
				var previousBillCycleStart = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('month', 2);
				var firstBillCycleEnd = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('month', 2).subtract('days', 1);
				var firstBillCycleStart = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('month', 3);

				runs(function() {
					application.gotoPage('morePage');
				});
				waits(1000);
				runs(function() {
					application.gotoPage('usagePage');
				});

				waits(1000);
				runs(function() {
					expect($('#usageDetailsSelect option')).toHaveLength(3);
					expect($('#usageDetailsSelect option:eq(0)').text()).toContain('Today - ' + currentBillCycleStart.format('MM/DD/YYYY'));
					expect($('#usageDetailsSelect option:eq(1)').text()).toContain(previousBillCycleEnd.format('MM/DD/YYYY') + ' - ' + previousBillCycleStart.format('MM/DD/YYYY'));
					expect($('#usageDetailsSelect option:eq(2)').text()).toContain(firstBillCycleEnd.format('MM/DD/YYYY') + ' - ' + firstBillCycleStart.format('MM/DD/YYYY'));
					callPhantom({cmd : 'capture', name:'usage-11'});
				});
			});

			it('HTTP errors are correctly managed', function() {
				$.mockjaxClear();
				$.mockjax({
					url : '*/usage/details',
					responseTime : 500,
					status : 404,
					contentType : 'text/json',
					responseText : JSON.stringify(usageDetailsResponse1)
				});

				runs(function() {
					$("#usageDetailsSelect").triggerHandler('change');
				});

				waits(1000);
				runs(function() {
					$(".default.dw-modal.dw-date .dwbw.dwb-s .dwb").triggerHandler('tap');
				});

				waits(1000);
				runs(function() {
					expect($('#zAlert')).toBeVisible();
					callPhantom({cmd : 'capture', name:'usage-12'});
				});
			});

			it('Network errors are correctly managed', function() {
				$.mockjaxClear();
				$.mockjax({
					url : '*/usage/details',
					responseTime : 250,
					isTimeout : true,
					contentType : 'text/json',
					responseText : JSON.stringify(usageDetailsResponse1)
				});

				$('#zAlert .bright').triggerHandler('tap');

				runs(function() {
					expect($('#zAlert')).not.toBeVisible();
				});

				waits(1000);
				runs(function() {
					expect($('#zAlert')).toBeVisible();
					callPhantom({cmd : 'capture', name:'usage-13'});
				});
			});

			it('Usage details loading is working after reconnection', function() {
				$.mockjaxClear();
				$.mockjax({
					url : '*/usage/details',
					responseTime : 500,
					contentType : 'text/json',
					responseText : JSON.stringify(usageDetailsResponse1)
				});

				$('#zAlert .bright').triggerHandler('tap');
				waits(600);

				runs(function() {
					expect($('#zAlert')).not.toBeVisible();
					expect($('#usageDetailsResultContent tr')).toHaveLength(usageDetailsResponse1.usageDetails.length);
				});
			});

			it('Usage errors do not show out of usage page', function() {
				$.mockjaxClear();
				$.mockjax({
					url : '*/usage/details',
					responseTime : 3000,
					contentType : 'text/json',
					status : 500
				});
				$.mockjax({
					url : '*/usage/summary',
					responseTime : 3000,
					contentType : 'text/json',
					status : 500
				});

				runs(function() {
					$("#usageDetailsEndDateCal").triggerHandler('tap');
				});
				waits(500);

				runs(function() {
					$(".default.dw-modal.dw-date .dwbw.dwb-s .dwb").triggerHandler('tap');
				});
				waits(350);

				runs(function() {
					application.gotoPage('morePage');
				});
				waits(4000);

				runs(function() {
					expect($('#zAlert')).not.toBeVisible();
				});

				runs(function() {
					application.gotoPage('usagePage');
				});
				waits(1000);

				runs(function() {
					application.gotoPage('morePage');
				});
				waits(4000);

				runs(function() {
					expect($('#zAlert')).not.toBeVisible();
				});
			});

			it('Tap to retry button appears', function() {
				$.mockjaxClear();
				$.mockjax({
					url : '*/usage/summary',
					responseTime : 100,
					contentType : 'text/json',
					responseText : JSON.stringify(usageSummaryResponse1)
				});
				$.mockjax({
					url : '*/usage/details',
					responseTime : 1000,
					contentType : 'text/json',
					isTimeout: true
				});

				application.gotoPage('usagePage');
				
				waits(500);
				
				runs(function() {
					expect($('#homePage')).toBeHidden();
					expect($('#usagePage')).toBeVisible();
				});
				
				waits(1500);

				runs(function() {
					$('#zAlert .bleft').triggerHandler('tap');
				});

				waits(500);

				runs(function() {
					expect($("#i18n_retryToLoadUsageDetailsButton")).toExist();
					callPhantom({cmd : 'capture', name:'usage-14'});
				});
			});

			it('Tap to retry button works', function() {
				$.mockjaxClear();
				$.mockjax({
					url : '*/usage/summary',
					responseTime : 100,
					contentType : 'text/json',
					responseText : JSON.stringify(usageSummaryResponse1)
				});
				$.mockjax({
					url : '*/usage/details',
					responseTime : 1000,
					contentType : 'text/json',
					responseText : JSON.stringify(usageDetailsResponse1)
				});
				
				$("#i18n_retryToLoadUsageDetailsButton").triggerHandler("tap");
				waits(1050);
				
				runs(function() {
					expect($('#usageDetailsResultContent tr')).toHaveLength(usageDetailsResponse1.usageDetails.length);
				});
			});
		});
