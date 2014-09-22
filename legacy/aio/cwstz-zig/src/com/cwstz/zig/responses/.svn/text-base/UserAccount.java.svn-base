package com.cwstz.zig.responses;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.cwstz.zig.rest.util.ResourceUtility;
import com.cwstz.zig.session.MockUserTransaction;

public class UserAccount extends GeneralResponse {

	public static final int MAX_PIN_RETRIES = 5;
	@JsonProperty
	private String username;

	public void setUsername(String username) {
		this.username = username;
	}

	@JsonProperty
	private String login;

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	@JsonProperty
	public String pwd;
	@JsonProperty
	private boolean autoPayActive;
	@JsonProperty
	private String accountStatus;
	@JsonProperty
	private HomeResponse homeResponse;
	@JsonProperty
	private AutoPayDetailsObject autoPayDetails;
	@JsonProperty
	private HashMap<String,PlanInformationObject> planInfo;
	@JsonProperty
	private String activeLine;
	@JsonProperty
	private String PIN;
	@JsonProperty
	private boolean PINverified = false;
	@JsonProperty
	private ArrayList<SubscriberLineInfo> subscribers;
	@JsonProperty
	HashMap<String, ArrayList<LimitedServiceObject>> limitedServices = new HashMap<String, ArrayList<LimitedServiceObject>>();
//	HashMap<String, ArrayList<ServiceInformation>> features = new HashMap<String, ArrayList<ServiceInformation>>();
	@JsonProperty
	private HashMap<String,ArrayList<ServiceInformation>> addedServices = new HashMap<String,ArrayList<ServiceInformation>>();
	@JsonProperty
	private HashMap<String,ArrayList<UsageDetailsObject>> usageDetails = new HashMap<String,ArrayList<UsageDetailsObject>>();

	public ArrayList<SubscriberLineInfo> getSubscribers() {
		return subscribers;
	}

	public void setSubscribers(ArrayList<SubscriberLineInfo> subscribers) {
		this.subscribers = subscribers;
	}

	public String getPIN() {
		return PIN;
	}

	public void setPIN(String pIN) {
		PIN = pIN;
	}

	private int pinRetries = 0;

	public int getPinRetries() {
		return pinRetries;
	}

	public void setPinRetries(int pinRetries) {
		this.pinRetries = pinRetries;
	}

	private float balance;

	public void setBalance(float balance) {
		this.balance = balance;
	}

	public float getBalance() {
		return balance;
	}

	public float getUserMRC() {
		float mrc = 0;
		
		for (PlanInformationObject poj : this.planInfo.values()) {
			if (poj != null) {
				mrc += poj.getPlanMRC();
			}
			
			Collection<ArrayList<ServiceInformation>> values = addedServices.values();
			for (ArrayList<ServiceInformation> servL : values) {
				for (ServiceInformation service : servL) {
					if (ServiceInformation.REC.equals(service.getTypeIndicator())) {
						mrc += Float.parseFloat(service.getAmount());
					}
				}
			}
		}
		return mrc;
	}

	public void refuel(float value) {
		balance += value;
	}

	public void chargeCredit(float value) {
		balance = Math.max(0, balance - value);
	}

	public UserAccount(String un, String accStatus, String PIN) {
		this.username = un;
		this.accountStatus = accStatus;
		this.autoPayDetails = null;
		this.autoPayActive = false;
		this.planInfo = new HashMap<String, PlanInformationObject>();
		this.homeResponse = null;
		this.PIN = PIN;
	}

	public UserAccount(String un, String accStatus) {
		this(un, accStatus, "");
	}

	public synchronized boolean isAutoPayActive() {
		return this.autoPayActive;
	}

	public synchronized void setAutoPay(AutoPayDetailsObject apd) {
		this.autoPayDetails = apd;
		this.autoPayActive = apd.getAutoPayExists();
	}

	public synchronized void disableAutoPay() {
		this.autoPayDetails = null;
		this.autoPayActive = false;
	}

	public synchronized AutoPayDetailsObject getAutoPayDetails() {
		if (this.autoPayActive) {
			return this.autoPayDetails;
		} else
			return new AutoPayDetailsObject();
	}

	public String getUsername() {
		return this.username;
	}

	public synchronized PlanInformationObject getPlan(String ctn) {
		return this.planInfo.get(ctn);
	}

	public synchronized void setPlan(String ctn, PlanInformationObject pio) {
		this.planInfo.put(ctn, pio);
	}


