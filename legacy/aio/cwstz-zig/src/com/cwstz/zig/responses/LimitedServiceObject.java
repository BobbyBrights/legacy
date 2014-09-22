package com.cwstz.zig.responses;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class LimitedServiceObject {

	@JsonProperty
	private String totalAllowance;
	
	@JsonProperty
	private String consumedAllowance;
	
	@JsonProperty
	private String remainingAllowance;
	
	@JsonProperty
	private String uom;
	
	@JsonProperty
	private String serviceType;
	
	public String getServiceType() {
		return serviceType;
	}

	@JsonProperty
	private String thresholdLower;
	
	@JsonProperty
	private String thresholdLimit;
	
	
	
	public LimitedServiceObject(){}


	public LimitedServiceObject(String totalAllowance, String consumedAllowance,
			String remainingAllowance, String mou, String titleOfFeature, String thLow, String thHi) {
		this.totalAllowance = totalAllowance;
		this.consumedAllowance = consumedAllowance;
		this.remainingAllowance = remainingAllowance;
		this.uom = mou;
		this.serviceType = titleOfFeature;
		this.thresholdLower = thLow;
		this.thresholdLimit = thHi;
	//this.targetCountry = country;
		}
	
	public LimitedServiceObject(String totalAllowance, String consumedAllowance,
			String remainingAllowance, String mou, String titleOfFeature, String thLimit) {
		this.totalAllowance = totalAllowance;
		this.consumedAllowance = consumedAllowance;
		this.remainingAllowance = remainingAllowance;
		this.uom = mou;
		this.serviceType = titleOfFeature;
		this.thresholdLimit = thLimit;
		//this.targetCountry = country;
		}
	
	
}
