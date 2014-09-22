package com.cwstz.zig.responses;

import java.text.ParseException;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class ServiceInformation {
	
	public static String OT = "OT";
	public static String REC = "REC";
	
	@JsonProperty
	private String serviceId;
	public String getServiceId() {
		return serviceId;
	}

	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
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

	public String getIsStackable() {
		return isStackable;
	}

	public void setIsStackable(String isStackable) {
		this.isStackable = isStackable;
	}


	@JsonProperty
	private String serviceName;
	@JsonProperty
	private String serviceShortDescription;
	@JsonProperty
	private String amount;
	@JsonProperty
	private String typeIndicator;
	@JsonProperty
	private int numberOfInstances;
	@JsonProperty
	private String isStackable;
	
	public ServiceInformation(){}
	
	public ServiceInformation(JSONObject jsonObj) throws ParseException, JSONException {
		this.serviceId = jsonObj.getString("serviceId");
		this.serviceName = jsonObj.getString("serviceName");
		this.serviceShortDescription = jsonObj.getString("serviceShortDescription");
		this.amount = jsonObj.getString("amount");
		this.typeIndicator = jsonObj.getString("typeIndicator");
		}

	public ServiceInformation(String srvcID, String srvcName, String shrtDesc, String amt, String recurring, boolean stackable) {
		this.serviceId = srvcID;
		this.serviceName = srvcName;
		this.serviceShortDescription = shrtDesc;
		this.amount = amt;
		this.typeIndicator = recurring;
		this.isStackable = new String(stackable+"");
	}


	public ServiceInformation(String srvcID, String srvcName, String shrtDesc, String amt, String oneTime, int numOf, boolean stackable) {
		this.serviceId = srvcID;
		this.serviceName = srvcName;
		this.serviceShortDescription = shrtDesc;
		this.amount = amt;
		this.typeIndicator = oneTime;
		this.numberOfInstances = numOf;
		this.isStackable = new String(stackable+"");
	}

}