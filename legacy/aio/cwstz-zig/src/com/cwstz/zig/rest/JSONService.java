package com.cwstz.zig.rest;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Locale;
import java.util.Random;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.CookieParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import com.cwstz.zig.responses.Address;
import com.cwstz.zig.responses.AutoPayDetailsObject;
import com.cwstz.zig.responses.AutoPayDetailsObject.CreditCardType;
import com.cwstz.zig.responses.AvailableServicesResponse;
import com.cwstz.zig.responses.ChangePasswordResponse;
import com.cwstz.zig.responses.ChangeServiceVerificationResponse;
import com.cwstz.zig.responses.ChatInfoResponse;
import com.cwstz.zig.responses.ErrorMessagesResponse;
import com.cwstz.zig.responses.ErrorResponse;
import com.cwstz.zig.responses.ErrorResponse.Severity;
import com.cwstz.zig.responses.GeneralResponse;
import com.cwstz.zig.responses.LoginResponse;
import com.cwstz.zig.responses.MakeOTPaymentResponse;
import com.cwstz.zig.responses.PaymentObject;
import com.cwstz.zig.responses.PlanAndServicesResponse;
import com.cwstz.zig.responses.PlanInformationObject;
import com.cwstz.zig.responses.ProfileInformationResponse;
import com.cwstz.zig.responses.ResponseBody;
import com.cwstz.zig.responses.SecurityQuestionResponse;
import com.cwstz.zig.responses.ServiceInformation;
import com.cwstz.zig.responses.StatusResponse;
import com.cwstz.zig.responses.StatusResponse.Status;
import com.cwstz.zig.responses.SubscriberDetails;
import com.cwstz.zig.responses.SubscriberLineInfo;
import com.cwstz.zig.responses.TestAccounts;
import com.cwstz.zig.responses.TransactionObject;
import com.cwstz.zig.responses.TransactionsHistoryResponse;
import com.cwstz.zig.responses.UsageDetailsObject;
import com.cwstz.zig.responses.UsageDetailsResponse;
import com.cwstz.zig.responses.UsageSummaryResponse;
import com.cwstz.zig.responses.UserAccount;
import com.cwstz.zig.responses.ValidateSecurityQuestionResponse;
import com.cwstz.zig.responses.VersionResponse;
import com.cwstz.zig.rest.util.JSONResponseUtility;
import com.cwstz.zig.rest.util.ResourceUtility;
import com.cwstz.zig.session.AccountMap;
import com.cwstz.zig.session.MockUserTransaction;
import com.cwstz.zig.session.UserSessionMap;

@Path("/")
public class JSONService {
	@SuppressWarnings("unused")
	private final static Logger LOGGER = Logger.getLogger(JSONService.class
			.getName());

	public JSONService() {
		Locale.setDefault(Locale.US);
	}

	@POST
	@Path("/version")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getVersionInJSON(@Context Request req) {

		GeneralResponse gr;
		ResponseBody body;

		gr = new VersionResponse("30.30.30.30");
		return Response.ok(gr).build();

	}

