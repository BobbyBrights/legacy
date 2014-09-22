package com.cwstz.zig.responses;

import java.util.ArrayList;

public class PlanArray {

//	ArrayList<PlanInformationObject> _plans;
	
	private static ArrayList<PlanInformationObject> _plans;
	
	static {
		String[] pNames = {"Communicator","Go-Getter","Trailblazer","Tablet Toter","Zig Safeguard","Zig International","Add-A-Gig"};
		String[] pDetails = {
				"If you’re one of those say-it-with-words type of people, this is your plan. " +
				"You get all the talk and text you could ever imagine and just the right amount of data. " +
				"Put it into words with Zig and you’ll always have someone to talk to.",
				
				"For that link-everywhere-share-everything type of person. " +
				"You’ve got unlimited talk and text and all the data you’ll ever need. " +
				"So, get out there, see what comes your way and leave the rest to us.",
				
				"For those at-one-with-your-device types. Welcome to the more-data-talk-and-textthan-you-ever-thought-possible plan. " +
				"Make sure your device is charged because you’re going to be busy",
				
				"Made for the gotta-have-my-tablet-everywhere-I-go kind of person. " +
				"Plenty of data to keep you connected while you’re on the go. You now have a companion for all your travels.",
				
				"Ever have one of those wish-you-bubble-wrapped-your-phone days? Instead, make it a nothing’s-gonna-bring-me-down day. " +
				"With Zig Safeguard, you and your device have one less thing to worry about.",
				
				"For all those friends-around-the-globe callers out there, you have no limits on how much you can talk and message to over 30 countries. " +
				"So, chat it up, out and across the globe.",
				
				"Sometimes you need just a little bit more data. To be safe, here’s a whole gig more. Don’t be shy with it."	
		};
		_plans = new ArrayList<PlanInformationObject>();
		for(int i=0;i<pNames.length;i++){
			PlanInformationObject element = new PlanInformationObject();
			element.setPlanId("zig_0"+i+1);
			element.setPlanName(pNames[i]);
			element.setPlanDescription(pDetails[i]);
			element.setPlanMRC(55);
			_plans.add(i, element);
		}
		
	}
	
	public static PlanInformationObject getPlan(int p){
		return _plans.get(p);
	}

	public static PlanInformationObject getRandomPlan(){
		int p = (int)(Math.random()*7);
		return _plans.get(p);
	}

	//public synchronized PlanArray
}
