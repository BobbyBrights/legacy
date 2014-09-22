package com.cwstz.zig.responses;

import java.text.ParseException;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class ResultResponse extends GeneralResponse {
	@JsonProperty
	private String result;
	
	public static String FAILURE = "failure";
	public static String SUCCESS = "success";
	
	public ResultResponse(){}
	
//	public ResultResponse(JSONObject jsonObj) throws ParseException, JSONException {
//		this.result = jsonObj.getString("result");
//	}

	public ResultResponse(String res) {
		this.result = res;
	}
	
	public String getResult(){
		return result;
	}

}

