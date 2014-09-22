(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};
	var addRemoveBar = '<div class="plus-minus-bar"><div><div class="ui-plus ui-shop-icon" role="button" aria-label="Add"></div><div class="ui-minus ui-shop-icon" role="button" aria-label="Remove"></div></div></div>';
	var pointerStart = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'mousedown';
	var quantityAttrName = "numberOfInstances";//"quantity"
	
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

		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			this.isLoading = false;
			// Set active state on navigation link and title
			this.application.setNavLinkActive('#myPlanPage');
			this.innerPage = this.$element.find('.innerPage');
			
			this.summaryModel = new MVC.Model();
			this.summaryModel.bind(this.refreshSummaryPane, this);
			this.summaryModel.set({
				addedServices : [],
				removedServices : [],
				removedServicesObjects : []
			});
			this.$element.find('.back-button').bind(pointerStart,function(){
//				location.hash = 'ns-myPlanPage';
				self.application.gotoPage('myPlanPage');
				return false;
			});
			$('#i18n_manageServicesClearButton').bind(pointerStart,function(){
				self.summaryModel.set({
					addedServices : [],
					removedServices : [],
					removedServicesObjects : []
				});
				$('#i18n_manageServicesButton').addClass('disabled').attr("aria-disabled", "true");
				self.onRefresh();
				return false;
			});
			/*$('#i18n_manageServicesButton').bind(pointerStart, function() {
				if (!$('#i18n_manageServicesButton').hasClass('disabled')){
					self.application.gotoPage('servicesReviewPage', {summary : self.summaryModel.attr});
				}
				return false;
			});*/
			$('#i18n_manageServicesButton').tap(function() {
				if (!$('#i18n_manageServicesButton').hasClass('disabled')){
					self.application.gotoPage('servicesReviewPage', {summary : self.summaryModel.attr});
				}
				return false;
			});
		},

		fetch : function() {
			this.application.blockUI('Loading <span aria-hidden="true">...</span>');
			this.innerPage.css('visibility', 'hidden').attr("aria-hidden", "true");
			
			var done = function() {
				this.isLoading = false;
				this.application.unBlockUI();
			};
			
			this.isLoading = true;
			this.application.connector.getAvailableServices(done.bind(this), done.bind(this));
		},

		onShow : function(options) {
			var currentLine = this.application.getCurrentLine();
			
			this.innerPage.css('visibility', 'hidden').attr("aria-hidden", "true");
			
			if(!options || !options.fromBack ){
				this.summaryModel.set({
					addedServices : [],
					removedServices : [],
					removedServicesObjects : []
				});
			}
			
			if(currentLine && this.application.isCurrentAccountMultiLine()){
				this.$element.find(".phone-number").html((currentLine.isTablet ? "Tablet" : "Phone")+" "+this.application.displayPhoneNumber(currentLine.ctn)).show().attr("aria-hidden", "false");
			}
			else {
				this.$element.find(".phone-number").hide().attr("aria-hidden", "true").empty();
			}

			this.fetch();
		},
		
		onBack : function(event){
			event.preventDefault();
			this.application.unBlockUI();
			this.application.gotoPage('myPlanPage');
		},
				
		onRefresh : function() {
			var json = this.model.attr, self = this;
			var $manageServicesOTServices = $('#manageServicesOTServices'); 
			var $manageServicesRecServices = $('#manageServicesRecServices'); 
			
			$manageServicesOTServices.html('<li id="i18n_manageServicesOneTimeAddon" class="list-header first-item page-subtitle" data-i18n="MANAGE_SERVICES_ONE_TIME_ADDON">'+ $.i18n._('MANAGE_SERVICES_ONE_TIME_ADDON') +'</li>');
			$manageServicesOTServices.append('<li id="shopOTAddedServicesDesc" class="plan-desc small" data-i18n="MANAGE_SERVICES_ONE_TIME_ADDON_DESCRIPTION">' + $.i18n._('MANAGE_SERVICES_ONE_TIME_ADDON_DESCRIPTION') + '</li>');
			$manageServicesRecServices.html('<li id="i18n_manageServicesRecurringAddon" class="list-header first-item page-subtitle" data-i18n="MANAGE_SERVICES_RECURRING_ADDON">'+ $.i18n._('MANAGE_SERVICES_RECURRING_ADDON') + '</li>');
			$manageServicesRecServices.append('<li id="shopRECAddedServicesDesc" class="plan-desc small" data-i18n="MANAGE_SERVICES_RECURRING_ADDON_DESCRIPTION">' + $.i18n._('MANAGE_SERVICES_RECURRING_ADDON_DESCRIPTION') + '</li>');

			var nbOT = 0;
			var nbREC = 0;
			if (json.availableServices) {
				$.each(json.availableServices, function(index, value) {
					if (value.typeIndicator === "OT") {
						var listItem = self._createOneTimeService(value);
						//update quantity if coming from back
						var _ad = self._getAddedService(value.serviceId, false);
						if(_ad){
							listItem.find('.multiplicator').text('x' + _ad[quantityAttrName] + ' ');
						}
						$manageServicesOTServices.append(listItem);
						//new FastClick(listItem.find('.title')[0]);
						nbOT++;
					}
					else if (value.typeIndicator === "REC") {
						var listItem = self._createRecService(value);
						var _ad = self._getAddedService(value.serviceId, false);
						if(_ad) {
							//update state if coming from back
							//listItem.find('.multiplicator').text(' x ' + _ad[quantityAttrName]);
							var toggle = listItem.find('.toggle');
							toggle.removeClass('ui-plus');
							toggle.addClass('ui-minus');
							toggle.attr("aria-label", "Add");
						}
						$manageServicesRecServices.append(listItem);
						//new FastClick(listItem.find('.title')[0]);
						nbREC++;
					}
				});
			}
			

			if (nbOT == 0){
				$('#shopOTAddedServicesDesc').html("No One-time services available.");
			} else {
				$('#shopOTAddedServicesDesc').html($.i18n._('MANAGE_SERVICES_ONE_TIME_ADDON_DESCRIPTION')).attr("data-i18n", "MANAGE_SERVICES_ONE_TIME_ADDON_DESCRIPTION");
			}
			
			
			if (nbREC == 0){
				$('#shopRECAddedServicesDesc').html("No Monthly services available.");
			} else {
				$('#shopRECAddedServicesDesc').html($.i18n._('MANAGE_SERVICES_RECURRING_ADDON_DESCRIPTION')).attr("data-i18n", "MANAGE_SERVICES_RECURRING_ADDON_DESCRIPTION");
			}
			
			if(self.summaryModel.get('addedServices').length === 0){
				$('#i18n_manageServicesButton').addClass('disabled').attr("aria-disabled", "true");
			}
			
			self.innerPage.css('visibility', 'visible').attr("aria-hidden", "false");
		},


		refreshSummaryPane : function(){
			var total = 0;
			//reset all toggles
			this.$element.find('.toggle').removeClass('ui-minus').addClass('ui-plus').attr("aria-label", "Add");
			var added = this.summaryModel.get('addedServices');
			for (var i = 0, j = added.length; i < j; i++) {
				var oAdded = added[i];
				var oService = this._getServiceFromId(oAdded.serviceId);
				total += parseFloat(oService.amount) * oAdded[quantityAttrName];
				var $item = this.$element.find("div[data-id='" + oAdded.serviceId + "']");
				if($item.attr('data-type') === "REC") {
					var toggle = $item.find('.toggle');
					toggle.removeClass('ui-plus');
					toggle.addClass('ui-minus');
					toggle.attr("aria-label", "Remove");
				} else if($item.attr('data-type') === "OT") {
					$item.find('.multiplicator').text('x' + oAdded[quantityAttrName] + ' ');
				}
			}
			var $totalValue = this.$element.find('.summary-total-text span.total-value'); 
			$totalValue.text('$' +parseFloat(total).toFixed(2));
			
			// CATO fix : Talkback is not able to read "zero dollar" ...
			if(self.application.model.isAndroid) {
				if(parseFloat(total) == 0) {
					$totalValue.attr("aria-labelledby", "zeroDollar");
				}
				else {
					$totalValue.removeAttr("aria-labelledby");
				}
			}
		},
		
		/*
		 * Try to get the service of id 'sid' from the added service list.
		 * If Service is not found and 'addIfnotfound' is true, then
		 * the service will be added with a quantity equal to 0.
		 */
		_getAddedService : function(sid, addIfnotfound) {
			var added = this.summaryModel.get('addedServices');
			for (i = 0, j = added.length; i < j; i++) {
				if (added[i].serviceId === sid) {
					return added[i];
				}
			}
			if (addIfnotfound) {
				// not found so add it
				var newItem = {serviceId : sid, numberOfInstances : 0};
				added.push(newItem);
				
				return newItem;
			}
			return null;
		},
		

		_incrementOT : function(sid) {
			var self = this;
			if(self.summaryModel.get('addedServices').length == 0){
				$('#i18n_manageServicesButton').removeClass('disabled').attr("aria-disabled", "false");
			}
			
			var $item = this.$element.find("div[data-id='" + sid + "']");
			var added = this._getAddedService(sid, true);
			if (added != null) {
				added[quantityAttrName]++;
				// update item
				$item.find('.multiplicator').text('x' + added[quantityAttrName] + ' ');
			}
			this.summaryModel.notifyAll();
		},

		_toggleREC : function(sid) {
			var self = this;
			var $item = this.$element.find("div[data-id='" + sid + "']");
			var toggle = $item.find('.toggle');

			if (toggle.hasClass('ui-minus')) {
				var added = this._getAddedService(sid, false);
				toggle.removeClass('ui-minus');
				toggle.addClass('ui-plus');
				toggle.attr("aria-label", "Add");
				//remove from added
				this.summaryModel.get('addedServices').splice(this.summaryModel.get('addedServices').indexOf(added), 1);

				if(this.summaryModel.get('addedServices').length == 0){
					$('#i18n_manageServicesButton').addClass('disabled').attr("aria-disabled", "true");
				}
				
			} else {
				if(self.summaryModel.get('addedServices').length == 0){
					$('#i18n_manageServicesButton').removeClass('disabled').attr("aria-disabled", "false");
				}
				
				toggle.removeClass('ui-plus');
				toggle.addClass('ui-minus');
				toggle.attr("aria-label", "Remove");
				var added =this._getAddedService(sid, true);
				added[quantityAttrName] = 1;
			}
			this.summaryModel.notifyAll();
		},

		_decrementOT : function(sid) {
			var $item = this.$element.find("div[data-id='" + sid + "']");
			var added = this._getAddedService(sid, false);
			if (added != null) {
				added[quantityAttrName]--;
				// update item
				$item.find('.multiplicator').text('x' + added[quantityAttrName]+ ' ');
				if (added[quantityAttrName] === 0) {
					this.summaryModel.get('addedServices').splice(this.summaryModel.get('addedServices').indexOf(added), 1);
				}
			};

			if(this.summaryModel.get('addedServices').length == 0){
				$('#i18n_manageServicesButton').addClass('disabled').attr("aria-disabled", "true");
			}
			this.summaryModel.notifyAll();
		},
		/*
		 * oService : { "serviceId":"30", "serviceName":"Service 0",
		 * "serviceShortDescription":"Short description of Service 0",
		 * "amount":"10.00", "typeIndicator":"OT", }
		 */
		_createOneTimeService : function(oService) {
			var self = this;
			/*
			 * <div id="planId2" class="title reduced pointfill"> <div
			 * class="plan-name">International Calls</div> <div
			 * class="point-separator"></div> <div class="value">$15</div>
			 * </div> <div class="expandable"> <div style="display: none;" aria-hidden="true">desc</div>
			 * <div style="display: none;" aria-hidden="true">list</div> </div>
			 */
			var $parent = $('<li></li>');
			var $header = $('<div data-id="' + oService.serviceId + '" data-type="OT" class="title reduced pointfill"></div>');
			$header.append('<div class="plan-name large" role="button" aria-expanded="false">' + oService.serviceName + '</div>');
			$header.append('<div class="point-separator"></div>');

			$header.append('<div class="value large"><span class="multiplicator small">x0 </span><span>$' + parseFloat(oService.amount).toFixed(2) + '</span> </div>' + addRemoveBar + ' ');
			$parent.append($header);
			
//			new FastClick($header[0]);
			
//			var qtyButtonsEventName = self.application.model.isIos ? "touchstart" : "click";
			
			$header.find('.ui-plus').tap(function(event) {
				event.stopPropagation();
				self._incrementOT(oService.serviceId);
				return false;
			});
			$header.find('.ui-minus').tap(function(event) {
				event.stopPropagation();
				self._decrementOT(oService.serviceId);
				return false;
			});
			
//			if(self.application.model.isIos) {
//				$header.find('.ui-minus, .ui-plus').bind('mousedown touchstart click', function(event) {
//					event.stopPropagation();
//					return false;
//				});
//			}

			$header.find('.value').bind('mousedown touchstart click tap', function(event) {
				event.stopPropagation();
			});
			$header.find('.point-separator').bind('mousedown touchstart click tap', function(event) {
				event.stopPropagation();
			});

			var $expandable = $('<div class="expandable" style="display: none" aria-hidden="true"></div>');
			var desc = (!oService.serviceShortDescription || oService.serviceShortDescription=="" || oService.serviceShortDescription==null || oService.serviceShortDescription=="null")? "":oService.serviceShortDescription;
			$expandable.append('<div class="plan-desc text medium">' + self.application.linkURLs(desc) + '</div>');
			$expandable.find("a").tap(function(e) {
				e.preventDefault();
				deviceapis.open(this.href);
			});
			$parent.append($expandable);
			$header.tap(function() {
				self._extendReducePlan($header);
				return false;
			});
			
			return $parent;
		},

		_createRecService : function(oService, installed) {
			var $parent = $('<li></li>'), self = this;
			var $header = $('<div data-id="' + oService.serviceId + '" data-type="REC" class="title reduced pointfill"></div>');
			$header.append('<div class="plan-name large" role="button" aria-expanded="false">' + oService.serviceName + '</div>');
			$header.append('<div class="point-separator"></div>');
			var currentState = ((installed) ? 'ui-minus' : 'ui-plus');
			var buttonLabel = ((installed) ? 'Remove' : 'Add');
			var toggleBar = '<div class="plus-minus-bar"><div><div class="toggle ui-shop-icon '+ currentState +'" role="button" aria-label="'+ buttonLabel +'"></div></div></div>';

			$header.append('<div class="value large">$' + parseFloat(oService.amount).toFixed(2) + '</div>' + toggleBar + '</div> ');
			$parent.append($header);

//			new FastClick($header[0]);
			
//			var qtyButtonsEventName = self.application.model.isIos ? "touchstart" : "click";
			
			$header.find('.plus-minus-bar > div').tap( function(event) {
				self._toggleREC(oService.serviceId);
			});
			$header.find('.plus-minus-bar').bind('click touchstart mousedown tap', function(event) {
				event.stopPropagation();
				return false;
			});
			
//			if(self.application.model.isIos) {
//				$header.find('.plus-minus-bar > div').bind('click touchstart mousedown', function(event) {
//					event.stopPropagation();
//					return false;
//				});
//			}

			$header.find('.value').bind('mousedown touchstart click tap', function(event) {
				event.stopPropagation();
			});
			$header.find('.point-separator').bind('mousedown touchstart click tap', function(event) {
				event.stopPropagation();
			});

			var $expandable = $('<div class="expandable" style="display: none" aria-hidden="true"></div>');
			var desc = (oService.serviceShortDescription=="" || oService.serviceShortDescription==null || oService.serviceShortDescription=="null")? "":oService.serviceShortDescription;
			$expandable.append('<div class="plan-desc text medium">' + self.application.linkURLs(desc) + '</div>');
			$expandable.find("a").tap(function(e) {
				e.preventDefault();
				deviceapis.open(this.href);
			});
			$parent.append($expandable);
			$header.tap(function() {
				self._extendReducePlan($header);
				return false;
			});

			return $parent;
		},
		
		// privates

		_getServiceFromId : function(sid) {
			var availableServices = this.application.connector.shopServicesModel.get('availableServices');
			for (i = 0, j = availableServices.length; i < j; i++) {
				if (availableServices[i].serviceId === sid) {
					return availableServices[i];
				}
			}
		}
	};

	Pages.ShopServicesPage = MVC.Page.extend(methods);

})($, MVC);
