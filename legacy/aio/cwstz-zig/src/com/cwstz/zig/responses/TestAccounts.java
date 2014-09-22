package com.cwstz.zig.responses;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.MutableDateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import com.cwstz.zig.responses.AutoPayDetailsObject.CreditCardType;
import com.cwstz.zig.rest.util.ResourceUtility;

public final class TestAccounts {
	private final static Logger LOGGER = Logger.getLogger(TestAccounts.class
			.getName());
	static HashMap<String, ServiceInformation> availableServices = new HashMap<String, ServiceInformation>();

	static {
		try {
			JSONArray jArray = ResourceUtility
					.getFileAsJSONArr("data/available_services.json");

			for (int i = 0; i < jArray.length(); i++) {
				JSONObject jSub = jArray.getJSONObject(i);
				String srvcID = jSub.getString("serviceId");
				ServiceInformation sinf = new ServiceInformation(jSub);
				availableServices.put(srvcID, sinf);
			}

		} catch (Exception e) {
			// TODO: handle exception
		}
	}

	public static final UserAccount createUserForTestCase(String testcase) {
		try {

			JSONObject json = ResourceUtility.getFileAsJSONObj("users/"
					+ testcase + ".json");

			String aID = json.getString("accountName");
			String aName = json.getString("accountName");
			String aStatus = json.getString("accountStatus");
			String pwd = json.getString("pwd");

			UserAccount account = new UserAccount(aName, aStatus,
					json.getString("PIN"));
			account.pwd = pwd;
			account.setLogin(testcase);

			// Modified
			Date cycleDate = getNextBillDate(json.getInt("billDate"));
			int dueDays = Days.daysBetween(new DateTime(),
					new DateTime(cycleDate)).getDays() + 1;

			String aBalance = json.getString("accountBalance");
			String dueToday = json.getString("amountDueToday");
			Date annDate = new SimpleDateFormat("MM/dd/yyy HH:mm:ss")
					.parse(json.getString("anniversaryDate"));
			String totalMRC = json.getString("totalMRC");
			String pinSecurity = json.getString("pinSecurity");
			boolean togglePinAuth = json.getBoolean("togglePinAuth");

			ArrayList<SubscriberLineInfo> subscriberLineInfo = new ArrayList<SubscriberLineInfo>();

			JSONArray subs = json.getJSONArray("subscribers");
			for (int i = 0; i < subs.length(); i++) {
				JSONObject jSub = subs.getJSONObject(i);

				String ctn = jSub.getString("ctn");
				String status = "active"; // jSub.getString("status") - @TODO
											// replace this.
				SubscriberLineInfo info = new SubscriberLineInfo(ctn,
						jSub.getString("subscriberId"), status,
						jSub.getBoolean("isTablet"),
						jSub.getBoolean("lostOrStolen"));
				// Add the new LineStatusResponseObject here.
				try {
					JSONObject lineStatusObj = jSub.getJSONObject("lineStatus");

					LineStatusResponseObject lineStatus = new LineStatusResponseObject(
							lineStatusObj.getBoolean("active"),
							lineStatusObj.getBoolean("suspended"),
							lineStatusObj.getBoolean("null"),
							lineStatusObj.getBoolean("canceled"),
							lineStatusObj.getBoolean("reserved"),
							lineStatusObj.getString("code"),
							lineStatusObj.getString("deCode"));

					info.setLineStatus(lineStatus);
				} catch (NullPointerException npe) {
				}

				subscriberLineInfo.add(info);

				String plan = jSub.getString("plan");
				JSONArray plans = ResourceUtility
						.getFileAsJSONArr("data/plans.json");

				account.setPlan(ctn, getPlanInformationObject(plans, plan));

				// Usage Info
				if (jSub.has("usageDetails")) {
					JSONArray _usageDetails = jSub.getJSONArray("usageDetails");
					for (int k = 0; k < _usageDetails.length(); k++) {
						JSONObject _usage = _usageDetails.getJSONObject(k);
						DateTimeFormatter formatter = DateTimeFormat
								.forPattern("MM/dd/yyyy HH:mm:ss");
						DateTime dt = formatter.parseDateTime(_usage
								.getString("dateAndTime"));
						account.addUsageDetails(
								ctn,
								new UsageDetailsObject(dt.toDate(), _usage
										.getString("type"), new BigDecimal(
										_usage.getString("quantity")), _usage
										.getString("unit"), _usage
										.getString("calledNumber")));

					}
				}

				// Bill Detail Info
				if (jSub.has("billDetails")) {

				}

				if (jSub.has("addedServices")) {
					JSONArray jServicesArray = jSub
							.getJSONArray("addedServices");
					LOGGER.log(Level.INFO, jServicesArray.toString());

					for (int k = 0; k < jServicesArray.length(); k++) {
						String serviceId = jServicesArray.getString(k);
						ServiceInformation serviceInformation = availableServices
								.get(serviceId);
						if (serviceInformation != null) {
							account.addService(ctn, serviceInformation);
						}
					}
				}

				if (jSub.has("limitedServices")) {
					JSONArray jServices = jSub.getJSONArray("limitedServices");
					for (int k = 0; k < jServices.length(); k++) {
						JSONObject jService = jServices.getJSONObject(k);
						String totalAllowance = jService
								.getString("totalAllowance");
						String consumedAllowance = jService
								.getString("consumedAllowance");
						String remainingAllowance = ""
								+ (Float.parseFloat(totalAllowance) - Float
										.parseFloat(consumedAllowance));
						String mou = jService.getString("uom");
						String serviceType = jService.getString("serviceType");
						String thLimit = jService.getString("thresholdLimit");
						String thLow = jService.getString("thresholdLower");
						LimitedServiceObject lso = new LimitedServiceObject(
								totalAllowance, consumedAllowance,
								remainingAllowance, mou, serviceType, thLow,
								thLimit);
						account.addLimitedServiceUsage(ctn, lso);
					}
				}
			}

			HomeResponse hr = new HomeResponse(aID, aName, aStatus, cycleDate,
					aBalance, dueToday, annDate, dueDays, subscriberLineInfo,
					totalMRC, pinSecurity, togglePinAuth);

			account.setBalance(Float.parseFloat(aBalance));
			account.setHomeResponse(hr);

			if (json.has("autopaycc")) {
				JSONObject jAutoPay = json.getJSONObject("autopaycc");
				String ccard = jAutoPay.getString("cardNumber");
				String name = jAutoPay.getString("cardName");
				String sType = jAutoPay.getString("cardType");
				CreditCardType cType = CreditCardType.VISA;
				if (sType.equalsIgnoreCase("DINE")) {
					cType = CreditCardType.DINERS;
				} else if (sType.equalsIgnoreCase("MC")) {
					cType = CreditCardType.MASTERCARD;
				} else if (sType.equalsIgnoreCase("DINE")) {
					cType = CreditCardType.DINERS;
				} else if (sType.equalsIgnoreCase("DISC")) {
					cType = CreditCardType.DISCOVERY;
				} else if (sType.equalsIgnoreCase("AE")) {
					cType = CreditCardType.AM_EX;
				}
				String expDate = jAutoPay.getString("cardExpirationDate");
				String postalCode = jAutoPay.getString("postalCode");
				AutoPayDetailsObject autoP = new AutoPayDetailsObject(true,
						ccard, name, cType, expDate, postalCode);
				account.setAutoPay(autoP);
			}

			return account;
		} catch (NullPointerException e) {
			// User does not exist in stub
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static Date getNextBillDate(int bd) {

		MutableDateTime mdt = new MutableDateTime();
		int currentDay = new DateTime().getDayOfMonth();
		mdt.setDayOfMonth(bd);

		if (currentDay > bd) { // Bill due next month
			mdt.addMonths(1);
		}

		return mdt.toDate();
	}

	static PlanInformationObject getPlanInformationObject(JSONArray plans,
			String plan) throws NullPointerException {

		PlanInformationObject pio = new PlanInformationObject();
		try {
			for (int j = 0; j < plans.length(); j++) {

				JSONObject _planObj = plans.getJSONObject(j);

				if (_planObj.getString("name").toLowerCase()
						.equals(plan.toLowerCase())) {

					pio = new PlanInformationObject(_planObj.getString("pID"),
							_planObj.getString("name"),
							_planObj.getString("description"),
							_planObj.getString("price"));
				}
			}
		} catch (JSONException je) {
			je.printStackTrace();
		}

		return pio;

	}

}
