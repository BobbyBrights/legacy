package com.cwstz.zig.responses;

import java.text.ParseException;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class MakeOTPaymentResponse extends GeneralResponse {
	@JsonProperty
	private String confirmationId;
	@JsonProperty
	private String amountReceived;
	@JsonProperty
	private String newBalance;
	
	public MakeOTPaymentResponse(){}
	
//	public SubmitChangeServicesResponse(JSONObject jsonObj) throws ParseException, JSONException {
//		this.confirmationId = jsonObj.getString("error");
//	}

	public MakeOTPaymentResponse(String confId, String amntRcvd, String newBal) {
		this.confirmationId = confId;
		this.amountReceived = amntRcvd;
		this.newBalance = newBal;
	}

}
