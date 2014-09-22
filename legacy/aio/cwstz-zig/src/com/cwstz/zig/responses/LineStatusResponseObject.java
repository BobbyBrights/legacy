package com.cwstz.zig.responses;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect
// use this annotation if you don't have getters and setters for each
@JsonIgnoreProperties(ignoreUnknown = true)    
// use this if there isn't an exact correlation between JSON and class properties
/* 
 * 
 * 
 * Outputs 
 * 
	lineStatus: {
		active: true
		suspended: false
		null: false
		canceled: false
		reserved: false
		code: "A"
		deCode: "Active"
	}
 */

public class LineStatusResponseObject {

	@JsonProperty
	private Boolean active;
	@JsonProperty
	private Boolean suspended;
	@JsonProperty
	private Boolean canceled;
	@JsonProperty
	private Boolean reserved;
	@JsonProperty("null")
	private Boolean nullProperty;

	public Boolean getNullProperty() {
		return nullProperty;
	}

	public void setNullProperty(Boolean nullProperty) {
		this.nullProperty = nullProperty;
	}

	@JsonProperty
	private String code;
	@JsonProperty
	private String deCode;

	public LineStatusResponseObject() {
	}

	public LineStatusResponseObject(Boolean active, Boolean suspended, Boolean nullProperty,
			Boolean canceled, Boolean reserved, String code, String deCode) {
		super();
		this.active = active;
		this.suspended = suspended;
		this.canceled = canceled;
		this.reserved = reserved;
		this.code = code;
		this.deCode = deCode;
		this.nullProperty = nullProperty;
	}

	
}
