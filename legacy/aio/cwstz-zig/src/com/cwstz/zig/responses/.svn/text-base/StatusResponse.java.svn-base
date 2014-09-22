package com.cwstz.zig.responses;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class StatusResponse extends GeneralResponse {

	public enum Status{
		SUCCESS("success"),FAILURE("failure");
		private String simpleStatus;
		private Status(String s){
			this.simpleStatus=s;
		}
	};
	public StatusResponse(Status s){
		this.setStatus(s.simpleStatus);
	}
}
