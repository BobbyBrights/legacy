package com.cwstz.zig.responses;

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
public class Address {
	
	public static String STREET = "S";
	public static String PO_BOX = "P";
	public static String RURAL_ROUTE = "R";
	
	@JsonProperty
	private String addressType;
	@JsonProperty
	private String streetAddress;
	@JsonProperty
	private String postalCode;
	@JsonProperty
	private String city;
	@JsonProperty
	private String state;
	@JsonProperty
	private String poBoxNumber;
	@JsonProperty
	private String ruralRoute;
	@JsonProperty
	private String ruralRouteBoxNumber;
	
	public Address(){}
	
	public Address(JSONObject jsonObj) throws ParseException, JSONException {
		}

	public Address(String addressType, String streetAddress, String postalCode,
			String city, String state) {
		this.addressType = addressType;
		this.streetAddress = streetAddress;
		this.postalCode = postalCode;
		this.city = city;
		this.state = state;
	}

	public Address(String addressType, String streetAddress, String postalCode,
			String city, String state, String poBoxNumber) {
		this.addressType = addressType;
		this.streetAddress = streetAddress;
		this.postalCode = postalCode;
		this.city = city;
		this.state = state;
		this.poBoxNumber = poBoxNumber;
	}

	public Address(String addressType, String streetAddress, String postalCode,
			String city, String state, String ruralRoute,
			String ruralRouteBoxNumber) {
		this.addressType = addressType;
		this.streetAddress = streetAddress;
		this.postalCode = postalCode;
		this.city = city;
		this.state = state;
		this.ruralRoute = ruralRoute;
		this.ruralRouteBoxNumber = ruralRouteBoxNumber;
	}



}

