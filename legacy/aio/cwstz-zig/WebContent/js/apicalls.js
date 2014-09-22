var error_a = '<div class="plRow-err"><div class="plLabel">Payload:</div><div class="plString" id="';
var error_b = '-err-pl"></div></div><div class="rpLabelRow-err"><div class="rpLabel">Response:</div><div class="rpbutton"></div></div><div class="rpContentRow"><div class="rp"><div id="';
var error_c = '-err"></div></div></div>';

function versionFunction() {

	var jsonInputs = {};

	var jsonData = JSON.stringify(jsonInputs);

	$.ajax({
		type : 'post',
		url : 'rest\/version',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#version').empty().append("Error");
		},
		success : function(json) {
			$('#getVersion .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#version').empty().append('<span>' + output + '</span>');
		}
	});
	$('#version-pl').html(jsonData);
}

function loginFunction() {

	var jsonInputs = {};
	jsonInputs.username = "Bob";
	jsonInputs.password = "full";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/authentication\/login',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#fullLogin').empty().append("Error");
		},
		success : function(json) {
			$('#login .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#fullLogin').empty().append('<span>' + output + '</span>');
		}
	});
	$('#fullLogin-pl').html(jsonData);

	jsonInputs.password = "tmp";
	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/authentication\/login',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#tempLogin').empty().append("Error");
		},
		success : function(json) {
			$('#login .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#tempLogin').empty().append('<span>' + output + '</span>');
		}
	});
	$('#tempLogin-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_1000', 'err_1001', 'err_1002', 'err_1003', 'err_1004', 'err_1005', 'err_1006', 'err_1007',
			'err_1008', 'err_1009', 'err_1010', 'err_1011' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.password = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'fullLogin' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/authentication\/login',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-fullLogin').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function getVerifyPINFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";
	jsonInputs.PIN = "1234";

	var jsonData = JSON.stringify(jsonInputs);
	
	$.ajax({
		type : 'post',
		url : 'rest\/authentication\/verifyPIN',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#verifyPIN').empty().append("Error");
		},
		success : function(json) {
			$('#getVerifyPIN .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#verifyPIN').empty().append('<span>' + output + '</span>');
		}
	});
	$('#verifyPIN-pl').html(jsonData);

	jsonInputs.PIN = "1232";

	jsonData = JSON.stringify(jsonInputs);
	
	$.ajax({
		type : 'post',
		url : 'rest\/authentication\/verifyPIN',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#verifyPINerr').empty().append("Error");
		},
		success : function(json) {
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#verifyPINerr').empty().append('<span>' + output + '</span>');
		}
	});
	$('#verifyPINerr-pl').html(jsonData);
	
	// 
	var errors = [ 'ERROR_0012']; // Simulates MAX PIN retries threshold
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'verifyPIN' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/authentication\/verifyPIN',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-verifyPIN').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});
	
}

function setCurrentLineFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";
	jsonInputs.ctn = "1111111753";

	var jsonData = JSON.stringify(jsonInputs);
	
	$.ajax({
		type : 'post',
		url : 'rest\/authentication\/setCurrentLine',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#setCurrentLineR').empty().append("Error");
		},
		success : function(json) {
			$('#setCurrentLine .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#setCurrentLineR').empty().append('<span>' + output + '</span>');
		}
	});
	
	$('#setCurrentLine-pl').html(jsonData);

	var errors = [ 'ctn_non_existent'];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.ctn = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'setCurrentLine' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/authentication\/setCurrentLine',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-setCurrentLine').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});
	});
	
}

function getHomeFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/authentication\/home',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#home').empty().append("Error");
		},
		success : function(json) {
			$('#getHome .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#home').empty().append('<span>' + output + '</span>');
		}
	});
	$('#home-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'home' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/authentication\/home',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-home').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function changePasswordFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "44444444444";
	jsonInputs.oldPassword = "pass";
	jsonInputs.newPassword = "word";

	var jsonData = JSON.stringify(jsonInputs);

	$.ajax({
		type : 'post',
		url : 'rest\/authentication\/change\/userpassword',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#changePw').empty().append("Error");
		},
		success : function(json) {
			$('#changePassword .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#changePw').empty().append('<span>' + output + '</span>');
		}
	});
	$('#changePw-pl').html(jsonData);

	jsonInputs.username = "wilson";
	var jsonData = JSON.stringify(jsonInputs);

	$.ajax({
		type : 'post',
		url : 'rest\/authentication\/change\/userpassword',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#changePwIncUsername').empty().append("Error");
		},
		success : function(json) {
			$('#changePassword .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#changePwIncUsername').empty().append('<span>' + output + '</span>');
		}
	});
	$('#changePwIncUsername-pl').html(jsonData);

	delete jsonInputs.sessionToken;
	var jsonData = JSON.stringify(jsonInputs);

	$.ajax({
		type : 'post',
		url : 'rest\/authentication\/change\/userpassword',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#resetPw').empty().append("Error");
		},
		success : function(json) {
			$('#changePassword .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#resetPw').empty().append('<span>' + output + '</span>');
		}
	});
	$('#resetPw-pl').html(jsonData);

	//	
	// jsonInputs.oldPassword = "returnFailure";
	// var jsonData = JSON.stringify(jsonInputs);
	//
	// $.ajax({
	// type : 'post',
	// url : 'rest\/authentication\/change\/userpassword',
	// data : jsonData,
	// contentType : 'application/json',
	// dataType : 'json',
	// error : function() {
	// $('#changePw-f').empty().append("Error");
	// },
	// success : function(json) {
	// var output = JSON.stringify(json).replace(/,/g,',</span><span>');
	// output = output.replace(/{/g,'<span class="subelement">{<span>');
	// output = output.replace(/}/g,'</span>}</span>');
	// $('#changePw-f').empty().append('<span>' + output + '</span>');
	// }
	// });
	// $('#changePw-f-pl').html(jsonData);
	//	

	var errors = [ 'err_0000', 'err_0001', 'err_1003', 'err_1008', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		jsonInputs.sessionToken = "44444444444";
		jsonInputs.oldPassword = "pass";
		jsonInputs.newPassword = "word";
		counter++;
		switch (entry) {
		case 'err_1003':
			jsonInputs.oldPassword = entry;
			break;

		case 'err_1008':
			jsonInputs.newPassword = entry;
			break;

		default:
			jsonInputs.sessionToken = entry;
			break;
		}
		var err = JSON.stringify(jsonInputs);
		var elementId = 'changePw' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/authentication\/change\/userpassword',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-changePw').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function getSecurityQuestionFunction() {

	var jsonInputs = {};
	jsonInputs.ctn = "3333333333";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/authentication\/securityquestion\/',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#secQu').empty().append("Error");
		},
		success : function(json) {
			$('#getSecurityQuestion .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#secQu').empty().append('<span>' + output + '</span>');
		}
	});
	$('#secQu-pl').html(jsonData);

	var errors = [ '0000', '0001', '1006' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.ctn = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'secQu' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/authentication\/securityquestion\/',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-secQu').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function validateSecurityQuestionFunction() {

	var jsonInputs = {};
	jsonInputs.ctn = "3333333333";
	jsonInputs.securityQuestionAnswer = "jojo"; // Success response when
	// securityQuestionAnswer !=null
	// | !="" | !="wrong"

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/authentication\/securityquestion\/validate',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#valSecQu-s').empty().append("Error");
		},
		success : function(json) {
			$('#validateSecurityQuestion .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#valSecQu-s').empty().append('<span>' + output + '</span>');
		}
	});
	$('#valSecQu-s-pl').html(jsonData);

	var errors = [ '0000', '0001', 'err_1004', '1006' ];
	var counter = 0;
	jsonInputs.securityQuestionAnswer = "jojo";
	errors.forEach(function(entry) {
		jsonInputs.ctn = "3333333333";
		jsonInputs.securityQuestionAnswer = "jojo";
		counter++;
		switch (entry) {
		case 'err_1004':
			jsonInputs.securityQuestionAnswer = entry;
			break;

		default:
			jsonInputs.ctn = entry;
			break;
		}
		var err = JSON.stringify(jsonInputs);
		var elementId = 'valSecQu' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/authentication\/securityquestion\/validate',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-valSecQu').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

/**
 * function getAvailableSecurityQuestionsFunction() {
 * 
 * var jsonInputs = {}; jsonInputs.sessionToken = "ffw55452";
 * 
 * var jsonData = JSON.stringify(jsonInputs); $.ajax({ type : 'post', url :
 * 'rest\/getAvailableSecurityQuestions', data : jsonData, contentType :
 * 'application/json', dataType : 'json', error : function() {
 * $('#availSecQu').empty().append("Error"); }, success : function(json) { $('#
 * .rqString').text(this.url); var output = JSON.stringify(json).replace(/,/g,',</span><span>');
 * output = output.replace(/{/g,'<span class="subelement">{<span>'); output =
 * output.replace(/}/g,'</span>}</span>'); $('#availSecQu').empty().append('<span>' +
 * output + '</span>'); } }); }
 */

function resetVMPwFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/profile\/change\/vmpassword',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#resetVMPw').empty().append("Error");
		},
		success : function(json) {
			$('#resetVMPassword .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#resetVMPw').empty().append('<span>' + output + '</span>');
		}
	});
	$('#resetVMPw-pl').html(jsonData);

	jsonInputs.sessionToken = "returnFailure"; // trigger failure response

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/profile\/change\/vmpassword',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#resetVMPw-f').empty().append("Error");
		},
		success : function(json) {
			$('#resetVMPassword .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#resetVMPw-f').empty().append('<span>' + output + '</span>');
		}
	});
	$('#resetVMPw-f-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_2000', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'resetVMPw' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/profile\/change\/vmpassword',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-resetVMPw').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function selfRegistrationFunction() {

	var jsonInputs = {};
	jsonInputs.ctn = "44444444444";
	jsonInputs.username = "twix22";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/register',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#selfReg').empty().append("Error");
		},
		success : function(json) {
			$('#selfRegistration .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#selfReg').empty().append('<span>' + output + '</span>');
		}
	});
	$('#selfReg-pl').html(jsonData);

	var errors = [ '0000', '0001', 'err_1005', '1006', '1007' ];
	var counter = 0;
	errors.forEach(function(entry) {
		jsonInputs.ctn = "44444444444";
		jsonInputs.username = "twix22";
		counter++;
		switch (entry) {
		case 'err_1005':
			jsonInputs.username = entry;
			break;

		default:
			jsonInputs.ctn = entry;
			break;
		}
		var err = JSON.stringify(jsonInputs);
		var elementId = 'selfReg' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/register',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-selfReg').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});
}

function logoutFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/authentication\/logout',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#log_out').empty().append("Error");
		},
		success : function(json) {
			$('#logout .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#log_out').empty().append('<span>' + output + '</span>');
		}
	});
	$('#log_out-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'logout' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/authentication\/logout',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-logout').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function getPlanAndServicesFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/planandservices',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#planSrvcs').empty().append("Error");
		},
		success : function(json) {
			$('#getPlanAndServices .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#planSrvcs').empty().append('<span>' + output + '</span>');
		}
	});
	$('#planSrvcs-pl').html(jsonData);

	var errors = [ 'gpas_0000', 'gpas_0001', 'gpas_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'planSrvcs' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/planandservices',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-planSrvcs').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function getAvailableServicesFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/planandservices\/available',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#availSrvcs').empty().append("Error");
		},
		success : function(json) {
			$('#getAvailableServices .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#availSrvcs').empty().append('<span>' + output + '</span>');
		}
	});
	$('#availSrvcs-pl').html(jsonData);

	var errors = [ 'gas_0000', 'gas_0001', 'gas_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'availSrvcs' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/planandservices\/available',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-availSrvcs').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function getChangeServiceVerificationFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";
	jsonInputs.addedServices = [ {
		"numberOfInstances" : 1,
		serviceId : "14"
	}, {
		"numberOfInstances" : 1,
		serviceId : "16"
	}, {
		"numberOfInstances" : 1,
		serviceId : "17"
	} ];
	jsonInputs.removedServices = [ {
		"serviceId" : "13"
	} ];

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/planandservices\/validate',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#chgSrvcs').empty().append("Error");
		},
		success : function(json) {
			$('#getChangeServiceVerification .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#chgSrvcs').empty().append('<span>' + output + '</span>');
		}
	});
	$('#chgSrvcs-pl').html(jsonData);

	var errors = [ 'gcsv_0000', 'gcsv_0001', 'gcsv_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'chgSrvcs' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/planandservices\/validate',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-chgSrvcs').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});
}

function submitChangeServicesFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";
	jsonInputs.addedServices = [ {
		"numberOfInstances" : 1,
		serviceId : "55"
	}, {
		"numberOfInstances" : 1,
		serviceId : "56"
	}, {
		"numberOfInstances" : 1,
		serviceId : "57"
	} ];
	jsonInputs.removedServices = [ {
		"serviceId" : "27"
	}, {
		"serviceId" : "29"
	} ];

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/planandservices\/submit',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#submitChgSrvcs').empty().append("Error");
		},
		success : function(json) {
			$('#submitChangeServices .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#submitChgSrvcs').empty().append('<span>' + output + '</span>');
		}
	});
	$('#submitChgSrvcs-pl').html(jsonData);

	jsonInputs.sessionToken = "returnFailure"; // trigger failure response

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/planandservices\/submit',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#submitChgSrvcs-f').empty().append("Error");
		},
		success : function(json) {
			$('#submitChangeServices .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#submitChgSrvcs-f').empty().append('<span>' + output + '</span>');
		}
	});
	$('#submitChgSrvcs-f-pl').html(jsonData);

	var errors = [ 'scs_0000', 'scs_0001', 'scs_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'submitChgSrvcs' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/planandservices\/submit',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-submitChgSrvcs').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function getProfileInformationsFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";

	var jsonData = JSON.stringify(jsonInputs);

	$.ajax({
		type : 'post',
		url : 'rest\/profile\/details',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#profile').empty().append("Error");
		},
		success : function(json) {
			$('#getProfileInformation .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#profile').empty().append('<span>' + output + '</span>');
		}
	});
	$('#profile-pl').html(jsonData);

	jsonInputs.sessionToken = "012POBOX";
	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/profile\/details',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#profile-pobox').empty().append("Error");
		},
		success : function(json) {
			$('#getProfileInformation .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#profile-pobox').empty().append('<span>' + output + '</span>');
		}
	});
	$('#profile-pobox-pl').html(jsonData);

	jsonInputs.sessionToken = "012RURAL";
	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/profile\/details',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#profile-rural').empty().append("Error");
		},
		success : function(json) {
			$('#getProfileInformation .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#profile-rural').empty().append('<span>' + output + '</span>');
		}
	});
	$('#profile-rural-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'profile' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/profile\/details',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-profile').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function updateProfileInformationsFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";
	jsonInputs.homePhoneNumber = "222222222";
	jsonInputs.businessPhoneNumber = "6666666666";
	jsonInputs.email = "david@thisis.me";
	var addressDetails = {};
	addressDetails.addressType = "S";
	addressDetails.streetAddress = "123 Fake St";
	addressDetails.postalCode = "00800";
	addressDetails.city = "Zigville";
	addressDetails.state = "MO";
	jsonInputs.address = addressDetails;

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/profile\/update',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#updateProfile').empty().append("Error");
		},
		success : function(json) {
			$('#updateProfileInformation .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#updateProfile').empty().append('<span>' + output + '</span>');
		}
	});
	$('#updateProfile-pl').html(jsonData);

	jsonInputs.sessionToken = "returnFailure"; // trigger failure response

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/profile\/update',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#updateProfile-f').empty().append("Error");
		},
		success : function(json) {
			$('#updateProfileInformation .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#updateProfile-f').empty().append('<span>' + output + '</span>');
		}
	});
	$('#updateProfile-f-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		jsonInputs.sessionToken = "ffw55452";
		addressDetails.addressType = "S";
		addressDetails.streetAddress = "123 Fake St";
		addressDetails.postalCode = "00800";
		addressDetails.city = "Zigville";
		addressDetails.state = "MO";
		counter++;
		switch (entry) {
		case 'err_6000':
			addressDetails.city = entry;
			break;

		default:
			jsonInputs.sessionToken = entry;
			break;
		}

		var err = JSON.stringify(jsonInputs);
		var elementId = 'updateProfile' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/profile\/update',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-updateProfile').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function getBillDetailsFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/bills',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#billDetails').empty().append("Error");
		},
		success : function(json) {
			$('#getBillDetails .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#billDetails').empty().append('<span>' + output + '</span>');
		}
	});
	$('#billDetails-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'billDetails' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/bills',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-billDetails').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});
}

function getTransactionsHistoryFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";
	// jsonInputs.cycleMonth = "10";
	var pagInfo = {};
	// pagInfo.pageSize = "8";
	// pagInfo.pageNumber = "1";
	// jsonInputs.pagination = pagInfo;

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/payment\/transactions',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#txHist').empty().append("Error");
		},
		success : function(json) {
			$('#getTransactionsHistory .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#txHist').empty().append('<span>' + output + '</span>');
		}
	});
	$('#txHist-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'txHist' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/payment\/transactions',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-txHist').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});
}

function getAutomaticPaymentFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/payment\/auto\/details',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#autoPayment').empty().append("Error");
		},
		success : function(json) {
			$('#getAutomaticPayment .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#autoPayment').empty().append('<span>' + output + '</span>');
		}
	});
	$('#autoPayment-pl').html(jsonData);

	jsonInputs.sessionToken = "zzzzzzzzz";
	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/payment\/auto\/details',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#autoPayment-none').empty().append("Error");
		},
		success : function(json) {
			$('#getAutomaticPayment .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#autoPayment-none').empty().append('<span>' + output + '</span>');
		}
	});
	$('#autoPayment-none-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'autoPayment' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/payment\/auto\/details',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-autoPayment').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function createAutomaticPaymentFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";
	jsonInputs.postalCode = "123 ABC";
	var cardInfo = {};
	cardInfo.cardNumber = "4444555566667777";
	cardInfo.cardName = "Klaus";
	cardInfo.cardExpirationDate = "0215";
	cardInfo.cardType = "VISA";
	cardInfo.securityCode = "999";
	cardInfo.paymentMethod = "CREDITCARD";

	jsonInputs.creditCard = cardInfo;

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/payment\/auto\/create',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#createAutoPayment').empty().append("Error");
		},
		success : function(json) {
			$('#createAutomaticPayment .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#createAutoPayment').empty().append('<span>' + output + '</span>');
		}
	});
	$('#createAutoPayment-pl').html(jsonData);

	jsonInputs.sessionToken = "returnFailure"; // trigger failure response

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/payment\/auto\/create',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#createAutoPayment-f').empty().append("Error");
		},
		success : function(json) {
			$('#createAutomaticPayment .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#createAutoPayment-f').empty().append('<span>' + output + '</span>');
		}
	});
	$('#createAutoPayment-f-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_5000', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		jsonInputs.sessionToken = "ffw55452";
		cardInfo.cardName = "Klaus";
		counter++;
		switch (entry) {
		case 'err_5000':
			cardInfo.cardName = entry;
			jsonInputs.creditCard = cardInfo;
			break;

		default:
			jsonInputs.sessionToken = entry;
			jsonInputs.creditCard = cardInfo;
			break;
		}

		var err = JSON.stringify(jsonInputs);
		var elementId = 'createAutoPayment' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/payment\/auto\/create',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-createAutoPayment').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function deleteAutomaticPaymentFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/payment\/auto\/delete',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#deleteAutoPayment-s').empty().append("Error");
		},
		success : function(json) {
			$('#deleteAutomaticPayment .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#deleteAutoPayment-s').empty().append('<span>' + output + '</span>');
		}
	});
	$('#deleteAutoPayment-s-pl').html(jsonData);

	jsonInputs.sessionToken = "returnFailure";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/payment\/auto\/delete',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#deleteAutoPayment-f').empty().append("Error");
		},
		success : function(json) {
			$('#deleteAutomaticPayment .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#deleteAutoPayment-f').empty().append('<span>' + output + '</span>');
		}
	});
	$('#deleteAutoPayment-f-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_3000', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'deleteAutoPayment' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/payment\/auto\/delete',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-deleteAutoPayment').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function makeOTPaymentFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";
	jsonInputs.amount = "25.00";
	jsonInputs.postalCode = "123 ABC";
	var cardInfo = {};
	cardInfo.cardNumber = "4444555566667777";
	cardInfo.cardName = "Klaus";
	cardInfo.cardExpirationDate = "0215";
	cardInfo.cardType = "VISA";
	cardInfo.securityCode = "999";
	cardInfo.paymentMethod = "CREDITCARD";

	jsonInputs.creditCard = cardInfo;

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/payment\/onetime',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#otPayment').empty().append("Error");
		},
		success : function(json) {
			$('#makeOTPayment .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#otPayment').empty().append('<span>' + output + '</span>');
		}
	});
	$('#otPayment-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_5000', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		jsonInputs.sessionToken = "ffw55452";
		cardInfo.cardName = "Klaus";
		counter++;
		switch (entry) {
		case 'err_5000':
			cardInfo.cardName = entry;
			jsonInputs.creditCard = cardInfo;
			break;

		default:
			jsonInputs.sessionToken = entry;
			jsonInputs.creditCard = cardInfo;
			break;
		}

		var err = JSON.stringify(jsonInputs);
		var elementId = 'otPayment' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/payment\/onetime',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-otPayment').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function getUsageDetailsFunction() {

	var jsonInputs = {};

	var myDate = new Date();
	var myFromDate = new Date();
	myFromDate.setDate(myDate.getDate() - 40);
	var myFromMonth = myFromDate.getMonth() + 1;

	var myToDate = new Date();
	myToDate.setDate(myDate.getDate() - 25);
	var myToMonth = myToDate.getMonth() + 1;

	jsonInputs.sessionToken = "ffw55452";
	jsonInputs.fromDate = myFromMonth + "/" + myFromDate.getDate() + "/" + myFromDate.getFullYear();
	jsonInputs.toDate = myToMonth + "/" + myToDate.getDate() + "/" + myToDate.getFullYear();

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/usage\/details',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#usageDetails').empty().append("Error");
		},
		success : function(json) {
			$('#getUsageDetails .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#usageDetails').empty().append('<span>' + output + '</span>');
		}
	});

	$('#usageDetails-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_4000', 'err_4001', 'err_4002', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		var myDate = new Date();
		var myFromDate = new Date();
		var myFromMonth = myFromDate.getMonth() + 1;
		var myToDate = new Date();
		var myToMonth = myToDate.getMonth() + 1;

		counter++;
		switch (entry) {

		case 'err_4000':
			jsonInputs.sessionToken = "ffw55452";
			myFromDate.setDate(myDate.getDate() - 65);
			myFromMonth = myFromDate.getMonth() + 1;
			myToDate.setDate(myDate.getDate() - 25);
			myToMonth = myToDate.getMonth() + 1;
			jsonInputs.fromDate = myFromMonth + "/" + myFromDate.getDate() + "/" + myFromDate.getFullYear();
			jsonInputs.toDate = myToMonth + "/" + myToDate.getDate() + "/" + myToDate.getFullYear();
			break;

		case 'err_4001':
			jsonInputs.sessionToken = "ffw55452";
			myFromDate.setDate(myDate.getDate() - 120);
			myFromMonth = myFromDate.getMonth() + 1;
			myToDate.setDate(myDate.getDate() - 100);
			myToMonth = myToDate.getMonth() + 1;
			jsonInputs.fromDate = myFromMonth + "/" + myFromDate.getDate() + "/" + myFromDate.getFullYear();
			jsonInputs.toDate = myToMonth + "/" + myToDate.getDate() + "/" + myToDate.getFullYear();
			break;

		default:
			jsonInputs.sessionToken = entry;
			myFromDate.setDate(myDate.getDate() - 40);
			myFromMonth = myFromDate.getMonth() + 1;
			myToDate.setDate(myDate.getDate() - 25);
			myToMonth = myToDate.getMonth() + 1;
			jsonInputs.fromDate = myFromDate.getTime() + "";
			jsonInputs.fromDate = myFromMonth + "/" + myFromDate.getDate() + "/" + myFromDate.getFullYear();
			jsonInputs.toDate = myToMonth + "/" + myToDate.getDate() + "/" + myToDate.getFullYear();
			break;
		}

		var err = JSON.stringify(jsonInputs);
		var elementId = 'usageDetails' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/usage\/details',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-usageDetails').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});

}

function getUsageSummaryFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/usage\/summary',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#usageSummary').empty().append("Error");
		},
		success : function(json) {
			$('#getUsageSummary .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#usageSummary').empty().append('<span>' + output + '</span>');
		}
	});
	$('#usageSummary-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'usageSummary' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/usage\/summary',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-usageSummary').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});
}

function getChatInfoFunction() {

	var jsonInputs = {};
	jsonInputs.sessionToken = "ffw55452";

	var jsonData = JSON.stringify(jsonInputs);
	$.ajax({
		type : 'post',
		url : 'rest\/chatInfo',
		data : jsonData,
		contentType : 'application/json',
		dataType : 'json',
		error : function() {
			$('#chatInfo').empty().append("Error");
		},
		success : function(json) {
			$('#getChatInfo .rqString').text(this.url);
			var output = JSON.stringify(json).replace(/,/g, ',</span><span>');
			output = output.replace(/{/g, '<span class="subelement">{<span>');
			output = output.replace(/}/g, '</span>}</span>');
			$('#chatInfo').empty().append('<span>' + output + '</span>');
		}
	});
	$('#chatInfo-pl').html(jsonData);

	var errors = [ 'err_0000', 'err_0001', 'err_7000' ];
	var counter = 0;
	errors.forEach(function(entry) {
		counter++;
		jsonInputs.sessionToken = entry;
		var err = JSON.stringify(jsonInputs);
		var elementId = 'chatInfo' + counter;
		$.ajax({
			type : 'post',
			url : 'rest\/chatInfo',
			data : err,
			contentType : 'application/json',
			dataType : 'json',
			error : function() {
				$('#' + elementId + '-err').empty().append("Error");
			},
			success : function(json) {
				$('#errors-chatInfo').append(error_a + elementId + error_b + elementId + error_c);
				$('#' + elementId + '-err').html(JSON.stringify(json));
				$('#' + elementId + '-err-pl').html(err);
			}
		});

	});
}
