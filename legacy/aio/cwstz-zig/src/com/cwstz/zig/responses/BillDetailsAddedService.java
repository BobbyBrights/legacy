package com.cwstz.zig.responses;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class BillDetailsAddedService {

	@JsonProperty
	private String name;
	@JsonProperty
	private String amount;
	
	public BillDetailsAddedService() {
		
	}
	
	public BillDetailsAddedService(String name, String amount) {
		this.setName(name);
		this.setAmount(amount);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}
}
