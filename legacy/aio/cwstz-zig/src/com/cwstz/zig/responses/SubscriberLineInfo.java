package com.cwstz.zig.responses;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class SubscriberLineInfo {

	@JsonProperty
	private String ctn;
	@JsonProperty
	private String subscriberId;
	@JsonProperty
	private String status;
	@JsonProperty
	private Boolean isTablet;
	@JsonProperty
	private LineStatusResponseObject lineStatus;
	@JsonProperty
	private Boolean lostOrStolen;	
	
	public Boolean getLostOrStolen() {
		return lostOrStolen;
	}

	public void setLostOrStolen(Boolean lostOrStolen) {
		this.lostOrStolen = lostOrStolen;
	}

	public LineStatusResponseObject getLineStatus() {
		return lineStatus;
	}

	public void setLineStatus(LineStatusResponseObject lineStatus) {
		this.lineStatus = lineStatus;
	}

	public SubscriberLineInfo(String ctn, String subscriberId, String status, Boolean isTablet, Boolean lostOrStolen) {
		this.ctn = ctn;
		this.subscriberId = subscriberId;
		this.status = status;
		this.isTablet = isTablet;
		this.lostOrStolen = lostOrStolen;
	}
	
	public String getCtn() {
		return this.ctn;
	}
	
	public String getSubscriberId() {
		return this.subscriberId;
	}
	
	public String getStatus() {
		return this.status;
	}
	
	public Boolean isTablet() {
		return this.isTablet;
	}
}
