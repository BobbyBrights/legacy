package com.cwstz.zig.responses;

import java.text.ParseException;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class AddedServiceInformation {
	@JsonProperty
	private String serviceID;
	@JsonProperty
	private String serviceName;
	@JsonProperty
	private String serviceShortDescription;
	@JsonProperty
	private String amount;
	
	public AddedServiceInformation(){}
	
	public AddedServiceInformation(String srvcID, String srvcName, String shrtDesc, String amt) {
		this.serviceID = srvcID;
		this.serviceName = srvcName;
		this.serviceShortDescription = shrtDesc;
		this.amount = amt;
	}

}