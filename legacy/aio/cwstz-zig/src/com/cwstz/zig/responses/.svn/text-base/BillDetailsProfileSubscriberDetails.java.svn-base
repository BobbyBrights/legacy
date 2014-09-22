package com.cwstz.zig.responses;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class BillDetailsProfileSubscriberDetails {

	@JsonProperty
	private String ctn;
	@JsonProperty
	private Boolean isTablet;
	@JsonProperty
	private BillDetailsPlan plan;
	@JsonProperty
	private ArrayList<BillDetailsDiscount> discounts;
	@JsonProperty
	private ArrayList<BillDetailsAddedService> addedServices;
	
	public BillDetailsProfileSubscriberDetails() {
		
	}
	
	public BillDetailsProfileSubscriberDetails(String ctn, Boolean isTablet, BillDetailsPlan plan, ArrayList<BillDetailsDiscount> discounts, ArrayList<BillDetailsAddedService> addedServices) {
		this.setCtn(ctn);
		this.setIsTablet(isTablet);
		this.setPlan(plan);
		this.setDiscounts(discounts);
		this.setAddedServices(addedServices);
	}

	public String getCtn() {
		return ctn;
	}

	public void setCtn(String ctn) {
		this.ctn = ctn;
	}

	public Boolean getIsTablet() {
		return isTablet;
	}

	public void setIsTablet(Boolean isTablet) {
		this.isTablet = isTablet;
	}

	public ArrayList<BillDetailsDiscount> getDiscounts() {
		return discounts;
	}

	public void setDiscounts(ArrayList<BillDetailsDiscount> discounts) {
		this.discounts = discounts;
	}

	public BillDetailsPlan getPlan() {
		return plan;
	}

	public void setPlan(BillDetailsPlan plan) {
		this.plan = plan;
	}

	public ArrayList<BillDetailsAddedService> getAddedServices() {
		return addedServices;
	}

	public void setAddedServices(ArrayList<BillDetailsAddedService> addedServices) {
		this.addedServices = addedServices;
	}
}
