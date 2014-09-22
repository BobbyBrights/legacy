package com.cwstz.zig.responses;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class TransactionObject {

	final SimpleDateFormat dueDateFormat = new SimpleDateFormat("MM/dd/yyyy h:mm a");
	
	@JsonProperty
	private String dateAndTime;
	
	@JsonProperty
	private String transactionType;
	
	@JsonProperty
	private String description;
	
	@JsonProperty
	private String amount;
	
	@JsonProperty
	private String balance;
	
	public TransactionObject(){}
	
	static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy H:m:s");
	
//	public FinancialInformationResponse(JSONObject jsonObj) throws ParseException, JSONException {
//		this.dateAndTime = dueDateFormat.parse(jsonObj.getString("dateAndTime"));
//		this.transactionType = jsonObj.getString("transactionType");
//		this.description = jsonObj.getString("description");
//		this.amount = jsonObj.getString("amount");
//		this.balance = jsonObj.getString("balance");
//	}

	public TransactionObject(Date dDate, String xActnType, String desc, String amt, String bal) {
		this.dateAndTime = simpleDateFormat.format(dDate);
		this.transactionType = xActnType;
		this.description = desc;
		this.amount = amt;
		this.balance = bal;
	}


}
