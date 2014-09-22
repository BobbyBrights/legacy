package com.cwstz.zig.responses;

import java.text.ParseException;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class PaymentObject{

	@JsonProperty
	private String service;
	
	@JsonProperty
	private String additionalService;
	
	@JsonProperty
	private String transactionFee;
	
	@JsonProperty
	private String totalTaxes;
	
	@JsonProperty
	private String totalAmount;
	
	public PaymentObject(){}
	
	public PaymentObject(JSONObject jsonObj) throws ParseException, JSONException {
		this.service = jsonObj.getString("service");
		this.additionalService = jsonObj.getString("additionalService");
		this.transactionFee = jsonObj.getString("transactionFee");
		this.totalTaxes = jsonObj.getString("totalTaxes");
		this.totalAmount = jsonObj.getString("totalAmount");
	}

	public PaymentObject(String srvc, String additSrvc, String xActnFee, String totTax, String totAmt) {
		this.service = srvc;
		this.additionalService = additSrvc;
		this.transactionFee = xActnFee;
		this.totalTaxes = totTax;
		this.totalAmount = totAmt;
	}

}




