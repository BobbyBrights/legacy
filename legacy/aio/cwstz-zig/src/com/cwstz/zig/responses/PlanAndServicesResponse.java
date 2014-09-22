package com.cwstz.zig.responses;

import java.text.ParseException;
import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class PlanAndServicesResponse extends GeneralResponse{

	@JsonProperty
	private PlanInformationObject plan;
	
	@JsonProperty
	private ArrayList addedServices;

	@JsonProperty
	private ArrayList includedServices;

	public PlanAndServicesResponse(){}
	
	public PlanAndServicesResponse(PlanInformationObject pInfoObj, ArrayList incSrvcs, ArrayList addedSrvcs){
		this.plan = pInfoObj;
		this.addedServices = addedSrvcs;
		this.includedServices = incSrvcs;
	}
	
}