	public synchronized String getAccountStatus() {
		return this.accountStatus;
	}

	public synchronized void setAccountStatus(String status) {
		this.accountStatus = status;
		if (this.homeResponse != null)
			this.homeResponse.setAccountStatus(status);
	}

	public HomeResponse getHomeResponse() {
		float userMRC = getUserMRC();
		homeResponse.setTotalMRC(""+userMRC);
		homeResponse.setAccountBalance(""+getBalance());
		float due = userMRC - getBalance();
		due = Math.max(0, due);
		homeResponse.setAmountDueToday(""+due);
		return homeResponse;
	}

	public void setHomeResponse(HomeResponse homeResponse) {
		this.homeResponse = homeResponse;
	}

	public ArrayList<UsageDetailsObject> getUsageDetails(String ctn) {
		return usageDetails.get(ctn);
	}

	public void addUsageDetails(String ctn, UsageDetailsObject udo) {	
		ArrayList<UsageDetailsObject> arrayList = usageDetails.get(ctn);
		if(arrayList==null){
			arrayList = new ArrayList<UsageDetailsObject>();
			usageDetails.put(ctn, arrayList);
		}
		arrayList.add(udo);
	}

	public ArrayList<ServiceInformation> getAddedServices(String ctn) {
		return addedServices.get(ctn);
	}

	public void addService(String ctn, ServiceInformation pio) {
		ArrayList<ServiceInformation> arrayList = addedServices.get(ctn);
		if(arrayList==null){
			arrayList = new ArrayList<ServiceInformation>();
			addedServices.put(ctn, arrayList);
		}
		for (ServiceInformation service : arrayList) {
			if (service.getServiceId().equals(pio.getServiceId())) {
				service.setNumberOfInstances(service.getNumberOfInstances()
						+ pio.getNumberOfInstances());
				return;
			}
		}
		// not yet added
		arrayList.add(pio);
	}

	public void removeService(String ctn, String serviceID) {
		ArrayList<ServiceInformation> arrayList = addedServices.get(ctn);
		ServiceInformation recService = null;
		for (ServiceInformation service : arrayList) {
			if (service.getServiceId().equals(serviceID)) {
				recService = service;
			}
		}
		if (recService != null)
			arrayList.remove(recService);
	}

	public void addLimitedServiceUsage(String ctn, LimitedServiceObject lso) {
		ArrayList<LimitedServiceObject> arrayList = limitedServices.get(ctn);
		if(arrayList==null){
			arrayList = new ArrayList<LimitedServiceObject>();
			limitedServices.put(ctn, arrayList);
		}
		for (LimitedServiceObject sobj : arrayList) {
			if (lso.getServiceType().equals(sobj.getServiceType())) {
				return;
			}
		}
		arrayList.add(lso);
	}

	public ArrayList<LimitedServiceObject> getLimitedServices(String ctn) {
		return limitedServices.get(ctn);
	}

//	public void removeLimitedServiceUsage(String type) {
//		LimitedServiceObject lso = null;
//		for (LimitedServiceObject so : limitedServices) {
//			if (so.getServiceType().equals(type)) {
//				lso = so;
//			}
//		}
//		if (lso != null)
//			limitedServices.remove(lso);
//	}

	public static ArrayList<ServiceInformation> SERVICES = new ArrayList<ServiceInformation>();

	private MockUserTransaction mockUserTransaction;

	static {
		try {
		// Replacing this with JSON info. 
		JSONArray services = ResourceUtility
				.getFileAsJSONArr("data/available_services.json");

		for (int i = 0; i < services.length(); i++) {
			JSONObject service = services.getJSONObject(i);
			try {
				ServiceInformation serviceInformation = new ServiceInformation(service);
				SERVICES.add(serviceInformation);
			} catch (ParseException p) {
				p.printStackTrace();
			}
		}
		} catch (JSONException je){
			je.printStackTrace();
		}
	}

	public void setCurrentTransaction(MockUserTransaction transaction) {
		this.mockUserTransaction = transaction;
	}

	public MockUserTransaction getMockUserTransaction() {
		return mockUserTransaction;
	}

	public String getActiveLine() {
		return activeLine;
	}

	public void setActiveLine(String activeLine) {
		this.activeLine = activeLine;
	}

	public boolean isPINverified() {
		return this.PINverified;
	}

	public void setPINverified(boolean pINverified) {
		this.PINverified = pINverified;
	}
}
