package com.cwstz.zig.responses;


import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect   // use this annotation if you don't have getters and setters for each JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)    // use this if there isn't an exact correlation between JSON and class properties
public class UsageDetailsResponse extends GeneralResponse {
	@JsonProperty
	private ArrayList usageDetails;

	public UsageDetailsResponse() {
		this.usageDetails = new ArrayList();
	}
	
	public UsageDetailsResponse(ArrayList usageDetails) {
		this.usageDetails = usageDetails;
	}
	
	public void addUsageDetailsObject(UsageDetailsObject udo){
		this.usageDetails.add(udo);
		Collections.sort(this.usageDetails, new UsageDetailsComparator());
		
	}

}
//used to order the usage events before returning them
class UsageDetailsComparator implements Comparator<UsageDetailsObject>{
	@Override
    public int compare(UsageDetailsObject udo1, UsageDetailsObject udo2) {
        return udo1.EVENT_DATE.compareTo(udo2.EVENT_DATE);
    }
}