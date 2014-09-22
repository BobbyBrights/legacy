package com.cwstz.zig.responses;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class UpdateProfileResponse extends GeneralResponse {
	@JsonProperty
	private String sessionToken;

	private String name;
	
	@JsonProperty
	private String accountId;
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
	private String address;
	@JsonProperty
	private String ctn;
	@JsonProperty
	private String accountStatus;
	@JsonProperty
	private String device;
	@JsonProperty
	private String deviceIMEI;
	
	public UpdateProfileResponse(){}
	
	public UpdateProfileResponse(String token, String accountId,
			String nextBillDue, String nextBillDueDays, String homePhoneNumber,
			String businessPhoneNumber, String email, String address,
			String ctn, String status, String device, String deviceIMEI) {
		this.sessionToken = token;
		this.accountId = accountId;
		this.nextBillDue = nextBillDue;
		this.nextBillDueDays = nextBillDueDays;
		this.homePhoneNumber = homePhoneNumber;
		this.businessPhoneNumber = businessPhoneNumber;
		this.email = email;
		this.address = address;
		this.ctn = ctn;
		this.accountStatus = status;
		this.device = device;
		this.deviceIMEI = deviceIMEI;
	}

	public void updateProfileInfo(String token, String homePhone, String businessPhone, String email, String address){
		this.sessionToken = token;
		this.name = null;
		
		this.homePhoneNumber = homePhone;
		this.businessPhoneNumber = businessPhone;
		this.email = email;
		this.address = address;
				
	}

}


