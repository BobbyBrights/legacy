package com.cwstz.zig.responses;

import java.text.ParseException;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
public class ErrorResponse{
	

	public enum Error{
		ERROR_0000("0000"),	//SYS UNAVAIL
		ERROR_0001("0001"),	//API ERR
		ERROR_0002("0002"),	//Invalid Input
		ERROR_1000("1000"),	//UNAME OR PW WRONG
		ERROR_1001("1001"),	//ACC LOCKED DUE TO EXCEEDED NUM OF RETRIES
		ERROR_1002("1002"),	//ACC DISABLED
		ERROR_1003("1003"),	//WRONG OLD PW
		ERROR_1004("1004"),	//WRONG ANSWER
		ERROR_1005("1005"),	//UNAME ALREADY EXISTS
		ERROR_1006("1006"),	//INVALID CTN
		ERROR_1007("1007"),	//CTN ALREADY EXISTS
		ERROR_1008("1008"),	//PASSWORD FORMAT CONDITIONS NOT MET
		ERROR_1009("1009"),	//CANCELLED ACCOUNT
		ERROR_1010("1010"),	//SUSPENDED ACC - NO STOLEN CODE
		ERROR_1011("1011"),	//SUSPENDED ACC - STOLEN CODE
		ERROR_1012("1012"),	//RESET PASSWORD
		ERROR_2000("2000"),	//VM FEATURE NOT IN SUBSRIBERS FEATURE LIST
		ERROR_3000("3000"),	//AUTOPAY NOT CONFIGURED
		ERROR_4000("4000"),	//DATE RANGE EXCEEDS MAX RANGE OF 1 MONTH
		ERROR_4001("4001"),	//FROM DATE EARLIER THAN 3 MONTHS AGO
		ERROR_4002("4002"),	//FROM DATE BEFORE ANNIVERSARY DATE
		ERROR_5000("5000"),	//CREDIT CARD INFO WRONG
		ERROR_5001("5001"),	//PAYMENT FAILED
		ERROR_5002("5002"),	//Invalid Billing Information
		ERROR_6000("6000"),	//ADDRESS INFO WRONG
		ERROR_7000("7000"),	//SESSION EXPIRED
		ERROR_8000("8000"),	//INVALID PIN
		ERROR_8001("8001");	//PIN MAX RETRIES REACHED

		private String error;
		private Error(String err){
			this.error = err;
		}
	};
	
	public enum Severity{
		INFO("info"), WARN("warn"), ERROR("error"), FATAL("fatal");
		private String severity;
		private Severity(String sev){
			this.severity = sev;
		}
	};
	//public static String SEVERITY_INFO = "info";
	//public static String SEVERITY_WARN = "warn";
	//public static String SEVERITY_ERROR = "error";
	//public static String SEVERITY_FATAL = "fatal";
	
	@JsonProperty
	private String code;
	
//	@JsonProperty
//	private String message;
	
	@JsonProperty
	private String severity;
	
	public ErrorResponse(){}
	
	public ErrorResponse(JSONObject jsonObj) throws ParseException, JSONException {
		this.code = jsonObj.getString("error");
	}

	public ErrorResponse(Error e, Severity sev) {
		this.code = e.error;
		this.severity = sev.severity;
	}

	public ErrorResponse(String s, Severity sev) {
		this.code = "0";
//		this.message = s;
		this.severity = sev.severity;
	}

//	public ErrorResponse(Error e, Severity sev, String errString) {
//		this.code = e.error;
//		this.message = errString;
//		this.severity = sev.severity;
//	}

	public void setSeverity(String sev){
		this.severity  = sev;
	}
	
//	public void setMessage(String mssg){
//		this.message = mssg;
//	}
}
