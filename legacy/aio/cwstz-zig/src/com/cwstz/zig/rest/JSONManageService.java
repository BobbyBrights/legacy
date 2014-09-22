package com.cwstz.zig.rest;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.Collection;
import java.util.Date;
import java.util.Locale;
import java.util.Random;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.joda.time.DateTime;

import com.cwstz.zig.responses.ErrorMessagesResponse;
import com.cwstz.zig.responses.ErrorResponse;
import com.cwstz.zig.responses.GeneralResponse;
import com.cwstz.zig.responses.ResponseBody;
import com.cwstz.zig.responses.UsageDetailsObject;
import com.cwstz.zig.responses.UsageDetailsResponse;
import com.cwstz.zig.responses.UserAccount;
import com.cwstz.zig.session.AccountMap;

@Path("/manage")
public class JSONManageService {
	@SuppressWarnings("unused")
	private final static Logger LOGGER = Logger
			.getLogger(JSONManageService.class.getName());

	public JSONManageService() {
		Locale.setDefault(Locale.US);
	}

	@GET
	@Path("/user")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.WILDCARD)
	public Response getUser(@QueryParam("name") String name) {
		if (AccountMap.HASHMAP.accountExists(name)) {
			UserAccount account = AccountMap.HASHMAP.getAccount(name);
			return Response.ok(account).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).build();
		}

	}

	@GET
	@Path("/usernames")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.WILDCARD)
	public Response getUserNames() {
		Collection<UserAccount> accounts = AccountMap.HASHMAP.getAccounts();
		JSONArray names = new JSONArray();
		for (UserAccount userAccount : accounts) {
			names.put(userAccount.getLogin());
		}
		return Response.ok(names).build();
	}

	/*
	 * 
	 * This utility allows you to generate sample usage data. 
	 */
	
	@GET
	@Path("/usage_data")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.WILDCARD)
	public Response generateUsageData() {
		UsageDetailsResponse udr = new UsageDetailsResponse();

		long fdMillis = new Date().getTime(); // 3 months ago
		long tdMillis = new DateTime().minusMonths(3).getMillis();
		long diff = tdMillis - fdMillis;

		// Only data is used for now in usage details
		String[][] type = { { "Data", "kB", "-", "233" },
				{ "MMS", "MMS", "3312341234", "1" },
				{ "SMS", "SMS", "3312341234", "1" },
				{ "International SMS", "SMS", "4412341234", "1" },
				{ "Premium SMS", "SMS", "01234", "1" },
				{ "Call", "mins", "3312341234", "16" },
				{ "International Call", "mins", "4412341234", "9" },
				{ "Long Distance Call", "mins", "3312341234", "13" } };

		Random r = new Random();
		int j = r.nextInt(14) + 20;

		for (int k = 0; k < j; k++) {
			long randDate = fdMillis + (long) (Math.random() * diff);
			long randUsage = (long) (Math.random() * 10000);

			int i = r.nextInt(8);
			udr.addUsageDetailsObject(new UsageDetailsObject(
					new Date(randDate), type[i][0], new BigDecimal(randUsage),
					type[i][1], type[i][2]));
		}

		return Response.ok(udr).build();
		
	}

}