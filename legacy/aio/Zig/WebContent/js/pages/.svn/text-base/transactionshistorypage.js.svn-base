(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			this.isLoading = true;
			this.jqXHR = null;
			this.contextualBack = 'payMyBillPage';
			
//			var $fastClickedElements = $("#transactionsHistoryPage").find(".back-button");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};
			
			this.$element.find('.back-button').tap(function() {
				self.application.gotoPage(self.contextualBack, {
					fromBack : true
				});
			});
		},

		onShow : function(options) {
			this.fetch();
		},

		/**
		 * Fetch the data from the remote server
		 * 
		 * @param summary
		 *            is {addedServices: Array[3], removedServices: Array[0]}
		 */
		fetch : function(summary) {
			this.application.blockUI('Loading <span aria-hidden="true">...</span>');
			var done = function() {
				self.isLoading = false;
				self.application.unBlockUI();
			};
			self.isLoading = false;
			this.jqXHR = self.application.connector.getTransactionsHistory(done, done);
		},

		onRefresh : function() {
			var json = this.model.attr, self = this;

			$('#historyContainer').empty();
			var odd = true;

			$.each(json.transactionsHistory, function(index, value) {
				var oddClass = odd ? "odd" : "even";
				var line1date = $('<td/>').addClass('transactions-history-date').append(moment(value.dateAndTime,["MM/DD/YYYY","MM/DD/YYYY HH:mm:ss","X"]).format("MM/DD/YYYY"));
				var line1amount = $('<td/>').addClass('transactions-history-amount').append(self.application.displayPrice(value.amount));
				var line1balance = $('<td/>').addClass('transactions-history-balance').append(self.application.displayPrice(value.balance));
				
				
				// CATO fix : Talkback is not able to read "zero dollar" ...
				if(self.application.model.isAndroid) {				
					if(parseFloat(value.amount) == 0) {
						line1amount.attr("aria-labelledby", "zeroDollar");
					}
					if(parseFloat(value.balance) == 0) {
						line1balance.attr("aria-labelledby", "zeroDollar");
					}
				}

				var line1 = $('<tr/>').addClass('dateLine').addClass(oddClass).append(line1date).append(line1amount).append(line1balance);

				var line2desc = $('<td/>').attr('colspan','3').addClass('transactions-history-description').append(value.description);
				var line2 = $('<tr/>').addClass('descLine').addClass(oddClass).append(line2desc);

				$('#historyContainer').append(line1).append(line2);
				odd = !odd;
			});
			
			if(json.transactionsHistory.length === 0){
				var lineEmptyTd = $('<td/>').attr('colspan','3').addClass('transactions-history-description empty').append("No transaction");
				var lineEmpty = $('<tr/>').addClass('descLine odd empty').append(lineEmptyTd);

				$('#historyContainer').append(lineEmpty);
				odd = !odd;
			}
		},
		
		onBack : function (event){
			event.preventDefault();
			if(this.isLoading) {
				this.application.unBlockUI();
				if(this.jqXHR && this.jqXHR.abort){
					this.jqXHR.abort();
				}
			}
			this.application.gotoPage(this.contextualBack);
		}

	// privates

	};

	Pages.TransactionsHistoryPage = MVC.Page.extend(methods);

})($, MVC);
