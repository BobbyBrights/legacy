package com.cwstz.zig.responses;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect
// use this annotation if you don't have getters and setters for each
// JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)
// use this if there isn't an exact correlation between JSON and class
// properties
public class HomeResponse extends GeneralResponse {

	final SimpleDateFormat annivDateFormat = new SimpleDateFormat("yyyy-MM-dd");

	@JsonProperty
	private String accountId;
	@JsonProperty
	private String accountName;
	@JsonProperty
	private String accountStatus;
	@JsonProperty
	private String billCycleDate;
	@JsonProperty
	private String accountBalance;
	@JsonProperty
	private String amountDueToday;
	@JsonProperty
	private String subscriberId;
	@JsonProperty
	private String anniversaryDate;
	@JsonProperty
	private String nextBillDueDays;
	@JsonProperty
	private ArrayList<SubscriberLineInfo> subscribers;
	@JsonProperty
	private String totalMRC;
	@JsonProperty
	private String pinSecurity; // Casted this from Boolean
	@JsonProperty
	private boolean lostOrStolen; // Casted this from Boolean
	@JsonProperty
	private boolean togglePinAuth; // Casted this from Boolean

	public HomeResponse() {
	}

	// public HomeResponse(JSONObject jsonObj) throws ParseException,
	// JSONException {
	// this.ctn = jsonObj.getString("ctn");
	// this.accountId = jsonObj.getString("accountID");
	// this.accountName = jsonObj.getString("accountName");
	// this.accountStatus = jsonObj.getString("accountStatus");
	// this.billCycleDate = jsonObj.getString("billCycleDay");
	// this.accountBalance = jsonObj.getString("accountBalance");
	// this.amountDueToday = jsonObj.getString("amountDueToday");
	// this.planName = jsonObj.getString("planName");
	// this.planMRC = jsonObj.getString("planMRC");
	//
	// }

	public HomeResponse(String aID, String aName, String aStatus,
			Date cycleDate, String aBalance, String dueToday, Date annDate,
			int nextBillDueDays,
			ArrayList<SubscriberLineInfo> subscriberLineInfo, String totalMRC,
			String pinSecurityOn, boolean togglePinAuth) {
		this.setAccountId(aID);
		this.accountName = aName;
		this.accountStatus = aStatus;
		this.setBillCycleDate(new SimpleDateFormat("MM/dd/yyy HH:mm:ss")
				.format(cycleDate));
		this.setAccountBalance(aBalance);
		this.setAmountDueToday(dueToday);
		this.setAnniversaryDate(new SimpleDateFormat("MM/dd/yyy HH:mm:ss")
				.format(annDate));
		this.setNextBillDueDays("" + nextBillDueDays);
		this.setSubscribers(subscriberLineInfo);
		this.setTotalMRC(totalMRC);
		this.setPinSecurity(pinSecurityOn);
		this.setTogglePinAuth(togglePinAuth);
	}

	public boolean isLostOrStolen() {
		return lostOrStolen;
	}

	public void setLostOrStolen(boolean lostOrStolen) {
		this.lostOrStolen = lostOrStolen;
	}

	public boolean isTogglePinAuth() {
		return togglePinAuth;
	}

	public void setTogglePinAuth(boolean togglePinAuth) {
		this.togglePinAuth = togglePinAuth;
	}

	public void setAccountName(String an) {
		this.accountName = an;
	}

	public String getAccountName() {
		return this.accountName;
	}

	public void setAccountStatus(String as) {
		this.accountStatus = as;
	}

	public String getAccountStatus() {
		return this.accountStatus;
	}

	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public String getBillCycleDate() {
		return billCycleDate;
	}

	public void setBillCycleDate(String billCycleDate) {
		this.billCycleDate = billCycleDate;
	}

	public String getAccountBalance() {
		return accountBalance;
	}

	public void setAccountBalance(String accountBalance) {
		this.accountBalance = accountBalance;
	}

	public String getAmountDueToday() {
		return amountDueToday;
	}

	public void setAmountDueToday(String amountDueToday) {
		this.amountDueToday = amountDueToday;
	}

	public String getSubscriberId() {
		return subscriberId;
	}

	public void setSubscriberId(String subscriberId) {
		this.subscriberId = subscriberId;
	}

	public String getAnniversaryDate() {
		return anniversaryDate;
	}

	public void setAnniversaryDate(String anniversaryDate) {
		this.anniversaryDate = anniversaryDate;
	}

	public String getNextBillDueDays() {
		return nextBillDueDays;
	}

	public void setNextBillDueDays(String nextBillDueDays) {
		this.nextBillDueDays = nextBillDueDays;
	}

	public ArrayList<SubscriberLineInfo> getSubscribers() {
		return subscribers;
	}

	public void setSubscribers(ArrayList<SubscriberLineInfo> subscribers) {
		this.subscribers = subscribers;
	}

	public String getTotalMRC() {
		return totalMRC;
	}

	public void setTotalMRC(String totalMRC) {
		this.totalMRC = totalMRC;
	}

	public String getPinSecurity() {
		return pinSecurity;
	}

	public void setPinSecurity(String pinSecurityOn) {
		this.pinSecurity = pinSecurityOn;
	}

}