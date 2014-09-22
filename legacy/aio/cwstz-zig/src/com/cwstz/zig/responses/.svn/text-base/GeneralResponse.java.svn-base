package com.cwstz.zig.responses;


import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jettison.json.JSONObject;



@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
public class GeneralResponse extends JSONObject{
	@JsonProperty
	protected String status = "success";

	protected void setStatus(String s){
		this.status = s;
	}
	

	
}
