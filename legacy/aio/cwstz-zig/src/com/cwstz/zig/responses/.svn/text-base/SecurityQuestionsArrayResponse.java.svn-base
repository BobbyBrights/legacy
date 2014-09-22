package com.cwstz.zig.responses;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class SecurityQuestionsArrayResponse extends GeneralResponse {

	@JsonProperty
	private Map<String,String> securityQuestions = new HashMap<String,String>();
	
	public SecurityQuestionsArrayResponse(){}
	
//	public SecurityQuestionsArrayResponse(JSONObject jsonObj) throws ParseException, JSONException {
//		this.SequrityQuestions = jsonObj.getString("SecurityQuestion");
//	}

	public SecurityQuestionsArrayResponse(String id, String secQuestion) {
		this.securityQuestions.put(id, secQuestion);
	}
	
	public void addSecurityQuestion(String id, String secQuestion) {
		this.securityQuestions.put(id, secQuestion);
	}
	

}

