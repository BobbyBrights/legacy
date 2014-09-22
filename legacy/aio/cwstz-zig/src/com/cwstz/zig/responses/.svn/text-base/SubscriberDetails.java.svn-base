package com.cwstz.zig.responses;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class SubscriberDetails {

	@JsonProperty
	private String ctn;
	private String device;
	private String deviceIMEI;
	
	public SubscriberDetails() {
		
	}
	
	public SubscriberDetails(String ctn, String device, String deviceIMEI) {
		this.setCtn(ctn);
		this.setDevice(device);
		this.setDeviceIMEI(deviceIMEI);
	}

	public String getDevice() {
		return device;
	}

	public void setDevice(String device) {
		this.device = device;
	}

	public String getCtn() {
		return ctn;
	}

	public void setCtn(String ctn) {
		this.ctn = ctn;
	}

	public String getDeviceIMEI() {
		return deviceIMEI;
	}

	public void setDeviceIMEI(String deviceIMEI) {
		this.deviceIMEI = deviceIMEI;
	}
}
