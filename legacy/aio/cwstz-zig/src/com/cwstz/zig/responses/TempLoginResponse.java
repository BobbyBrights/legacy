package com.cwstz.zig.responses;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class TempLoginResponse extends GeneralResponse{
	@JsonProperty
	private String temporaryPassword;
	
	public TempLoginResponse(){}
	
	public TempLoginResponse(JSONObject jsonObj) throws ParseException, JSONException {
		this.temporaryPassword = jsonObj.getString("tempPW");
	}

	public TempLoginResponse(String tmpPW) {
		this.temporaryPassword = tmpPW;
	}


	
}