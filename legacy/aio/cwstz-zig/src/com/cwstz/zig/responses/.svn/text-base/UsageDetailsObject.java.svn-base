package com.cwstz.zig.responses;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class UsageDetailsObject {

	@JsonIgnore public Date EVENT_DATE; 
	
	@JsonProperty
	private String dateAndTime;
	
	@JsonProperty
	private String type;
	
	@JsonProperty
	private String quantity;
	
	@JsonProperty
	private String unit;
	
	@JsonProperty
	private String calledNumber;
	
	
	public UsageDetailsObject(){}

	static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy H:m:s");

	public UsageDetailsObject(Date date, String type,
			BigDecimal quant, String unit, String num) {
		this.dateAndTime = simpleDateFormat.format(date);
		this.type = type;
		this.quantity = quant.toPlainString();
		this.unit = unit;
		this.calledNumber = num;
		this.EVENT_DATE = date;
	}
	
}



