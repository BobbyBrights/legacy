package ie.three.webtexts.api.json;

import org.json.JSONObject;

public class JSONUtilities {
	public Boolean isEmpty(JSONObject j){
		return j.length() > 0; 
	}
}
