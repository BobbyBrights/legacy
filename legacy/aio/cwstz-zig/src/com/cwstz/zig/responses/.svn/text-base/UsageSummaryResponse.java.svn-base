package com.cwstz.zig.responses;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class UsageSummaryResponse extends GeneralResponse {

	@JsonProperty
	private ArrayList limitedServices;

	public UsageSummaryResponse() {}
	
	public UsageSummaryResponse(ArrayList limitedServices) {
		this.limitedServices = limitedServices;
	}
	
	
}