	@POST
	@Path("/authentication/login")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getLoginResponseInJSON(@Context Request req, String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {

			JSONObject jsonData = new JSONObject(data);

			String uname = jsonData.getString("username");
			String pword = jsonData.getString("password");

			String randString = UUID.randomUUID().toString();
			randString = randString.substring(0, randString.indexOf("-"));

			if (uname.equals(null) || uname.length() == 0 || pword.equals(null)
					|| pword.length() == 0 || pword.equals("err_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("login-0000") || pword.equals("err_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("login-1000") || pword.equals("err_1000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("login-1001") || pword.equals("err_1001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("login-1002") || pword.equals("err_1002")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1002,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("login-1003") || pword.equals("err_1003")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1003,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("login-1004") || pword.equals("err_1004")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1004,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("login-1005") || pword.equals("err_1005")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1005,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("login-1006") || pword.equals("err_1006")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1006,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("login-1007") || pword.equals("err_1007")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1007,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("login-1008") || pword.equals("err_1008")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1008,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("login-1009") || pword.equals("err_1009")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1009,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("login-1010") || pword.equals("err_1010")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1010,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("login-1011") || pword.equals("err_1011")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1011,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			if (uname.equals("home-0000")) {
				randString = "homeErr_0000";
				gr = new LoginResponse("homeErr_0000");
			} else if (uname.equals("home-0001")) {
				randString = "homeErr_0001";
				gr = new LoginResponse("homeErr_0001");
			} else if (uname.equals("home-7000")) {
				randString = "homeErr_7000";
				gr = new LoginResponse("homeErr_7000");
			} else if (uname.equals("gpas-small")) {
				randString = "gpas_small";
				gr = new LoginResponse("gpas_small");
			} else if (uname.equals("gpas-large")) {
				randString = "gpas_large";
				gr = new LoginResponse("gpas_large");
			} else if (uname.equals("gpas-0000")) {
				randString = "gpas_0000";
				gr = new LoginResponse("gpas_0000");
			} else if (uname.equals("gpas-0001")) {
				randString = "gpas_0001";
				gr = new LoginResponse("gpas_0001");
			} else if (uname.equals("gpas-7000")) {
				randString = "gpas_7000";
				gr = new LoginResponse("gpas_7000");
			} else if (uname.equals("gas-0000")) {
				randString = "gas_0000";
				gr = new LoginResponse("gas_0000");
			} else if (uname.equals("gas-0001")) {
				randString = "gas_0001";
				gr = new LoginResponse("gas_0001");
			} else if (uname.equals("gas-7000")) {
				randString = "gas_7000";
				gr = new LoginResponse("gas_7000");
			} else if (uname.equals("gcsv-0000")) {
				randString = "gcsv_0000";
				gr = new LoginResponse("gcsv_0000");
			} else if (uname.equals("gcsv-0001")) {
				randString = "gcsv_0001";
				gr = new LoginResponse("gcsv_0001");
			} else if (uname.equals("gcsv-7000")) {
				randString = "gcsv_7000";
				gr = new LoginResponse("gcsv_7000");
			} else if (uname.equals("scs-0000")) {
				randString = "scs_0000";
				gr = new LoginResponse("scs_0000");
			} else if (uname.equals("scs-0001")) {
				randString = "scs_0001";
				gr = new LoginResponse("scs_0001");
			} else if (uname.equals("scs-7000")) {
				randString = "scs_7000";
				gr = new LoginResponse("scs_7000");
			} else if (uname.equals("gbd-7000")) {
				randString = "gbd_7000";
				gr = new LoginResponse("gbd_7000");
			} else if (uname.equals("gbd-0000")) {
				randString = "gbd_0000";
				gr = new LoginResponse("gbd_0000");
			} else if (uname.equals("gbd-0001")) {
				randString = "gbd_0001";
				gr = new LoginResponse("gbd_0001");
			} else if (uname.equals("gth-7000")) {
				randString = "gth_7000";
				gr = new LoginResponse("gth_7000");
			} else if (uname.equals("gth-0000")) {
				randString = "gth_0000";
				gr = new LoginResponse("gth_0000");
			} else if (uname.equals("gth-0001")) {
				randString = "gth_0001";
				gr = new LoginResponse("gth_0001");
			} else if (uname.equals("gap-7000")) {
				randString = "gap_7000";
				gr = new LoginResponse("gap_7000");
			} else if (uname.equals("gap-0000")) {
				randString = "gap_0000";
				gr = new LoginResponse("gap_0000");
			} else if (uname.equals("gap-0001")) {
				randString = "gap_0001";
				gr = new LoginResponse("gap_0001");
			} else if (uname.equals("cap-7000")) {
				randString = "cap_7000";
				gr = new LoginResponse("cap_7000");
			} else if (uname.equals("cap-0000")) {
				randString = "cap_0000";
				gr = new LoginResponse("cap_0000");
			} else if (uname.equals("cap-0001")) {
				randString = "cap_0001";
				gr = new LoginResponse("cap_0001");
			} else if (uname.equals("dap-7000")) {
				randString = "dap_7000";
				gr = new LoginResponse("dap_7000");
			} else if (uname.equals("dap-0000")) {
				randString = "dap_0000";
				gr = new LoginResponse("dap_0000");
			} else if (uname.equals("dap-0001")) {
				randString = "dap_0001";
				gr = new LoginResponse("dap_0001");
			} else if (uname.equals("dap-3000")) {
				randString = "dap_3000";
				gr = new LoginResponse("dap_3000");
			} else if (uname.equals("motp-7000")) {
				randString = "motp_7000";
				gr = new LoginResponse("motp_7000");
			} else if (uname.equals("motp-0000")) {
				randString = "motp_0000";
				gr = new LoginResponse("motp_0000");
			} else if (uname.equals("motp-0001")) {
				randString = "motp_0001";
				gr = new LoginResponse("motp_0001");
			} else if (uname.equals("motp-3000")) {
				randString = "motp_3000";
				gr = new LoginResponse("motp_3000");
			} else if (uname.equals("gud-7000")) {
				randString = "gud_7000";
				gr = new LoginResponse("gud_7000");
			} else if (uname.equals("gud-0000")) {
				randString = "gud_0000";
				gr = new LoginResponse("gud_0000");
			} else if (uname.equals("gud-0001")) {
				randString = "gud_0001";
				gr = new LoginResponse("gud_0001");
			} else if (uname.equals("gud-4002")) {
				randString = "gud_4002";
				gr = new LoginResponse("gud_4002");
			} else if (uname.equals("gus-7000")) {
				randString = "gus_7000";
				gr = new LoginResponse("gus_7000");
			} else if (uname.equals("gus-0000")) {
				randString = "gus-0000";
				gr = new LoginResponse("gus_0000");
			} else if (uname.equals("gus-0001")) {
				randString = "gus_0001";
				gr = new LoginResponse("randString");
			} else if (uname.equals("gpi-0000")) {
				randString = "gpi_0000";
				gr = new LoginResponse("gpi_0000");
			} else if (uname.equals("gpi-0001")) {
				randString = "gpi_0001";
				gr = new LoginResponse("gpi_0001");
			} else if (uname.equals("gpi-7000")) {
				randString = "gpi_7000";
				gr = new LoginResponse("gpi_7000");
			} else if (uname.equals("upi-0000")) {
				randString = "upi_0000";
				gr = new LoginResponse("upi_0000");
			} else if (uname.equals("upi-0001")) {
				randString = "upi_0001";
				gr = new LoginResponse("upi_0001");
			} else if (uname.equals("upi-7000")) {
				randString = "upi_7000";
				gr = new LoginResponse("upi_7000");
			} else if (uname.equals("upi-6000")) {
				randString = "upi_6000";
				gr = new LoginResponse("upi_6000");
			} else if (uname.equals("chat-0000")) {
				randString = "chat_0000";
				gr = new LoginResponse("chat_0000");
			} else if (uname.equals("chat-0001")) {
				randString = "chat_0001";
				gr = new LoginResponse("chat_0001");
			} else if (uname.equals("chat-7000")) {
				randString = "chat_7000";
				gr = new LoginResponse("chat_7000");
			}

			UserAccount account = TestAccounts.createUserForTestCase(uname);

			if (pword.equalsIgnoreCase("temp") || pword.equalsIgnoreCase("tmp")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1012, Severity.INFO));
				return Response.ok(gr).build();
			} else {

				if (!AccountMap.HASHMAP.accountExists(uname)) {
					String status = "Active";
					if (uname.endsWith("zzzz")) {
						status = "Hot Lined";
					}
					// Added constructor to simulate a default PIN for
					// multiline.
					if (account == null) {
						account = new UserAccount(uname, status, "1234");
					}

				} else {
					// always re hotline on login
					if (pword.equalsIgnoreCase("clean") && account != null) {
						// reset account as defined per test case
						AccountMap.HASHMAP.addAccount(account);
					} else {
						account = AccountMap.HASHMAP.getAccount(uname);
						if (uname.endsWith("zzzz")) {
							account.setAccountStatus("Hot Lined");
						}
						account.setCurrentTransaction(null);
					}
				}

				if (account == null || !pword.equalsIgnoreCase(account.pwd)) {
					gr = new ErrorMessagesResponse(new ErrorResponse(
							ErrorResponse.Error.ERROR_1000,
							ErrorResponse.Severity.ERROR));
					return Response.ok(gr).build();
				}
				AccountMap.HASHMAP.addAccount(account);
				UserSessionMap.HASHMAP.addUserSession(randString, uname);

				gr = new LoginResponse(randString);
				return Response.ok(gr)
						.cookie(new NewCookie("name", "Hello, world!")).build();
			}

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/authentication/home")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getHomeResponseInJSON(@Context Request req, String data) {

		GeneralResponse gr;
		try {
			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("homeErr_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("homeErr_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("homeErr_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			if (UserSessionMap.HASHMAP.userSessionExists(token)) {

				String uname = UserSessionMap.HASHMAP.getUsername(token);
				UserAccount ua = AccountMap.HASHMAP.getAccount(uname);
				gr = ua.getHomeResponse();

			} else {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
			}
			return Response.ok(gr).build();

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/authentication/change/userpassword")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChangePasswordInJSON(@Context Request req, String data) {

		GeneralResponse gr;
		try {
			JSONObject jsonData = new JSONObject(data);
			boolean changepw = false;
			boolean resetpw = false;
			String token = "";
			if (jsonData.has("sessionToken")) {
				token = jsonData.getString("sessionToken");
				changepw = true;
			}
			String opw = jsonData.getString("oldPassword");
			String npw = jsonData.getString("newPassword");
			String uname = "";
			if (jsonData.has("username")) {
				uname = jsonData.getString("username");
				if (!changepw)
					resetpw = true;
			}

			String randString = UUID.randomUUID().toString();
			randString = randString.substring(0, randString.indexOf("-"));

			if (token.equals("err_0001") || (!changepw && !resetpw)) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (opw.equals(null) || opw.length() == 0
					|| opw.equals("err_1003")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1003,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (npw.equals("err_1008")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1008,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			if (uname.length() > 0) {
				// After a sign up you arrived to home directly (not via login)
				if (!AccountMap.HASHMAP.accountExists(uname)) {
					UserAccount ua = TestAccounts
							.createUserForTestCase("generic");
					ua.setLogin(uname);
					ua.pwd = npw;
					AccountMap.HASHMAP.addAccount(ua);
				}
				UserSessionMap.HASHMAP.addUserSession(randString, uname);
			}

			gr = new ChangePasswordResponse(randString);

			return Response.ok(gr).build();

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/authentication/securityquestion")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getGetSecurityQuestionInJSON(@Context Request req,
			String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {
			JSONObject jsonData = new JSONObject(data);
			String ctn = jsonData.getString("ctn");

			if (ctn.equals(null) || ctn.length() == 0 || ctn.endsWith("1006")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1006,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (ctn.endsWith("0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (ctn.endsWith("0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else {
				gr = new SecurityQuestionResponse("What is your dog's name?");
				return Response.ok(gr).build();
			}
		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/authentication/verifypin")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getPINVerificationInJSON(@Context Request req, String data) {

		GeneralResponse gr;

		try {
			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");
			String pin = jsonData.getString("PIN");

			if (token.equals(null) || token.length() == 0
					|| token.equals("ERROR_8001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_8001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			String uname = "Zippy";
			UserAccount ua = null;

			if (UserSessionMap.HASHMAP.userSessionExists(token)) {
				// Active Session
				uname = UserSessionMap.HASHMAP.getUsername(token);
				if (AccountMap.HASHMAP.accountExists(uname)) {
					ua = AccountMap.HASHMAP.getAccount(uname);
					// Initial check to ensure that PIN is not null or empty
					if (pin.equals(null) || pin.length() == 0) {
						// We should probably increment the retries value here
						// too.
						ua.setPinRetries(ua.getPinRetries() + 1);
						gr = new StatusResponse(Status.FAILURE);
						return Response.ok(gr).build();
					}

					if (ua.getPIN().equals(pin)) {
						// Reset PIN retries
						ua.setPinRetries(0);
						// Add flag to say PIN verified
						// ua.setPINverified(true);
						gr = new StatusResponse(Status.SUCCESS);

					} else {

						ua.setPinRetries(ua.getPinRetries() + 1);
						// LOGGER.log(Level.INFO, "No of retries" +
						// ua.getPinRetries());

						if (ua.getPinRetries() >= UserAccount.MAX_PIN_RETRIES) {
							// Logout the session
							UserSessionMap.HASHMAP.removeUserSession(token);
							gr = new ErrorMessagesResponse(new ErrorResponse(
									ErrorResponse.Error.ERROR_8001,
									ErrorResponse.Severity.ERROR));
						} else {
							gr = new ErrorMessagesResponse(new ErrorResponse(
									ErrorResponse.Error.ERROR_8000,
									ErrorResponse.Severity.ERROR));
						}
					}

				} else {
					// Not a valid user in the session
					gr = new StatusResponse(Status.FAILURE);
				}
			} else {
				gr = new StatusResponse(Status.FAILURE);
			}
			return Response.ok(gr).build();

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/authentication/setCurrentLine")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSwitchedLineVerificationInJSON(@Context Request req,
			String data) {

		GeneralResponse gr;
		UserAccount ua;

		try {
			JSONObject jsonData = new JSONObject(data);

			String ctn = jsonData.getString("ctn");
			String token = jsonData.getString("sessionToken");

			if (ctn.equals(null) || ctn.length() == 0) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1006,
						ErrorResponse.Severity.ERROR));
			} else {
				if (UserSessionMap.HASHMAP.userSessionExists(token)) {
					// This is a valid token, line switch allowed.
					String uname = UserSessionMap.HASHMAP.getUsername(token);
					if (AccountMap.HASHMAP.accountExists(uname)) {
						ua = AccountMap.HASHMAP.getAccount(uname);
						boolean ctnExists = false;
						// TODO Add check to see if ctn exists in list of
						// subscribers
						for (SubscriberLineInfo subscriber : ua
								.getSubscribers()) {
							LOGGER.log(Level.INFO, "Subscriber ctn: "
									+ subscriber.getCtn());
							if (subscriber.getCtn().equals(ctn)) {
								ctnExists = true;
							}
						}
						if (ctnExists) {
							ua.setActiveLine(ctn);
						} else {
							gr = new StatusResponse(Status.FAILURE);
							return Response.ok(gr).build();
						}
					}
					gr = new StatusResponse(Status.SUCCESS);
				} else {
					// Invalid token
					gr = new StatusResponse(Status.FAILURE);
				}
			}
			return Response.ok(gr).build();

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/authentication/securityquestion/validate")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getValidateSecurityQuestionInJSON(@Context Request req,
			String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {
			JSONObject jsonData = new JSONObject(data);
			String ctn = jsonData.getString("ctn");
			String secResponse = jsonData.getString("securityQuestionAnswer");

			if (secResponse.equals(null) || secResponse.length() == 0
					|| secResponse.equals("returnFailure")
					|| secResponse.equals("err_1004")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1004,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (ctn.equals(null) || ctn.length() == 0
					|| ctn.endsWith("0001") || secResponse.equals("err_1001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (ctn.endsWith("0000") || secResponse.equals("err_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (ctn.endsWith("1006") || secResponse.equals("err_1006")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1006,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			String randString = UUID.randomUUID().toString();
			randString = randString.substring(0, randString.indexOf("-"));

			gr = new ValidateSecurityQuestionResponse("Bobby");
			return Response.ok(gr).build();

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	// @Path("/authentication/change/vmpassword")
	@Path("profile/change/vmpassword")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getResetVMPasswordInJSON(@Context Request req, String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_2000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_2000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equalsIgnoreCase("returnFailure")) {
				gr = new StatusResponse(Status.FAILURE);
				return Response.ok(gr).build();
			} else {
				gr = new StatusResponse(Status.SUCCESS);
				return Response.ok(gr).build();
			}

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/register")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSelfRegistrationInJSON(@Context Request req, String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {
			JSONObject jsonData = new JSONObject(data);
			String ctn = jsonData.getString("ctn");
			String uname = jsonData.getString("username");

			String randString = UUID.randomUUID().toString();
			randString = randString.substring(0, randString.indexOf("-"));

			if (uname.equals(null) || uname.length() == 0 || ctn.equals(null)
					|| ctn.length() == 0 || ctn.endsWith("0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (ctn.endsWith("0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (uname.equals("err_1005")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1005,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (ctn.endsWith("1006")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1006,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (ctn.endsWith("1007")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_1007,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			gr = new StatusResponse(Status.SUCCESS);
			return Response.ok(gr).build();

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/authentication/logout")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getLogoutInJSON(@Context Request req, String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");
			String ctn = jsonData.getString("ctn");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else {
				// on login clear services
				if (UserSessionMap.HASHMAP.userSessionExists(token)) {
					String uname = UserSessionMap.HASHMAP.getUsername(token);
					AccountMap.HASHMAP.getAccount(uname).getAddedServices(ctn)
							.clear();
				}

				gr = new StatusResponse(Status.SUCCESS);
				return Response.ok(gr).build();
			}

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/planandservices")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getPlanAndServicesInJSON(@Context Request req, String data) {

		GeneralResponse gr = null;

		try {
			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");
			String ctn = jsonData.getString("ctn");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("gpas_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("gpas_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("gpas_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			JSONArray services = ResourceUtility
					.getFileAsJSONArr("data/usp.json");
			if (token.equals("gpas_small")) {
				services = ResourceUtility
						.getFileAsJSONArr("data/usp2.json");
			}

			ArrayList<String> incSrvcs = new ArrayList<String>();
			for (int i = 0; i < services.length(); i++) {
				JSONObject service = services.getJSONObject(i);
				incSrvcs.add(service.getString("label"));
			}

			ArrayList<ServiceInformation> addedSrvcs = new ArrayList<ServiceInformation>();

			PlanInformationObject pio = null;
			String uname;
			UserAccount ua;
			if (UserSessionMap.HASHMAP.userSessionExists(token)) {
				uname = UserSessionMap.HASHMAP.getUsername(token);

				if (uname.endsWith("timeout")) {
					gr = new ErrorMessagesResponse(new ErrorResponse(
							ErrorResponse.Error.ERROR_7000,
							ErrorResponse.Severity.ERROR));
					return Response.ok(gr).build();
				}
				if (AccountMap.HASHMAP.accountExists(uname)) {
					ua = AccountMap.HASHMAP.getAccount(uname);
					ua.setCurrentTransaction(null);
					pio = ua.getPlan(ctn);

					if (pio != null) {
						pio = ua.getPlan(ctn);
					} else {
						gr = new ErrorMessagesResponse(new ErrorResponse(
								ErrorResponse.Error.ERROR_0002,
								ErrorResponse.Severity.ERROR));
						return Response.ok(gr).build();
					}

					addedSrvcs = ua.getAddedServices(ctn);
					if (addedSrvcs == null) {
						addedSrvcs = new ArrayList<ServiceInformation>();
					}

					gr = new PlanAndServicesResponse(pio, incSrvcs, addedSrvcs);
				}
			} else {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}
			// addedSrvcs.add(new ServiceInformation("AOLMTSMV",
			// "Add-On Limited SMS MMS VOICE - For ST", null, "55",
			// ServiceInformation.REC, true));
			// addedSrvcs.add(new ServiceInformation("17",
			// "International SMS", "100 International SMS", "55",
			// ServiceInformation.OT, 2, true));
			// addedSrvcs.add(new ServiceInformation("14",
			// "Casual Browsing - 250MB", "250MB Data Bundle", "55",
			// "REC", false));

			return Response.ok(gr).build();

		} catch (JSONException e) {
			e.printStackTrace();
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
			
		}
	}

	@POST
	@Path("/planandservices/available")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAvailableServicesInJSON(@Context Request req, String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");
			// String planId = ""; removed from IDD

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("gas_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("gas_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("gas_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			ArrayList<ServiceInformation> addedSrvcs = new ArrayList<ServiceInformation>();
			ArrayList<ServiceInformation> availSrvcs = new ArrayList<ServiceInformation>();

			// addedSrvcs.add(new ServiceInformation("16",
			// "International Calls",
			// "60mins International Calls", "55",
			// ServiceInformation.OT, 1, true));
			// addedSrvcs.add(new ServiceInformation("17", "International SMS",
			// "100 International SMS", "55", ServiceInformation.OT, 1,
			// true));
			// addedSrvcs.add(new ServiceInformation("14",
			// "Casual Browsing - 250MB", "250MB Data Bundle", "55",
			// ServiceInformation.REC, true));

			JSONArray services = ResourceUtility
					.getFileAsJSONArr("data/available_services.json");

			for (int i = 0; i < services.length(); i++) {
				JSONObject service = services.getJSONObject(i);
				try {
					ServiceInformation serviceInformation = new ServiceInformation(service);
					availSrvcs.add(serviceInformation);
				} catch (ParseException p) {
					p.printStackTrace();
				}
			}

			gr = new AvailableServicesResponse(addedSrvcs, availSrvcs);
			return Response.ok(gr).build();

		} catch (JSONException e) {
			e.printStackTrace();
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/planandservices/validate")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChangeServiceVerificationInJSON(@Context Request req,
			String data) {

		GeneralResponse gr;
		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("gcsv_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("gcsv_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("gcsv_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}
			LOGGER.log(Level.INFO, data.toString());
			MockUserTransaction transaction = new MockUserTransaction(data);

			UserAccount ua = null;
			if (UserSessionMap.HASHMAP.userSessionExists(token)) {
				String uname = UserSessionMap.HASHMAP.getUsername(token);
				if (AccountMap.HASHMAP.accountExists(uname)) {
					ua = AccountMap.HASHMAP.getAccount(uname);
					ua.setCurrentTransaction(transaction);
				}
			} else {
				// HTML help page

				float balance = 0;
				float balanceAfterProcessing = 0;
				float debitFromBalance = 0;

				PaymentObject ip = new PaymentObject("0", "0", "0", "0", "55.0");

				gr = new ChangeServiceVerificationResponse(null, ip, balance,
						balanceAfterProcessing, debitFromBalance);
				return Response.ok(gr).build();
			}

			/* Next bill is not used in this version */
			PaymentObject nb = new PaymentObject("35.00", "10.00", "0.85",
					"6.88", "52.73");

			float totalPrice = transaction.getChangePrice();
			float taxRate = 0 * totalPrice;
			float toPay = totalPrice + taxRate;
			float immediatePayement = 0;
			float balanceAfterProcessing = ua.getBalance();
			float debitFromBalance = 0;
			if (ua.getBalance() >= toPay) {
				balanceAfterProcessing = ua.getBalance() - toPay;
				debitFromBalance = toPay;
			} else {
				balanceAfterProcessing = 0;
				immediatePayement = toPay - ua.getBalance();
				debitFromBalance = ua.getBalance();
			}

			transaction.balanceAfterProcessing = balanceAfterProcessing;
			transaction.immediatePayement = immediatePayement;
			transaction.debitFromBalance = debitFromBalance;

			PaymentObject ip = new PaymentObject("0", "0", "0", "" + taxRate,
					"" + immediatePayement);

			ArrayList<String> warningMssgs = new ArrayList<String>();
			ArrayList<String> confSocArr = new ArrayList<String>();

			// Random r = new Random();
			// for (int i = 0; i < 5; i++) {
			// int j = r.nextInt(15);
			// if (j % 4 == 0) {
			// warningMssgs.add("warning message " + i);
			// }
			// if (j % 5 == 0) {
			// confSocArr.add("" + i+i);
			// }
			// }
			//
			// ValidationInfoResponse valInfoR = new ValidationInfoResponse(
			// warningMssgs, confSocArr);

			gr = new ChangeServiceVerificationResponse(null, ip,
					ua.getBalance(), balanceAfterProcessing, debitFromBalance);
			return Response.ok(gr).build();

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/planandservices/submit")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSubmitChangeServicesInJSON(@Context Request req,
			String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");
			String ctn = jsonData.getString("ctn");
			JSONArray addedArray = jsonData.getJSONArray("addedServices");
			JSONArray removedArray = jsonData.getJSONArray("removedServices");

			ArrayList<String> addedSrvcs = new ArrayList<String>();
			ArrayList<String> rmvdSrvcs = new ArrayList<String>();

			for (int i = 0; i < addedArray.length(); i++) {
				addedSrvcs.add(addedArray.getString(i));
			}
			for (int j = 0; j < removedArray.length(); j++) {
				rmvdSrvcs.add(removedArray.getString(j));
			}

			addedSrvcs.trimToSize();
			rmvdSrvcs.trimToSize();

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("scs_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("scs_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("scs_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			if (token.equalsIgnoreCase("returnFailure")) {
				gr = new StatusResponse(Status.FAILURE);
				return Response.ok(gr).build();
			} else {

				gr = new StatusResponse(Status.SUCCESS);
				if (UserSessionMap.HASHMAP.userSessionExists(token)) {
					UserAccount account = AccountMap.HASHMAP
							.getAccount(UserSessionMap.HASHMAP
									.getUsername(token));
					MockUserTransaction shopTransaction = account
							.getMockUserTransaction();
					account.setCurrentTransaction(null);
					if (shopTransaction != null) {
						// update plan
						for (ServiceInformation oService : shopTransaction.addedService) {
							account.addService(ctn, oService);
						}
						for (ServiceInformation oService : shopTransaction.removedServices) {
							account.removeService(ctn, oService.getServiceId());
						}

						// apply changes to balance
						account.setBalance(shopTransaction.balanceAfterProcessing);
					}
				}
				return Response.ok(gr).build();
			}

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/profile/details")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProfileInformationInJSON(@Context Request req,
			String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("gpi_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("gpi_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("gpi_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			String uname = "Zippy";
			UserAccount ua;
			String accountStatus = "Active";

			if (UserSessionMap.HASHMAP.userSessionExists(token)) {
				uname = UserSessionMap.HASHMAP.getUsername(token);
				if (AccountMap.HASHMAP.accountExists(uname)) {
					ua = AccountMap.HASHMAP.getAccount(uname);
					accountStatus = ua.getAccountStatus();
				}
			}

			Address profileAddress;
			if (token.endsWith("POBOX")) {
				profileAddress = new Address(Address.PO_BOX,
						"9401 NW 106TH ST", "54321", "Zigopolis", "MO", "777");
			} else if (token.endsWith("RURAL")) {
				profileAddress = new Address(Address.RURAL_ROUTE,
						"Old Farm Road", "20002", "Zig County", "MO",
						"rural01", "000002");
			} else {
				profileAddress = new Address(Address.STREET,
						"9401 NW 106TH ST", "54321", "Zigopolis", "MO");
			}

			ArrayList<SubscriberDetails> subcriberDetailsArray;

			subcriberDetailsArray = new ArrayList<SubscriberDetails>();
			subcriberDetailsArray.add(new SubscriberDetails("1111111753",
					"iPhone 5", "123456789101112"));

			// For multi line subscribers
			if (uname.indexOf("multi") > -1) {
				subcriberDetailsArray.add(new SubscriberDetails("1111111754",
						"Sansung Galaxy S4", "123456789101113"));
				subcriberDetailsArray.add(new SubscriberDetails("1111111754",
						"SmartZIG 12 Ultra", "123456789101114"));
			}

			Calendar date = Calendar.getInstance();
			int nextBillDueDays = 12;
			date.add(Calendar.DAY_OF_YEAR, nextBillDueDays);
			gr = new ProfileInformationResponse(uname, "777666555",
					date.getTime(), "9", "03455430", "67899876",
					"u.langer@work.com", profileAddress, "334445555",
					accountStatus, subcriberDetailsArray);
			return Response.ok(gr).build();

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}
	}

	@POST
	@Path("/profile/update")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUpdateProfileInformationInJSON(@Context Request req,
			String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");
			String hPhone = jsonData.getString("homePhoneNumber");
			String bPhone = jsonData.getString("businessPhoneNumber");
			String email = jsonData.getString("email");
			JSONObject address = jsonData.getJSONObject("address");
			String city = address.getString("city");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("upi_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("upi_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (city.equals("err_6000") || token.equals("upi_6000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_6000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("upi_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			if (token.equalsIgnoreCase("returnFailure")) {
				gr = new StatusResponse(Status.FAILURE);
				return Response.ok(gr).build();
			} else {
				gr = new StatusResponse(Status.SUCCESS);
				return Response.ok(gr).build();
			}

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/billdetails")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBillDetailsInJSON(@Context Request req, String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("gbd_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("gbd_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("gbd_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			Calendar c = Calendar.getInstance();
			c.add(Calendar.DAY_OF_YEAR, -12);
			c.add(Calendar.MONTH, 1);

			int num = 1000 + (int) (Math.random() * ((9999 - 1000) + 1));
			AutoPayDetailsObject apdo = new AutoPayDetailsObject(true,
					"****-****-****-" + num, "Bello", CreditCardType.VISA,
					"0716", "35000");

			String uname;
			uname = "Bobby";
			gr = new JSONResponseUtility().getGenericBillDetailsResponse(uname);
			if (UserSessionMap.HASHMAP.userSessionExists(token)) {
				uname = UserSessionMap.HASHMAP.getUsername(token);
				if (AccountMap.HASHMAP.accountExists(uname)) {
					UserAccount ua = AccountMap.HASHMAP.getAccount(uname);
					// Get individual Billing details here from the user
					// account.
				}
			}
			return Response.ok(gr).build();

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}
	}

	@POST
	@Path("/payment/transactions")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTransactionsHistoryInJSON(@Context Request req,
			String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");
			String mnth = "";
			if (jsonData.has("cycleMonth")) {
				mnth = jsonData.getString("cycleMonth");
			}
			JSONObject pagInfo;
			String pagSize = "";
			String pagNum = "";
			if (jsonData.has("pagination")) {
				pagInfo = jsonData.getJSONObject("pagination");
				pagSize = pagInfo.getString("pageSize");
				pagNum = pagInfo.getString("pageNumber");
			}

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("gth_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("gth_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("gth_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			Calendar c = Calendar.getInstance();
			c.add(Calendar.DAY_OF_YEAR, -11);

			ArrayList<TransactionObject> taoArray = new ArrayList<TransactionObject>();

			for (int i = 1; i < 10; i++) {
				taoArray.add(new TransactionObject(c.getTime(), "Direct Debit",
						"MRC paid by direct debit", "47.88", "0.00"));
				c.add(Calendar.MONTH, -1);
			}

			gr = new TransactionsHistoryResponse(taoArray);
			return Response.ok(gr).build();

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}
	}

	@POST
	@Path("/payment/auto/details")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAutomaticPaymentInJSON(@Context Request req, String data) {

		GeneralResponse gr;

		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");
			String uname = "";
			UserAccount ua;

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("gap_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("gap_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("gap_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			if (UserSessionMap.HASHMAP.userSessionExists(token)) {
				uname = UserSessionMap.HASHMAP.getUsername(token);

				if (AccountMap.HASHMAP.accountExists(uname)) {
					ua = AccountMap.HASHMAP.getAccount(uname);
					gr = ua.getAutoPayDetails();
				} else {
					gr = new ErrorMessagesResponse(new ErrorResponse(
							ErrorResponse.Error.ERROR_7000,
							ErrorResponse.Severity.ERROR));
				}

			} else if (token.endsWith("zzzzz")) {
				gr = new AutoPayDetailsObject(false);
			} else {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
			}

			return Response.ok(gr).build();

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/togglepinauthentication")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTogglePINSecurity(@Context Request req, String data) {
		return Response.ok(new GeneralResponse()).build();

	}

	@POST
	@Path("/payment/auto/create")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCreateAutoPaymentInJSON(@Context Request req, String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {

			String uname = "";
			UserAccount ua;

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");
			String zipcode = jsonData.getString("postalCode");

			JSONObject cardInfo = jsonData.getJSONObject("creditCard");
			String cardNum = cardInfo.getString("cardNumber");
			String cardName = cardInfo.getString("cardName");
			String cardExpDate = cardInfo.getString("cardExpirationDate");
			String cardType = cardInfo.getString("cardType");
			String cardSecCode = cardInfo.getString("securityCode");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("cap_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("cap_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (cardName.equals("err_5000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_5000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("cap_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			int num = 1000 + (int) (Math.random() * ((9999 - 1000) + 1));

			CreditCardType ccType;
			if (cardType.startsWith("v") || cardType.startsWith("V")) {
				ccType = CreditCardType.VISA;
			} else if (cardType.startsWith("m") || cardType.startsWith("M")) {
				ccType = CreditCardType.MASTERCARD;
			} else if (cardType.startsWith("a") || cardType.startsWith("A")) {
				ccType = CreditCardType.AM_EX;
			} else if (cardType.substring(0, 3).equalsIgnoreCase("dis")) {
				ccType = CreditCardType.DISCOVERY;
			} else if (cardType.substring(0, 3).equalsIgnoreCase("din")) {
				ccType = CreditCardType.DINERS;
			} else
				ccType = CreditCardType.VISA;

			gr = new AutoPayDetailsObject(true, "**** **** ****-"
					+ cardNum.substring(cardNum.length() - 4), cardName,
					ccType, cardExpDate, zipcode);

			if (UserSessionMap.HASHMAP.userSessionExists(token)) {
				uname = UserSessionMap.HASHMAP.getUsername(token);
				ua = AccountMap.HASHMAP.getAccount(uname);
				ua.setAutoPay((AutoPayDetailsObject) gr);
			}

			if (token.equalsIgnoreCase("returnFailure")) {
				gr = new StatusResponse(Status.FAILURE);
				return Response.ok(gr).build();
			} else {
				gr = new StatusResponse(Status.SUCCESS);
				return Response.ok(gr).build();
			}

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/payment/auto/delete")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getDeleteAutomaticPaymentInJSON(@Context Request req,
			String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {

			String uname = "";
			UserAccount ua;

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("dap_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("dap_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_3000") || token.equals("dap_3000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_3000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("dap_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equalsIgnoreCase("returnFailure")) {
				gr = new StatusResponse(Status.FAILURE);
				return Response.ok(gr).build();
			} else {

				if (UserSessionMap.HASHMAP.userSessionExists(token)) {
					uname = UserSessionMap.HASHMAP.getUsername(token);
					ua = AccountMap.HASHMAP.getAccount(uname);
					ua.disableAutoPay();
				}

				gr = new StatusResponse(Status.SUCCESS);
				return Response.ok(gr).build();

			}
		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/payment/onetime")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMakeOTPaymentInJSON(@Context Request req, String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");
			String amnt = jsonData.getString("amount");
			String zipcode = jsonData.getString("postalCode");
			JSONObject cardInfo = jsonData.getJSONObject("creditCard");
			String cardNum = cardInfo.getString("cardNumber");
			String cardName = cardInfo.getString("cardName");
			String cardExpDate = cardInfo.getString("cardExpirationDate");
			String cardType = cardInfo.getString("cardType");
			String cardSecCode = cardInfo.getString("securityCode");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("motp_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("motp_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (cardName.equals("err_5000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_5000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (cardName.equals("err_5001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_5001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (cardName.equals("err_5002")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_5002,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (cardName.equals("err_6000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_6000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (cardName.equals("err_0002")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0002,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("motp_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			else if (cardInfo.length() == 0 || cardInfo.equals(null)) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						"Please enter paymentInformation",
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			String confID = UUID.randomUUID().toString();
			confID = confID.substring(0, confID.indexOf("-"));

			if (UserSessionMap.HASHMAP.userSessionExists(token)) {
				UserAccount account = AccountMap.HASHMAP
						.getAccount(UserSessionMap.HASHMAP.getUsername(token));
				account.setAccountStatus("Active");

				if (account.getMockUserTransaction() == null) {
					// it's a refuel
					account.refuel(Float.parseFloat(amnt));
				} else {
					// shop with immediate payment
				}
				gr = new MakeOTPaymentResponse(confID, amnt, String.format(
						"%.2f", account.getBalance()));
				return Response.ok(gr).build();
			} else {
				Random r = new Random();
				int shillings = r.nextInt(34) + 10;
				int pence = r.nextInt(89) + 10;

				gr = new MakeOTPaymentResponse(confID, amnt, shillings + "."
						+ pence);
				return Response.ok(gr).build();

			}

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/usage/details")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUsageDetailsInJSON(@Context Request req, String data) {

		GeneralResponse gr;
		ResponseBody body;

		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");
			String fDate = jsonData.getString("fromDate");
			String tDate = jsonData.getString("toDate");
			String ctn = jsonData.getString("ctn");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("gud_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("gud_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_4002") || token.equals("gud_4002")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_4002,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_7000") || token.equals("gud_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (fDate.length() == 0 || fDate.equals(null)) {
				gr = new ErrorMessagesResponse(
						new ErrorResponse("Please enter a fromDate",
								ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (tDate.length() == 0 || tDate.equals(null)) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						"Please enter a toDate", ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			// Usage details are now added to user JSON, and populated in the
			// UserAccount
			UsageDetailsResponse udr = new UsageDetailsResponse();

			if (UserSessionMap.HASHMAP.userSessionExists(token)) {
				String uname = UserSessionMap.HASHMAP.getUsername(token);
				UserAccount ua = AccountMap.HASHMAP.getAccount(uname);

				try {
					ArrayList<UsageDetailsObject> usageDetails = ua
							.getUsageDetails(ctn);
					for (UsageDetailsObject udo : usageDetails) {
						// If the
						DateTimeFormatter fmt = DateTimeFormat
								.forPattern("MM/dd/yyyy");

						DateTime startDate = fmt.parseDateTime(fDate);
						DateTime endDate = fmt.parseDateTime(tDate);
						DateTime eventDate = new DateTime(udo.EVENT_DATE);
						if (eventDate.isBefore(endDate)
								&& eventDate.isAfter(startDate)) {
							udr.addUsageDetailsObject(udo);
						}
					}
				} catch (NullPointerException npe) {
					// No records for this CTN, what to do here?
					LOGGER.log(Level.WARNING, "NPE: No records for " + ctn);
				}
			}

			return Response.ok(udr).build();

		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}
	}

	@POST
	@Path("/usage/summary")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUsageSummaryInJSON(@Context Request req, String data) {

		GeneralResponse gr;

		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");
			String ctn = jsonData.getString("ctn");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("gus_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("gus_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			else if (token.equals("err_7000") || token.equals("gus_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			if (UserSessionMap.HASHMAP.userSessionExists(token)) {
				String uname = UserSessionMap.HASHMAP.getUsername(token);
				UserAccount ua = AccountMap.HASHMAP.getAccount(uname);
				gr = new UsageSummaryResponse(ua.getLimitedServices(ctn));

			} else {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
			}

			return Response.ok(gr).build();
		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/chatInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChatInfoInJSON(@Context Request req, String data) {

		GeneralResponse gr;
		try {

			JSONObject jsonData = new JSONObject(data);
			String token = jsonData.getString("sessionToken");

			if (token.equals(null) || token.length() == 0
					|| token.equals("err_0001") || token.equals("chat_0001")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0001,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			} else if (token.equals("err_0000") || token.equals("chat_0000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_0000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			else if (token.equals("err_7000") || token.equals("chat_7000")) {
				gr = new ErrorMessagesResponse(new ErrorResponse(
						ErrorResponse.Error.ERROR_7000,
						ErrorResponse.Severity.ERROR));
				return Response.ok(gr).build();
			}

			String accountId = "8029";
			String chatSessionTimer = "180";
			String timeBeforeChatSessionExpires = "60";
			String errorMsgVerbiage = "Aio Chat is available 7 am - 12 am ET. We may also have a lot of chatters or a technical issue and don't want you to have to wait. Please check back later or call Support at 1-855-aio-aio1 (1-855-246-2461).";

			gr = new ChatInfoResponse(accountId, chatSessionTimer,
					errorMsgVerbiage, timeBeforeChatSessionExpires);
			return Response.ok(gr).build();
		} catch (JSONException e) {
			gr = new ErrorMessagesResponse(new ErrorResponse("JSONException: "
					+ e, ErrorResponse.Severity.FATAL));
			return Response.ok(gr).build();
		}

	}

	@POST
	@Path("/cookie/set")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response setCookie(@Context Request req) {
		return Response.ok(new JSONObject())
				.cookie(new NewCookie("foo", "" + System.currentTimeMillis()))
				.build();
	}

	@POST
	@Path("/cookie/get")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCookie(@Context Request req,
			@CookieParam(value = "foo") String firstVisitMS) {
		JSONObject jsonObject = new JSONObject();
		try {
			jsonObject.put("firstVisit", firstVisitMS);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return Response.ok(jsonObject).build();
	}

}