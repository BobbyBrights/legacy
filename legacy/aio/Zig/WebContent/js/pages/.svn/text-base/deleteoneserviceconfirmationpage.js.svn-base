(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
//			var $fastClickedElements = $("#deleteOneServiceConfirmationPage .blue-button");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

		},

		onShow : function(options) {
			var currentLine = this.application.getCurrentLine();

			this.summary = options.summary;

			if(currentLine && this.application.isCurrentAccountMultiLine()){
				this.$element.find(".phone-number").html((currentLine.isTablet ? "Tablet" : "Phone")+" "+this.application.displayPhoneNumber(currentLine.ctn)).show().attr("aria-hidden", "false");
			}
			else {
				this.$element.find(".phone-number").hide().attr("aria-hidden", "true").empty();
			}
			
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
				self.application.unBlockUI();
			};

			$('#deleteOneServiceConfirmationRecContainer').hide().attr("aria-hidden", "true");
			$('#deleteOneServiceConfirmationRecServicesContainer').empty();
			
			self.application.connector.submitChangeServices(this.summary, done, done);
		},

		onRefresh : function() {
			if (!this.isVisible)
				return;

			// Multiline : phone number
			var currentLine = this.application.getCurrentLine();
			
			if(currentLine) {
				$('#servicesReviewRemovedContainer').find('.phone-number').html((currentLine.isTablet ? 'Tablet' : 'Phone') + ' ' + self.application.displayPhoneNumber(currentLine.ctn)).show().attr("aria-hiden", "false");
			}
			else {
				$('#servicesReviewRemovedContainer').find('.phone-number').hide().attr("aria-hiden", "true").empty();
			}
			
			// Services list
			var removedServices = this.summary.removedServices;
			if (removedServices.length > 0) {
				var removedServicesObjects = this.summary.removedServicesObjects;
				$('#deleteOneServiceConfirmationRecContainer').show().attr("aria-hidden", "false");

				$.each(removedServicesObjects, function(index, removed) {
					var serviceName = $('<div/>').addClass('plan-name').text(removed.serviceName);
					var listItem = $('<div/>').append(serviceName);
					$('#deleteOneServiceConfirmationRecServicesContainer').append(listItem);
				});
			} else {
				$('#deleteOneServiceConfirmationRecContainer').hide().attr("aria-hidden", "true");
			}
		}
	};

	Pages.DeleteOneServiceConfirmationPage = MVC.Page.extend(methods);

})($, MVC);
