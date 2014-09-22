(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};

	var methods = {
		_extendReducePlan : function($title) {
			if ($title.hasClass('reduced')) {
				$title.removeClass('reduced');
				$title.addClass('extended');
				$title.find("*[aria-expanded]").attr("aria-expanded", "true");
				$title.siblings().first().show().attr("aria-hidden", "false");
			} else {
				$title.removeClass('extended');
				$title.addClass('reduced');
				$title.find("*[aria-expanded]").attr("aria-expanded", "false");
				$title.siblings().first().hide().attr("aria-hidden", "true");
			}
		},

		_createPlanItem : function(id, target, name, desc, value, services) {
			var self = this;
			var item = $('<div class="title extended pointfill" id="' + id + '"></div>');

			item.append($('<div class="plan-name large" role="button" aria-expanded="true">' + (name || "Unknown") + '</div>'));
			item.append($('<div class="point-separator" aria-hidden="true"></div>'));
			item.append($('<div class="value large" role="button" aria-expanded="true">$' + parseFloat(value).toFixed(2) + "</div>"));

			var expendablePart = $('<div aria-hidden="false"></div>');
			var myPlanDesc = $('<div class="plan-desc text medium">' + self.application.linkURLs(desc || "") + "</div>");
			myPlanDesc.find("a").tap(function(e) {
				e.preventDefault();
				deviceapis.open(this.href);
			});
			var servicesList = $('<ul class="services-list x-small"></ul>');
			$.each(services, function(index, value) {
				servicesList.append('<li class="text">' + self.application.linkURLs(value) + "</li>");
			});
			expendablePart.append(myPlanDesc);
			expendablePart.append(servicesList);

			var $target = $('#' + target); 
			$target.append(item);
			$target.append(expendablePart);

			var $id = $('#' + id); 
			
//			new FastClick($id[0]);
			
			$id.tap(function() {
				self._extendReducePlan($id);
			});
		},

		_createOtItem : function(id, serviceId, target, name, desc, value, number) {
			var self = this;
			// Create item container
			var item = $('<div></div>');
			// Create first line containing
			var titleAndPrice = $('<div class="title reduced pointfill" id="' + id + '"></div>');
			titleAndPrice.append($('<div class="plan-name large" role="button" aria-expanded="true">' + (name || "Unknown") + "</div>"));
			titleAndPrice.append($('<div class="point-separator" aria-hidden="true"></div>'));
			var occ = (number) ? '<span class="multiplicator">x' + number + '</span> ' : '';
			titleAndPrice.append($('<div class="value large" role="button" aria-expanded="true">' + (occ + '$' + parseFloat(value).toFixed(2)) + "</div>"));

			var itemDesc = $('<div class="plan-desc text medium" style="display: none" aria-hidden="true">' + self.application.linkURLs(desc || "") + "</div>");
			itemDesc.find("a").tap(function(e) {
				e.preventDefault();
				deviceapis.open(this.href);
			});

			item.append(titleAndPrice);
			item.append(itemDesc);

			$('#' + target).append(item);

			var $id = $('#' + id); 
			
//			new FastClick($id[0]);

			$id.tap(function() {
				self._extendReducePlan($id);
			});
		},

		_createRecItem : function(id, serviceId, target, name, desc, value) {
			var self = this, currentLine = this.application.getCurrentLine();
			// Create item container
			var item = $('<div></div>');
			// Create first line containing
			var titleAndPrice = $('<div class="title reduced pointfill" id="' + id + '"></div>');
			titleAndPrice.append($('<div class="plan-name large" role="button" aria-expanded="true">' + (name || "Unknown") + "</div>"));
			titleAndPrice.append($('<div class="point-separator" aria-hidden="true"></div>'));

			if(!self.isThereAPendingLine || currentLine.status == 'voluntarySuspend') {
				titleAndPrice.append('<div class="value large" role="button" aria-expanded="true">' + self.application.displayPrice(value) + '</div><div class="one-bar"><div class="toggle ui-shop-icon ui-minus" role="button" aria-label="Remove"></div></div>');
				titleAndPrice.find('.toggle').tap( function(event) {
					event.stopPropagation();
					// go to service review ! with only one removed item
					var summary = {
						addedServices : [],
						removedServices : [],
						removedServicesObjects : []
					};
					summary.removedServices.push({
						serviceId : serviceId
					});
					summary.removedServicesObjects.push({
						serviceId : serviceId,
						serviceName : name,
						serviceShortDescription : desc
					});
					self.application.gotoPage('servicesReviewPage', {
						summary : summary,
						fromPage : 'myPlanPage'
					});
				});
			}

			var itemDesc = $('<div class="plan-desc text medium" style="display: none" aria-hidden="true">'+ self.application.linkURLs(desc || "") + "</div>");
			itemDesc.find("a").tap(function(e) {
				e.preventDefault();
				deviceapis.open(this.href);
			});

			item.append(titleAndPrice);
			item.append(itemDesc);

			$('#' + target).append(item);
			

			var $id = $('#' + id); 
			
//			new FastClick($id[0]);

			$id.tap(function() {
				self._extendReducePlan($id);
			});
		},

		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			this.isLoading = false;
			this.innerPage = this.$element.find('.innerPage');
			this.homeModel = self.application.homePage.model.attr;
			this.isThereAPendingLine = undefined;
			
			$("#myPlanMultilineArrow").tap(function() {
				var $myPlanMultilineSelectNumber = $('#myPlanMultilineSelectNumber'); 
				
				if(self.application.model.isAndroid) {
					$myPlanMultilineSelectNumber.show();
					window.setTimeout(function() {
						application.showDropdown($myPlanMultilineSelectNumber[0]);
					}, 50);
				}
				else {
					$myPlanMultilineSelectNumber.focus();
				}
			});

			$('#myPlanMultilineSelectNumber').change(function() {
				var $that = $(this), $myPlanAccountInformation = $("#myPlanAccountInformation");
				
				self.application.connector.sessionModel.set({currentLine: $that.val()});
				
				var currentLine = self.application.getCurrentLine();
				
				if(currentLine){
					$that.removeClass("notValued");
					if (currentLine.status == "voluntarySuspend") {
						self.$element.find(".wp-button-container").hide();
						if($myPlanAccountInformation.find("span[data-i18n=MY_PLAN_LOST_OR_STOLEN_LINE_TEXT]").length == 0) {
							$myPlanAccountInformation.append('<span data-i18n="MY_PLAN_LOST_OR_STOLEN_LINE_TEXT">'+ $.i18n._('MY_PLAN_LOST_OR_STOLEN_LINE_TEXT') +'</span>');
							$myPlanAccountInformation.find("span[data-i18n=MY_PLAN_LOST_OR_STOLEN_LINE_TEXT] > a").tap(function(e) {
								self.application.showMsg("Line suspended", "Lorem ipsum dolor sit amet ...");
							});
							$myPlanAccountInformation.show();
						}
					}
					else {
						if(!self.isThereAPendingLine) {
							self.$element.find(".wp-button-container").show();
						}
						$myPlanAccountInformation.find("span[data-i18n=MY_PLAN_LOST_OR_STOLEN_LINE_TEXT]").remove();
					}
					self.fetch();
				} else {
					$that.addClass("notValued");
					$('#myPlanContainer').hide();
					$('#myPlanServicesContainer').hide();
					$myPlanAccountInformation.find("span[data-i18n=MY_PLAN_LOST_OR_STOLEN_LINE_TEXT]").remove();
				}
			});
		},

		onShow : function() {
			var $myPlanAccountInformation = $("#myPlanAccountInformation"); 
			
			this.isThereAPendingLine = false;
			$myPlanAccountInformation.hide().empty().removeAttr("data-i18n");
			
			var self = this, currentLine = this.application.getCurrentLine(), $myPlanMultilineSelectNumber = $('#myPlanMultilineSelectNumber');

			this.application.setNavLinkActive('#myPlanPage');
			
			$('#myPlanContainer').hide();
			$('#myPlanServicesContainer').hide();
			
			if(this.application.isCurrentAccountMultiLine()){
				$myPlanMultilineSelectNumber.append('<option role="option" value="">Select Phone Number</option>');
				$.each(self.homeModel.subscribers, function(){
					if(this.status != 'pendingActivation'){
						$myPlanMultilineSelectNumber.append('<option role="option" value="'+this.ctn+'">'+ (this.isTablet ? "Tablet" : "Phone") +': '+ self.application.displayPhoneNumber(this.ctn) +'</option>');
					}
					else {
						self.isThereAPendingLine = true;
					}
				});
				
				// pre-selection : only one choice
				if($('#myPlanMultilineSelectNumber option').length == 2){
					$('#myPlanMultilineSelectNumber').val($('#myPlanMultilineSelectNumber option').last().val()).trigger("change");
				}
				
				$myPlanAccountInformation.empty();
				
				if(self.isThereAPendingLine) {
					self.$element.find(".wp-button-conainer").hide();
					$myPlanAccountInformation.append('<span data-i18n="MY_PLAN_PENDING_LINE_TEXT">'+ $.i18n._('MY_PLAN_PENDING_LINE_TEXT') +'</span>');
					$myPlanAccountInformation.find("span[data-i18n=MY_PLAN_PENDING_LINE_TEXT] > a").tap(function(e) {
						self.application.showMsg("Line pending", "Lorem ipsum dolor sit amet ...");
					});
					$myPlanAccountInformation.show();
				}
				this.$element.find(".multiline").show();
			} else {
				this.$element.find(".multiline").hide();
			}
			
			if(currentLine){
				if(this.application.isCurrentAccountMultiLine()) {
					$myPlanMultilineSelectNumber.val(currentLine.ctn).triggerHandler("change");
				}
				else {
					this.fetch();
				}
			}
		},

		onHide : function() {
			$('#myPlanMultilineSelectNumber').empty();
		},
		
		/**
		 * Fetch the data from the remote server
		 */
		fetch : function() {
			var self = this;

			this.innerPage.css('visibility', 'hidden').attr("aria-hidden", "true");
			this.application.blockUI('Loading <span aria-hidden="true">...</span>');

			var done = function() {
				self.isLoading = false;
				$('#myPlanContainer').show();
				$('#myPlanServicesContainer').show();
				self.application.unBlockUI();
				self.innerPage.css('visibility', 'visible').attr("aria-hidden", "false");
			};

			var error = function() {
				self.isLoading = false;
				self.application.unBlockUI();
				self.innerPage.css('visibility', 'visible').attr("aria-hidden", "false");
			};
			
			this.isLoading = true;
			this.application.connector.getPlanAndServices(error, done);
		},

		onBack : function(event) {
			event.preventDefault();
			if (!this.isLoading) {
				this.application.gotoPage('homePage');
			}
		},

		onRefresh : function() {
			var json = this.model.attr;
			
			if(this.application.isCurrentAccountMultiLine()){
				if(self.application.selectedAccount == undefined){
					$('#myPlanContainer').hide();
					$('#myPlanServicesContainer').hide();
				} else {
					$('#myPlanContainer').show();
					$('#myPlanServicesContainer').show();
					$('#myPlanMultilineSelectNumber').val(self.application.selectedAccount);
				}
			}
			
			// Included my plan item
			$('#myPlanContainer').empty();
			this._createPlanItem("_myPlan", "myPlanContainer", json.plan.planName, json.plan.planDescription, json.plan.planMRC, json.includedServices);

			// Added on time services items
			$('#myPlanOTServicesContainer').empty();
			$('#myPlanRecServicesContainer').empty();
			var addedServices = json.addedServices;
			var nbItems = addedServices.length;
			var nbOtItems = 0;
			var nbRecItems = 0;

			for ( var i = 0; i < nbItems; i++) {
				if ("OT" == addedServices[i].typeIndicator) {
					this._createOtItem("_otService" + i, addedServices[i].serviceId, "myPlanOTServicesContainer", addedServices[i].serviceName, addedServices[i].serviceShortDescription,
							addedServices[i].amount, addedServices[i].numberOfInstances);
					nbOtItems++;
				} else if ("REC" == addedServices[i].typeIndicator) {
					this._createRecItem("_recService" + i, addedServices[i].serviceId, "myPlanRecServicesContainer", addedServices[i].serviceName, addedServices[i].serviceShortDescription,
							addedServices[i].amount);
					nbRecItems++;
				}
			}
			if (nbOtItems == 0) {
				$('#myPlanOTAddedServicesDesc').html("You have not selected any One-time services.");
			} else {
				$('#myPlanOTAddedServicesDesc').html("These services apply to your current monthly cycle.");
			}

			if (nbRecItems == 0) {
				$('#myPlanRecAddedServicesDesc').html("You have not selected any Monthly services.");
			} else {
				$('#myPlanRecAddedServicesDesc').html("These services apply to your current and future cycles.");
			}
		},
	};

	Pages.MyPlanPage = MVC.Page.extend(methods);

})($, MVC);
