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
public class AvailableServicesResponse extends GeneralResponse {
	
	@JsonProperty
	private ArrayList<ServiceInformation> addedServices;

	@JsonProperty
	private ArrayList<ServiceInformation> availableServices;

	public AvailableServicesResponse(){}
	
	public AvailableServicesResponse(ArrayList<ServiceInformation> addedSrvcs, ArrayList<ServiceInformation> availSrvcs){
		this.addedServices = addedSrvcs;
		this.availableServices = availSrvcs;
	}

}

	
