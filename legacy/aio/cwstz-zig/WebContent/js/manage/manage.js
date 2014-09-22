(function($) {

	$(document).ready(function() {

		$("#users-select").change(function() {
			var user = $("select option:selected").text();
			if(user != "---")
				getUser(user);
		});
		$("#refresh-user").click(function() {
			$('#user-content').html('');
			getUserNames();
		});

	});
	
	
	
	function getUser(name) {
		window.currentUser = null;
		$.ajax({
			url : document.baseURI + "/../rest/manage/user",
			type : "GET",
			data : {
				name : name
			},
			dataType : "json"
		}).done(function(msg) {
			window.currentUser = msg;
			var div = $('#user-content');
			buildUserView(div,msg);
		}).fail(function(jqXHR, textStatus) {
			alert("Request failed: " + textStatus);
		});
	}
	
	function buildUserView($div,model) {
		$div.html('');
		var html = '';
		html += '<button id="export">Export...</button>';
		html += '<button id="import">Import...</button>';
		html += '<table>';
		html += buildLine("Login:",model.login);
		html += buildLine("Name:",model.username);
		html += buildLine("Password:",model.pwd);
		html += buildLine("Monthly Rec Charge:",model.userMRC);
		html += buildLine("Balance",model.balance);
		html += buildLine("Account Status:",model.accountStatus);
		html += buildLine("PIN",model.PIN);
		html += buildLine("Auto Pay",model.autoPayActive);
		if(model.autoPayActive) {
			var autoPayDetails = model.autoPayDetails;
			html += '<td class="tlabel">AutoPay Card</td>';
			html += '<td><table>';
			html += buildLine("Name On Card:",autoPayDetails.cardName);
			html += buildLine("Card Number:",autoPayDetails.cardNumber);
			html += buildLine("Card Type:",autoPayDetails.cardType);
			html += buildLine("Expiration Date:",autoPayDetails.cardExpirationDate);
			html += buildLine("ZIP Code:",autoPayDetails.postalCode);
			html += '</td></table>';
		}
		html += '</table>';
		
		html += "<h1>Lines</h1>";
		var uctn;
		for(var i=0,j=model.homeResponse.subscribers.length;i<j;i++){
			uctn = model.homeResponse.subscribers[i].ctn;
			html += '<p>- Line #'+ i +'</p>';
			html += '<table>';
			html += buildLine("Number: ",uctn);
			html += buildLine("Is Tablet: ",model.homeResponse.subscribers[i].isTablet);
			html += buildLine("Status: ",model.homeResponse.subscribers[i].status);
			html += buildLine("Subscriber Id: ",model.homeResponse.subscribers[i].subscriberId);
			html += '<tr><td class="tlabel">Plan</td>';
			html += '<td><table>';
			html += buildLine("Name: ",model.planInfo[uctn].planName);
			html += buildLine("Price: ",model.planInfo[uctn].planMRC);
			html += '</table></td></tr>';
			
			/*Put added features*/
			if(model.addedServices[uctn]){
				for(var k=0,l=model.addedServices[uctn].length;k<l;k++){
					html += buildLine("Feature #" + k,model.addedServices[uctn][k].serviceName + ", "+model.addedServices[uctn][k].typeIndicator+ ", nb="+model.addedServices[uctn][k].numberOfInstances+ ", price="+model.addedServices[uctn][k].amount);
				}
			}
			/**/
			html += '</table>';
		}
		$div.append(html);
		$('#export').click(function(){
			window.open().document.write("<pre>"+JSON.stringify(model, undefined, 2)+"</pre>");
		});
	}
	
	function buildLine(name,value) {
		var html = '<tr>';
		html += '<td class="tlabel">' + name + '</td>';
		html += '<td class="tvalue">' + value + '</td>';
		html += '</tr>';
		return html;
	}
	
	function getUserNames() {
		$.ajax({
			url : document.baseURI + "/../rest/manage/usernames",
			type : "GET",
			dataType : "json"
		}).done(function(msg) {
			var content = "<option selected='selected'>---</option>";
			for(var i=0,j=msg.length;i<j;i++){
				content += "<option>" + msg[i] + "</option>";
			}
			$('#users-select').html(content);
		}).fail(function(jqXHR, textStatus) {
			alert("Request failed: " + textStatus);
		});
	}

	

})(jQuery);