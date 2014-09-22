package ie.three.webtexts.api.json.objects;

public class AccountDetails {

	public String remainingAllowance;
	public String scheduledMessages;
	public String allowancePerInterval;
	public String allowanceRenewalDate;
	public String getRemainingAllowance() {
		return remainingAllowance;
	}
	public void setRemainingAllowance(String remainingAllowance) {
		this.remainingAllowance = remainingAllowance;
	}
	public String getScheduledMessages() {
		return scheduledMessages;
	}
	public void setScheduledMessages(String scheduledMessages) {
		this.scheduledMessages = scheduledMessages;
	}
	public String getAllowancePerInterval() {
		return allowancePerInterval;
	}
	public void setAllowancePerInterval(String allowancePerInterval) {
		this.allowancePerInterval = allowancePerInterval;
	}
	public String getAllowanceRenewalDate() {
		return allowanceRenewalDate;
	}
	public void setAllowanceRenewalDate(String allowanceRenewalDate) {
		this.allowanceRenewalDate = allowanceRenewalDate;
	}

}
