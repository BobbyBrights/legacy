package com.cwstz.zig.responses;

import java.text.ParseException;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class AvailableServiceInformation {
	@JsonProperty
	private String serviceID;
	@JsonProperty
	private String serviceName;
	@JsonProperty
	private String serviceShortDescription;
	@JsonProperty
	private String amount;
	public String getServiceID() {
		return serviceID;
	}

	public void setServiceID(String serviceID) {
		this.serviceID = serviceID;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getServiceShortDescription() {
		return serviceShortDescription;
	}

	public void setServiceShortDescription(String serviceShortDescription) {
		this.serviceShortDescription = serviceShortDescription;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getTypeIndicator() {
		return typeIndicator;
	}

	public void setTypeIndicator(String typeIndicator) {
		this.typeIndicator = typeIndicator;
	}

	public int getNumberOfInstances() {
		return numberOfInstances;
	}

	public void setNumberOfInstances(int numberOfInstances) {
		this.numberOfInstances = numberOfInstances;
	}


	@JsonProperty
	private String typeIndicator;
	@JsonProperty
	private int numberOfInstances;
	
	public AvailableServiceInformation(){}
	
	public AvailableServiceInformation(JSONObject jsonObj) throws ParseException, JSONException {
		this.serviceID = jsonObj.getString("serviceID");
		this.serviceName = jsonObj.getString("serviceName");
		this.serviceShortDescription = jsonObj.getString("serviceShortDescription");
		this.amount = jsonObj.getString("amount");
		this.typeIndicator = jsonObj.getString("typeIndicator");
		}

	public AvailableServiceInformation(String srvcID, String srvcName, String shrtDesc, String amt, String type) {
		this.serviceID = srvcID;
		this.serviceName = srvcName;
		this.serviceShortDescription = shrtDesc;
		this.amount = amt;
		this.typeIndicator = type;
	}


	public AvailableServiceInformation(String srvcID, String srvcName, String shrtDesc, String amt, String type, int numOf) {
		this.serviceID = srvcID;
		this.serviceName = srvcName;
		this.serviceShortDescription = shrtDesc;
		this.amount = amt;
		this.typeIndicator = type;
		this.numberOfInstances = numOf;		
	}


}