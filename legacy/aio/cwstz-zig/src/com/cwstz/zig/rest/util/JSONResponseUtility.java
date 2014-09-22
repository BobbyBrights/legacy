package com.cwstz.zig.rest.util;

import java.util.ArrayList;

import com.cwstz.zig.responses.BillDetailsAddedService;
import com.cwstz.zig.responses.BillDetailsAdjustment;
import com.cwstz.zig.responses.BillDetailsCredit;
import com.cwstz.zig.responses.BillDetailsDiscount;
import com.cwstz.zig.responses.BillDetailsPlan;
import com.cwstz.zig.responses.BillDetailsProfileSubscriberDetails;
import com.cwstz.zig.responses.BillDetailsResponse;

public class JSONResponseUtility {

	public BillDetailsResponse getGenericBillDetailsResponse(String uname) {

		ArrayList<BillDetailsProfileSubscriberDetails> subscriberDetails;
		ArrayList<BillDetailsCredit> credits;
		ArrayList<BillDetailsAdjustment> adjustments;
		ArrayList<BillDetailsDiscount> discounts;
		ArrayList<BillDetailsAddedService> addedServices;

		subscriberDetails = new ArrayList<BillDetailsProfileSubscriberDetails>();
		credits = new ArrayList<BillDetailsCredit>();
		adjustments = new ArrayList<BillDetailsAdjustment>();
		
		credits.add(new BillDetailsCredit("Account credit", "7.00"));
		credits.add(new BillDetailsCredit("Referral Credit", "2.00"));
		credits.add(new BillDetailsCredit("Promo Credit", "3.00"));
		credits.add(new BillDetailsCredit("New Line Credit", "4.00"));

		adjustments.add(new BillDetailsAdjustment("Bridge Pay Fee", "5.00"));
		adjustments
				.add(new BillDetailsAdjustment("Line Suspended Fee", "6.00"));
		
		
		discounts = new ArrayList<BillDetailsDiscount>();

		addedServices = new ArrayList<BillDetailsAddedService>();

		addedServices.add(new BillDetailsAddedService("AIO Gig", "10.00"));

		subscriberDetails.add(new BillDetailsProfileSubscriberDetails(
				"1234567890", false, new BillDetailsPlan("Pro Plan", "60.00"),
				discounts, addedServices));

		
		// For multi line subscribers
		if (uname.indexOf("multi") > -1) {

			discounts = new ArrayList<BillDetailsDiscount>();
			addedServices = new ArrayList<BillDetailsAddedService>();

			discounts.add(new BillDetailsDiscount("Second line", "5.00"));
			addedServices
					.add(new BillDetailsAddedService("AIO Protect", "5.00"));

			subscriberDetails.add(new BillDetailsProfileSubscriberDetails(
					"1234567891", false, new BillDetailsPlan("Smart Plan",
							"50.00"), discounts, addedServices));

			discounts = new ArrayList<BillDetailsDiscount>();
			addedServices = new ArrayList<BillDetailsAddedService>();

			discounts.add(new BillDetailsDiscount("Third line", "10.00"));
			
			
			addedServices
					.add(new BillDetailsAddedService("AIO Thing", "10.00"));

			subscriberDetails.add(new BillDetailsProfileSubscriberDetails(
					"1234567892", false, new BillDetailsPlan("Bad Plan",
							"80.00"), discounts, addedServices));

			discounts = new ArrayList<BillDetailsDiscount>();
			addedServices = new ArrayList<BillDetailsAddedService>();

			discounts.add(new BillDetailsDiscount("Fourth line", "15.00"));

			subscriberDetails.add(new BillDetailsProfileSubscriberDetails(
					"1234567893", false, new BillDetailsPlan("Young Plan",
							"30.00"), discounts, addedServices));

			discounts = new ArrayList<BillDetailsDiscount>();
			addedServices = new ArrayList<BillDetailsAddedService>();

			discounts.add(new BillDetailsDiscount("Fifth line", "20.00"));

			subscriberDetails.add(new BillDetailsProfileSubscriberDetails(
					"1234567894", false, new BillDetailsPlan("Old Plan",
							"35.00"), discounts, addedServices));

		}

		return new BillDetailsResponse("231.00", subscriberDetails, credits,
				adjustments);

	}

}
