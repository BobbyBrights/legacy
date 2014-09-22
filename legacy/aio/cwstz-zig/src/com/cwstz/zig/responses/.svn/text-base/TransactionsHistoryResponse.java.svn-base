package com.cwstz.zig.responses;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class TransactionsHistoryResponse extends GeneralResponse {

	@JsonProperty
	private ArrayList transactionsHistory;
	
	public TransactionsHistoryResponse(){}
	
//	public FinancialInformationResponse(JSONObject jsonObj) throws ParseException, JSONException {
//		this.dateAndTime = dueDateFormat.parse(jsonObj.getString("dateAndTime"));
//		this.transactionType = jsonObj.getString("transactionType");
//		this.description = jsonObj.getString("description");
//		this.amount = jsonObj.getString("amount");
//		this.balance = jsonObj.getString("balance");
//	}

	public TransactionsHistoryResponse(ArrayList tActions) {
		this.transactionsHistory = tActions;
	}
	
	public void addTransaction(TransactionObject tao){
		this.transactionsHistory.add(tao);
	}

}




