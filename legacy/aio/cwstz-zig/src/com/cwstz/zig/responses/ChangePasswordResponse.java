package com.cwstz.zig.responses;

import java.text.ParseException;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class ChangePasswordResponse extends GeneralResponse {
	
	@JsonProperty
	private String sessionToken;

	public ChangePasswordResponse(){}
	
//	public ChangePasswordResponse(JSONObject jsonObj) throws ParseException, JSONException {
//		this.sessionToken = jsonObj.getString("sessionToken");
//	
//	}

	public ChangePasswordResponse(String token) {
		this.sessionToken = token;
			}

}
