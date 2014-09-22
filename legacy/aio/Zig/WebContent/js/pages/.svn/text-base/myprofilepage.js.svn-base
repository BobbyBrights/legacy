(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			this.contextualBack = 'morePage';

//			var $fastClickedElements = $("#myProfilePage").find(".back-button");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};
			
			this.$element.find('.back-button').tap(function() {
				self.application.gotoPage(self.contextualBack, {
					fromBack : true
				});
			});
			$('#editProfileButton').tap(function() {
				self.application.gotoPage('editProfilePage', {summary : self.model.attr});
			});
		},

		onShow : function(options) {
			// Set active state on navigation link and title
			self.application.setNavLinkActive('#morePage');
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

			self.application.connector.getProfileInformation(done, done);
		},

		onRefresh : function() {
			var json = this.model.attr, self = this;
			
			// Mandatories infos
			$('#profileInfoName').html(json.name);
			$('#profileInfoAccountId').html(json.accountId);
			var adress = "";
			if(json.address) {
				adress = json.address.poBoxNumber + " " + json.address.streetAddress + "\n" + json.address.city + ", " + json.address.state + " " + json.address.postalCode;
			}
			$('#profileInfoBillingAndShipping').html(adress.replace("undefined", ""));
			$('#profileInfoAccountStatus').html(json.accountStatus);
			
			$("#myProfilePage .deviceInfo").remove();
			// display all information about users account (multi or not)
			if(json.subscriberDetails) {
				$.each(json.subscriberDetails, function(i){
					var number = '';
					if(json.subscriberDetails.length > 1)
						number = i+1;
					var accountInfos = '<div class="profile-page-table deviceInfo">'+
					'<table>'+
						'<tr><td class="medium">Aio Number'+ number +':</td><td class="medium">'+this.ctn+'</td></tr>'+
						'<tr><td class="medium">Device:</td><td class="medium">'+this.device+'</td></tr>';
					if(this.deviceIMEI) {
						var splitedDeviceId = this.deviceIMEI.split(""), i = 0, j = 0, finalDeviceId = "";
						
						for(i = 0; i < splitedDeviceId.length; i += 5) {
							for(j = i; (j < i + 5 && j < splitedDeviceId.length); j++) {
								finalDeviceId += (splitedDeviceId[j]);
							}
							if(splitedDeviceId.length - 1 >= j) {
								finalDeviceId += "-";
							}
						}
						accountInfos+= '<tr><td class="medium">Device Id:</td><td class="medium">'+finalDeviceId+'</td></tr>';
					}
					accountInfos+= '</table></div>';
					$(accountInfos).insertBefore("#myProfilePage .multiline-insert-before");
				});
			}
			
			// Optionals infos
			if (json.nextBillDue){
				$('#profileInfoCycleRestart').html(moment(json.nextBillDue,["MM/DD/YYYY HH:mm:ss","MM/DD/YYYY","X"]).format("MMMM Do YYYY"));
				$('#profileInfoCycleRestart').show().attr("aria-hidden", "false");
			} else $('#profileInfoCycleRestart').hide().attr("aria-hidden", "true");
			if (json.homePhoneNumber) {
				$('#profileInfoHomePhone').html(self.application.displayPhoneNumber(json.homePhoneNumber));
				$('#profileInfoHomePhone').parent().show().attr("aria-hidden", "false");
			} else $('#profileInfoHomePhone').parent().hide().attr("aria-hidden", "true");
			if (json.businessPhoneNumber) {
				$('#profileInfoWorkPhone').html(self.application.displayPhoneNumber(json.businessPhoneNumber));
				$('#profileInfoWorkPhone').parent().show().attr("aria-hidden", "false");
			} else $('#profileInfoWorkPhone').parent().hide().attr("aria-hidden", "true");
			if (json.email) {
				$('#profileInfoEmail').html(json.email);
				$('#profileInfoEmail').parent().show().attr("aria-hidden", "false");
			} else $('#profileInfoEmail').parent().hide().attr("aria-hidden", "true");
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
	};

	Pages.MyProfilePage = MVC.Page.extend(methods);

})($, MVC);
