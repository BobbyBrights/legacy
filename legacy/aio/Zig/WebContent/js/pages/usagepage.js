(function($, MVC) {

	var Pages = window.Pages = window.Pages || {};

	var methods = {
		setApplication : function(application) {
			this.application = application;
		},

		onInit : function() {
			var self = this;
			this.isLoading = false;
			this.isLoadingDetail = false;
			this.isCanceledDetailed = false;
			this.jqXHR = false;
			this.detailsDates = [ {} ];
			this.dateSelected = 0;

//			var $fastClickedElements = $("#i18n_usageBackToTopButton");
//			for(var i=0; i<$fastClickedElements.length; i++) {
//				new FastClick($fastClickedElements[i]);
//			};

			$('#i18n_usageLearnMore').tap(function() {
				self.application.gotoPage("aboutUsagePage", {
					userDataTotalAllowance : self.userDataTotalAllowance
				});
			});

			$("#usageDetailsSelectArrow").tap(function() {
				if(self.application.model.isAndroid) {
					$('#usageDetailsSelect').show();
					window.setTimeout(function() {
						application.showDropdown($('#usageDetailsSelect')[0]);
					}, 50);
				}
				else {
					$('#usageDetailsSelect').focus();
				}
			});
			
			$('#usageDetailsSelect').on('change', function() { 
				self._onSelectChange();
			});

			$('#i18n_usageBackToTopButton').tap(function() {
				if (self.application.android_le) {
					window.scrollTo(0, 0);
				} else {
					$('body,html').animate({
						scrollTop : 0
					}, 400);
				}
				return false;
			});

			if(!self.application.model.isWinPhone && !self.application.android_le) {
				self.application.setupLabelledDropdown($("#usageDetailsSelect"));
			}

			self.application.initKeyboardListeners(this.$element.find('.vb'));
		},

		onHide : function() {
			if (self.isLoadingDetail) {
				self.isCanceledDetailed = true;
				if (this.jqXHR && this.jqXHR.abort) {
					this.jqXHR.abort();
				}
				$("#usageDetailsResultContent").html('<tr><td colspan="3" class="centered text">Please select a date range to see usage details</td></tr>');
			}
		},
		
		_showUsageContainers : function(option) {
			if(option){
				$('#usagePageForm').show().css('visibility', 'visible');
				$('#usageDetailsResultContent').show().css('visibility', 'visible');
				$('#monthlyUsageContent').show().css('visibility', 'visible');
				$('#usagePage .button-bar').show().css('visibility', 'visible');
				$('#usageMessage').show().css('visibility', 'visible');
				$('#usageSelectorInfo').hide();
			} else {
				$('#usagePageForm').hide().css('visibility', 'hidden');
				$('#usageDetailsResultContent').hide().css('visibility', 'hidden');
				$('#monthlyUsageContent').hide().css('visibility', 'hidden');
				$('#usagePage .button-bar').hide().css('visibility', 'hidden');
				$('#usageMessage').hide().css('visibility', 'hidden');
			}
		},

		onShow : function(options) {
			var self = this;
			this.application.setNavLinkActive('#usagePage');
			this.detailsDates = [ {} ];
			$('#usageDetailsSelect').empty();
			
			// Multiline case
			var homeModel = self.application.homePage.model.attr;
			if(homeModel.subscribers.length > 1){
				// Update the select box
				// delete before all previous datas
				$.each($('#usageMultilineSelectNumber option'), function(id, item){
					if(id > 0){
						$(item).remove();
					}
				});
				// populate the select box
				$.each(homeModel.subscribers, function(){
					if(this.status != 'pendingActivation')
						$('#usageMultilineSelectNumber').append('<option role="option" value="'+this.ctn+'">'+ (this.isTablet ? "Tablet" : "Phone") +': '+ self.application.displayPhoneNumber(this.ctn) +'</option>');
				});
				// activate refresh on change
				$('#usageMultilineSelectNumber').change(function() {
					self.application.connector.sessionModel.set({currentLine: $('#usageMultilineSelectNumber').val()});
					if($('#usageMultilineSelectNumber').val() == ''){
						self._showUsageContainers(false);
					} else {
						self._showUsageContainers(true);
						self.fetch();
					}
				});
				// pre-selection : only one choice
				if($('#usageMultilineSelectNumber option').length == 2){
					self.application.connector.sessionModel.set({'currentLine' : $('#usageMultilineSelectNumber option').last().val()});
					$('#usageMultilineSelectNumber').val(self.application.connector.sessionModel.get('currentLine'));
				}
				// pre-selection : outside the screen or refresh
				if(self.application.connector.sessionModel.get('currentLine')){
					$('#usageMultilineSelectNumber').val(self.application.connector.sessionModel.get('currentLine'));
				}
				
				$("#usagePage .multiline").show();
			} 
			
			if(self.application.homePage.model.attr.subscribers.length == 1 || $('#usageMultilineSelectNumber').val() != ''){
				self.fetch();
				self._showUsageContainers(true);
			} else {
				self._showUsageContainers(false);
			}
			// clear details ?
			$("#usageDetailsResultContent").html('<tr><td colspan="3" class="centered text">Please select a date range to see usage details</td></tr>');
		},

		fetch : function() {
			var self = this;
			this.application.blockUI('Loading <span aria-hidden="true">...</span>');
			var done = function() {
				self.isLoading = false;
				self.application.unBlockUI();

				var billCycleDate = self.application.connector.homeModel.get('billCycleDate');
				var annivDate = moment(self.application.connector.homeModel.get('anniversaryDate'), [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]);
				var currentBillStart = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('months', 1);

				self.detailsDates[0].end = "Today";
				if (currentBillStart.isBefore(annivDate)) {
					currentBillStart = annivDate;
					self.detailsDates[0].start = currentBillStart;

				} else {
					self.detailsDates[0].start = currentBillStart;
					var done = false;

					for ( var i = 1; i < 3 && !done; i++) {
						var previousBillStart = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('months', i + 1);
						var previousBillEnd = moment(billCycleDate, [ "MM/DD/YYYY", "MM/DD/YYYY HH:mm:ss", "X" ]).subtract('months', i).subtract('days', 1);

						if (previousBillEnd.isBefore(annivDate)) {
							done = true;
						} else if (previousBillStart.isBefore(annivDate)) {
							self.detailsDates[i] = {};
							self.detailsDates[i].start = annivDate;
							self.detailsDates[i].end = previousBillEnd;
							done = true;
						} else {
							self.detailsDates[i] = {};
							self.detailsDates[i].start = previousBillStart;
							self.detailsDates[i].end = previousBillEnd;
						}
					}
				}

				var dateFormat = 'MM/DD/YYYY';

				$('#usageDetailsSelect').empty();
				var $usageDetailsSelect = $('#usageDetailsSelect'); 
				for ( var i = 0; i < self.detailsDates.length; i++) {
					$usageDetailsSelect.append('<option role="option" value="' + i + '"'+ ((self.dateSelected == i)? 'selected':'') +'>' + (self.detailsDates[i].end.format ? self.detailsDates[i].end.format(dateFormat) : self.detailsDates[i].end) + " - " + self.detailsDates[i].start.format(dateFormat) + '</option>');
				}
				// Get the details for this range
				self._onSelectChange();
			};
			var error = function(jsonOrXHR) {
				if (self.isVisible) {
					$(window).scrollTop(0);
					self.isLoading = false;
					self.application.unBlockUI();

					if (jsonOrXHR.status && jsonOrXHR.status == 'failure') {
						self.application.connector.manageErrorCases(jsonOrXHR.messages, "GET USAGE DETAILS");
					} else {
						var onOk = function() {
							self.fetch();
						};
						var onCancel = function() {
							if (self.application.isWP8) {
								self.$element.addClass('failed_to_load');
							} else {
								self.application.gotoPage('homePage');
							}
						};
						var options = {
							buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]
						};
						self.application.connector.genericNetErrorHandling(jsonOrXHR, arguments[1], arguments[2], options);
					}
				}
			};
			self.isLoading = true;
			self.application.connector.getUsageSummary(done, error);
		},

		_onSelectChange : function() {
			var self = this;
			var $usageDetailsResultContent = $("#usageDetailsResultContent");
			var $usageDetailsSelect = $("#usageDetailsSelect");
			self.dateSelected = $usageDetailsSelect.val();
			this.$element.find('.button-bar').hide().attr("aria-hidden", "true");
			var success = function(json) {
				self.isLoadingDetail = false;
				self._onRefreshDetails(json);
			};
			var error = function(jsonOrXHR) {
				if (self.isVisible) {
					$(window).scrollTop(0);
					self.isLoadingDetail = false;

					if (jsonOrXHR.status && jsonOrXHR.status == 'failure') {
						self.application.connector.manageErrorCases(jsonOrXHR.messages, "GET USAGE DETAILS");
						$usageDetailsResultContent.html('<tr><td colspan="3" class="centered text">Please select a date range to see usage details</td></tr>');
					} else {
						var onOk = function() {
							self._onSelectChange();
						};
						var onCancel = function() {
							$usageDetailsResultContent.html('<div class="button-bar"><a class="large-button dark-grey-button" id="i18n_retryToLoadUsageDetailsButton">Tap to retry</a></div>');
							$("#i18n_retryToLoadUsageDetailsButton").tap(function(e) {
								e.preventDefault();
								self._onSelectChange();
							});
							self.$element.find(".button-bar").hide().attr("aria-hidden", "true");
						};
						$usageDetailsResultContent.find(".button-bar").show().attr("aria-hidden", "false");
						var options = {
							buttons: [{label: "Retry", callback: onOk}, {label: "Abort", callback: onCancel}]
						};
						self.application.connector.genericNetErrorHandling(jsonOrXHR, arguments[1], arguments[2], options);
					}
				}
			};

			self.isLoadingDetail = true;
			self.isCanceledDetailed = false;
			$usageDetailsResultContent.html('<tr><td colspan="3" class="centered loading"><img src="img/Zig_Spinner_GIF.gif" alt="loading"/></td></tr>');

			var detailsRange = this.detailsDates[$usageDetailsSelect.val()];
			var endRange = detailsRange.end.format ? detailsRange.end.format("MM/DD/YYYY") : moment().format("MM/DD/YYYY");
			self.application.connector.getUsageDetails(detailsRange.start.format("MM/DD/YYYY"), endRange, success, error);
			if(!self.application.model.isWinPhone && !self.application.android_le) {
				var currentText = $usageDetailsSelect.children("option:eq("+$usageDetailsSelect[0].selectedIndex+")").text();
				$usageDetailsSelect.prev(".select-label").text(currentText).attr("aria-label", currentText);
			}
		},

		onBack : function(event) {
			event.preventDefault();

			if (self.isLoadingDetail) {
				self.isCanceledDetailed = true;
				if (this.jqXHR && this.jqXHR.abort) {
					this.jqXHR.abort();
				}
				$("#usageDetailsResultContent").html('<tr><td colspan="3" class="centered text">Please select a date range to see usage details</td></tr>');
			} else {
				self.application.unBlockUI();
				this.application.gotoPage('homePage');
			}
		},

		onRefresh : function() {
			var self = this;
			var $monthlyUsageContent = $('#monthlyUsageContent'); 
			var currentLine = self.application.getCurrentLine();
			
			// Reset details
			$monthlyUsageContent.empty().hide().attr("aria-hidden", "true");
			var json = this.model.attr;

			var dataLimitedServices = $.grep(json.limitedServices, function(service, index) {
				return (service.serviceType.toLowerCase() == "d" || service.serviceType.toLowerCase() == "data");
			});
			
			var otherLimitedServices = $.grep(json.limitedServices, function(service, index) {
				return (service.serviceType.toLowerCase() != "d" && service.serviceType.toLowerCase() != "data");
			});
			
			if(currentLine.status == "voluntarySuspend"){
				$('#usageSuspendedMessage')
					.empty()
					.html($.i18n._('USAGE_SUSPENDED_MSG').replace("{0}", "test"))
					.show();
				
				$('#usageSuspendedMessage a').tap(function(e) {
					self.application.showMsg("Line pending", "Lorem ipsum dolor sit amet ...");
				});
			}
			else {
				$('#usageSuspendedMessage').hide();
			}
			
			$.each(dataLimitedServices, function(index, value) {
				var percent = parseFloat(value.consumedAllowance) / parseFloat(value.totalAllowance) * 100;
				var progressClass = percent >= value.thresholdLimit ? "plume" : (percent < value.thresholdLower ? "green" : "yellow");
				if(currentLine.status == "voluntarySuspend")
					progressClass = "grey";
				
				if (percent >= 100) {
					percent = 100;
				} else if (percent > 0 && percent < 5) {
					percent = 5;
				}
				
				self.userDataTotalAllowance = self.application.convertDataUsage(value.totalAllowance, value.uom, 2);
				self.consumedAllowance = self.application.convertDataUsage(value.consumedAllowance, value.uom, 2);
				$monthlyUsageContent.append('<h4 class="medium" role="heading" aria-level="2">Data Usage</h4>'
											+'<div class="text small">'
												+'You get '+self.userDataTotalAllowance.toString()+' of high-speed data this month.<br />'
												+'<a id="i18n_usageLearnMore" role="link" data-i18n="USAGE_LEARN_MORE_BUTTON">'+ $.i18n._('USAGE_LEARN_MORE_BUTTON') +'</a>'
											+'</div>'
											+'<div class="reducedBar">'
												+'<div class="leftBar">'
													+'<div class="progress">'
														+'<span class="'+progressClass+'" style="width: '+percent.toString()+'%;">'+self.consumedAllowance.toString()+' of '+self.userDataTotalAllowance.toString()+' Used</span>'
													+'</div>'
													+'<div class="legend text x-small">High Speeds (up to '+self.userDataTotalAllowance.toString()+')</div>'
												+'</div>'
												+'<div class="rightBar">'
													+'<div class="progress">'
														+'<span class="'+progressClass+'" style="width: '+(percent >= 100 ? '100' : '0')+'%;">Reduced speeds, '+(percent >= 100 ? 'highlighted, active' : 'not highlighted, inactive')+'.</span>'
													+'</div>'
													+'<div class="legend text x-small" aria-hidden="true">Reduced Speeds</div>'
												+'</div>'
											+'</div>');

				$('#i18n_usageLearnMore').tap(function() {
					self.application.gotoPage("aboutUsagePage", {
						userDataTotalAllowance : self.userDataTotalAllowance
					});
				});
			});
			
			$.each(otherLimitedServices, function(index, value) {
				var percent = parseFloat(value.consumedAllowance) / parseFloat(value.totalAllowance) * 100;
				var progressClass = percent >= value.thresholdLimit ? "plume" : (percent < value.thresholdLower ? "green" : "yellow");
				if(currentLine.status == "voluntarySuspend")
					progressClass = "grey";
				
				if (percent >= 100) {
					percent = 100;
				} else if (percent > 0 && percent < 5) {
					percent = 5;
				}
				
				var totalAllowance = parseFloat(value.totalAllowance);
				var consumedAllowance = parseFloat(value.consumedAllowance);
				var digitNumber;
				var valueId = index.toString()+'_'+value.serviceType.toString().replace(/ /gi, "");
				
				switch(value.uom.toLowerCase())  {
					// minutes, units, seconds
					default:
						digitNumber = 0;
						break;
				}
				
				$monthlyUsageContent.append('<h4 class="page-subtitle" role="heading" aria-level="2">'+(value.titleOfFeature || value.serviceType).toString()+'</h4>'
											+'<div class="reducedBar">'
												+'<div class="leftBar">'
													+'<div class="progress">'
														+'<span class="'+progressClass+'" style="width: '+percent.toString()+'%;" aria-labelledby="'+valueId+'"></span>'
													+'</div>'
													+'<div class="legend text x-small" id="'+valueId+'">'+(consumedAllowance > totalAllowance ? totalAllowance : consumedAllowance).toFixed(digitNumber).toString()+' of '+totalAllowance.toFixed(digitNumber).toString()+' '+value.uom.slice(0, 1).toUpperCase()+value.uom.slice(1)+' Used</div>'
												+'</div>'
												+'<div class="empty rightBar"></div>'
											+'</div>');
			});
			$monthlyUsageContent.show().attr("aria-hidden", "false");
		},

		_onRefreshDetails : function(json) {
			var self = this;
			var $usageDetailsResultContent = $("#usageDetailsResultContent");

			if (this.isCanceledDetailed) {
				return;
			}
			$usageDetailsResultContent.empty();
			// json.usageDetails = [];
			if (json.usageDetails.length == 0) {
				$usageDetailsResultContent.append('<tr><td colspan="3" class="centered text">No records for this period.</td></tr>');
			} else {
				// Adding items
				$.each(json.usageDetails, function(index, value) {
					var type = value.type.toLowerCase();
					var typeClass = "call";
					var typeLabel = "call";

					var date = $('<td class="text"><span class="datetime">' + moment(value.dateAndTime).format('MM/DD/YYYY, h:mm:ss a') + '</span></td>');

					if(value.unit.toLowerCase() == "mins") {
						if(parseFloat(value.quantity) <= 1) {
							value.unit = "Minute";
						}
						else {
							value.unit = "Minutes";
						}
					}
					
					switch (type) {
						case "sms":
						case "mms":
						case "international sms":
						case "premium sms":
							typeClass = "txt";
							typeLabel = "text message";
							date.append("<br/>" + value.quantity + " " + value.unit);
							break;
						case "data":
							typeClass = "data";
							typeLabel = "data";
							date.append("<br/>" + self.application.convertDataUsage(value.quantity, value.unit, 2));
							break;
						default:
							date.append("<br/>" + value.quantity + " " + value.unit);
							break;
					}

					var type = $('<td class="' + typeClass + '">' + typeLabel + '</td>');
					var formattedPhoneNumber = self.application.displayPhoneNumber(value.calledNumber);
					var number = $('<td class="text"' + (formattedPhoneNumber == "-" ? ' aria-hidden="true"' : '') + '>' + formattedPhoneNumber + '</td>');
					var item = $('<tr/>').append(type).append(date).append(number);

					$usageDetailsResultContent.append(item);
				});
				
				// Show back to top button
				var wh = $(window).height();
				var lastDetailTop = $usageDetailsResultContent.find('tr:last-child').offset().top;
				var itemHeight = $usageDetailsResultContent.find('tr:last-child').height();
				if((lastDetailTop - 16*itemHeight) > wh) {
					this.$element.find(".button-bar").show().attr("aria-hidden", "false");
				}

			}
		}
	};

	Pages.UsagePage = MVC.Page.extend(methods);

})($, MVC);
