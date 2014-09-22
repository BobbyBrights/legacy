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
public class ChangeServiceVerificationResponse extends GeneralResponse {

	@JsonProperty
	private PaymentObject nextBill;

	@JsonProperty
	private PaymentObject immediatePayment;
	
	@JsonProperty
	private float arBalance;
	@JsonProperty
	private float balanceAfterPurchase;
	@JsonProperty
	private float debitFromBalance;
	
	@JsonProperty
	private ValidationInfoResponse validationInfo;
	
	public ChangeServiceVerificationResponse(){}
	
//	public ChangeServiceVerificationResponse(JSONObject jsonObj) throws ParseException, JSONException {
//		this.SecurityQuestion = jsonObj.getString("SecurityQuestion");
//	}

	public ChangeServiceVerificationResponse(PaymentObject nxtBill, PaymentObject immPaymnt, float bal,float balanceAfterPurchase, float debitFromBalance) {
		this.nextBill = nxtBill;
		this.immediatePayment = immPaymnt;
		this.arBalance = bal;
		this.validationInfo = null;
		this.balanceAfterPurchase = balanceAfterPurchase;
		this.debitFromBalance = debitFromBalance;
	}

	public ChangeServiceVerificationResponse(ValidationInfoResponse vir) {
		this.nextBill = null;
		this.immediatePayment = null;
		this.arBalance = 0;
		this.validationInfo = vir;
		this.balanceAfterPurchase = 0;
		this.debitFromBalance = 0;
	}


}
