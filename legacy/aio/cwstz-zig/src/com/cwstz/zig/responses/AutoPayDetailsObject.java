package com.cwstz.zig.responses;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.text.ParseException;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
public class AutoPayDetailsObject extends GeneralResponse {

	public enum CreditCardType{
		VISA("VISA"),
		MASTERCARD("MC"),
		DINERS("DINE"),
		DISCOVERY("DISC"),
		AM_EX("AE");
		private String type;
		private CreditCardType(String t){
			this.type = t;
		}
		}
	
	@JsonProperty
	private boolean autoPayExists;
	
	@JsonProperty
	private String cardNumber;
	
	@JsonProperty
	private String cardName;
	
	@JsonProperty
	private String postalCode;
	
	@JsonProperty
	private String cardType;
	
	@JsonProperty
	private String cardExpirationDate;

	@JsonProperty
	private String paymentProfileId;

	private SecureRandom random = new SecureRandom();

	public AutoPayDetailsObject(){
		this.autoPayExists = false;
	}
	
	public AutoPayDetailsObject(boolean autoPay) {
		this.autoPayExists = false;
	}
	
	public AutoPayDetailsObject(boolean autoPay, String ccard, String name, CreditCardType cType, String expDate, String postalCode) {
		this.autoPayExists = autoPay;
		this.cardNumber = ccard;
		this.cardName = name;
		this.cardType = cType.type;
		this.cardExpirationDate = expDate;
		this.postalCode = postalCode;
		if(autoPay){
			this.paymentProfileId = new BigInteger(50, random).toString(32);
		}
	}

	protected boolean getAutoPayExists(){
		return this.autoPayExists;
	}
}


