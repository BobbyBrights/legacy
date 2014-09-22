package com.cwstz.zig.responses;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class ProfileInformationResponse extends GeneralResponse {

	@JsonProperty
	private String name;
	@JsonProperty
	private String accountId;
	@JsonProperty
	private String accountStatus;
	@JsonProperty
	private String nextBillDue;
	@JsonProperty
	private String nextBillDueDays;
	@JsonProperty
	private String homePhoneNumber;
	@JsonProperty
	private String businessPhoneNumber;
	@JsonProperty
	private String email;
	@JsonProperty
	private Address address;
	@JsonProperty
	private ArrayList<SubscriberDetails> subscriberDetails;
	
	public ProfileInformationResponse(){}
	
	public ProfileInformationResponse(String name, String accountId,
			Date nextBillDue, String nextBillDueDays, String homePhoneNumber,
			String businessPhoneNumber, String email, Address address,
			String ctn, String status, ArrayList<SubscriberDetails> subscriberDetailsArray) {
		this.setName(name);
		this.setAccountId(accountId);
		this.setNextBillDue(new SimpleDateFormat("MM/dd/yyy HH:mm:ss").format(nextBillDue));;
		this.setNextBillDueDays(nextBillDueDays);
		this.setHomePhoneNumber(homePhoneNumber);
		this.setBusinessPhoneNumber(businessPhoneNumber);
		this.setEmail(email);
		this.setAddress(address);
		this.setAccountStatus(status);
		this.setSubscriberDetails(subscriberDetailsArray);
	}

	public void updateProfileInfo(String homePhone, String businessPhone, String email, Address address){
		
		this.setHomePhoneNumber(homePhone);
		this.setBusinessPhoneNumber(businessPhone);
		this.setEmail(email);
		this.setAddress(address);
				
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public String getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(String accountStatus) {
		this.accountStatus = accountStatus;
	}

	public String getNextBillDue() {
		return nextBillDue;
	}

	public void setNextBillDue(String nextBillDue) {
		this.nextBillDue = nextBillDue;
	}

	public String getNextBillDueDays() {
		return nextBillDueDays;
	}

	public void setNextBillDueDays(String nextBillDueDays) {
		this.nextBillDueDays = nextBillDueDays;
	}

	public String getHomePhoneNumber() {
		return homePhoneNumber;
	}

	public void setHomePhoneNumber(String homePhoneNumber) {
		this.homePhoneNumber = homePhoneNumber;
	}

	public String getBusinessPhoneNumber() {
		return businessPhoneNumber;
	}

	public void setBusinessPhoneNumber(String businessPhoneNumber) {
		this.businessPhoneNumber = businessPhoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public ArrayList<SubscriberDetails> getSubscriberDetails() {
		return subscriberDetails;
	}

	public void setSubscriberDetails(ArrayList<SubscriberDetails> subscriberDetails) {
		this.subscriberDetails = subscriberDetails;
	}
}
