package ie.three.webtexts.api.json;

import ie.three.webtexts.api.json.objects.ResourceReference;

public class JSONResponse {

	public ResourceReference resourceReference;
	public String errorCode;
	public int statusCode;
	public String code;
	public String errorMessage;
	public int remainingAllowance;
	public int scheduledMessages;
	public int allowancePerInterval; 
	public String allowanceRenewalDate;
	

	public ResourceReference getResourceReference() {
		return resourceReference;
	}

	public void setResourceReference(ResourceReference resourceReference) {
		this.resourceReference = resourceReference;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public int getRemainingAllowance() {
		return remainingAllowance;
	}

	public void setRemainingAllowance(int remainingAllowance) {
		this.remainingAllowance = remainingAllowance;
	}

	public int getScheduledMessages() {
		return scheduledMessages;
	}

	public void setScheduledMessages(int scheduledMessages) {
		this.scheduledMessages = scheduledMessages;
	}

	public int getAllowancePerInterval() {
		return allowancePerInterval;
	}

	public void setAllowancePerInterval(int allowancePerInterval) {
		this.allowancePerInterval = allowancePerInterval;
	}

	public String getAllowanceRenewalDate() {
		return allowanceRenewalDate;
	}

	public void setAllowanceRenewalDate(String allowanceRenewalDate) {
		this.allowanceRenewalDate = allowanceRenewalDate;
	}

}
