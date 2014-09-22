package com.cwstz.zig.responses;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect
// use this annotation if you don't have getters and setters for each
// JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)
// use this if there isn't an exact correlation between JSON and class
// properties
@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
public class ResponseBody extends JSONObject {

	@JsonProperty
	private GeneralResponse response;
	
	public ResponseBody(GeneralResponse resp) {
		if (!(resp instanceof StatusResponse)) {
			resp.status = "success";
			this.response = resp;
		} else if (resp instanceof StatusResponse) {
			//resp.status = ((ResultResponse)resp).getResult();
			this.response = resp;
		}
	}

//	public ResponseBody(ErrorResponse err){
//		ErrorMessagesResponse emr = new ErrorMessagesResponse();
//		emr.addError(err);
//		emr.status = "failure";
//		this.response = emr;
//		//this.response.setResult("failure");
//	}
}
