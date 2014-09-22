package com.cwstz.zig.responses;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class BillDetailsResponse extends GeneralResponse {

	@JsonProperty
	private String totalOwed;
	@JsonProperty
	private ArrayList<BillDetailsProfileSubscriberDetails> subscriberDetails;
	@JsonProperty
	private ArrayList<BillDetailsCredit> credits;
	@JsonProperty
	private ArrayList<BillDetailsAdjustment> adjustments;
	
	
	public BillDetailsResponse() {
		
	}
	
	public BillDetailsResponse(String totalOwed, ArrayList<BillDetailsProfileSubscriberDetails> subscriberDetails, ArrayList<BillDetailsCredit> credits, ArrayList<BillDetailsAdjustment> adjustments) {
		this.setTotalOwed(totalOwed);
		this.setSubscriberDetails(subscriberDetails);
		this.setCredits(credits);
		this.setAdjustments(adjustments);
	}

	public ArrayList<BillDetailsProfileSubscriberDetails> getSubscriberDetails() {
		return subscriberDetails;
	}

	public void setSubscriberDetails(ArrayList<BillDetailsProfileSubscriberDetails> subscriberDetails) {
		this.subscriberDetails = subscriberDetails;
	}

	public String getTotalOwed() {
		return totalOwed;
	}

	public void setTotalOwed(String totalOwed) {
		this.totalOwed = totalOwed;
	}

	public ArrayList<BillDetailsCredit> getCredits() {
		return credits;
	}

	public void setCredits(ArrayList<BillDetailsCredit> credits) {
		this.credits = credits;
	}

	public ArrayList<BillDetailsAdjustment> getAdjustments() {
		return adjustments;
	}

	public void setAdjustments(ArrayList<BillDetailsAdjustment> adjustments) {
		this.adjustments = adjustments;
	}
}
