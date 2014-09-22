package com.cwstz.zig.responses;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect
// use this annotation if you don't have getters and setters for each
// JsonProperty
public class PlanInformationObject {

	@JsonProperty
	private String planId;

	public String getPlanId() {
		return planId;
	}

	public void setPlanId(String planId) {
		this.planId = planId;
	}

	public String getPlanDescription() {
		return planDescription;
	}

	public void setPlanDescription(String planDescription) {
		this.planDescription = planDescription;
	}

	public void setPlanName(String planName) {
		this.planName = planName;
	}

	public void setPlanMRC(int planMRC) {
		this.planMRC = planMRC;
	}

	@JsonProperty
	private String planName;
	@JsonProperty
	private String planDescription;
	@JsonProperty
	private int planMRC;

	// @JsonProperty
	// private ArrayList includedServices;

	public PlanInformationObject() {
	}

	// public PlanInformationObject(JSONObject jsonObj) throws ParseException,
	// JSONException {
	// this.planId = jsonObj.getString("planId");
	// this.planName = jsonObj.getString("planName");
	// this.planDescription = jsonObj.getString("planDescription");
	// this.planMRC = jsonObj.getInt("planMRC");
	// }

	public PlanInformationObject(String pID, String pName, String pDesc,
			String pMRC) {

		this.planId = pID;
		this.planName = pName;
		this.planDescription = pDesc;
		this.planMRC = Integer.parseInt(pMRC);

	}

	public PlanInformationObject(String pID, String pName, String pDesc,
			int pMRC) {
		this.planId = pID;
		this.planName = pName;
		this.planDescription = pDesc;
		this.planMRC = pMRC;

	}

	// public void addServiceInformation(AvailableServiceInformation srvcInfo) {
	// this.includedServices.add(srvcInfo);
	// }

	public String getPlanName() {
		return this.planName;
	}

	public int getPlanMRC() {
		return this.planMRC;
	}

}
