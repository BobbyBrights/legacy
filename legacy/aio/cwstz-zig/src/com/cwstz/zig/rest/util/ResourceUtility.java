package com.cwstz.zig.rest.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

public class ResourceUtility {

	public static JSONObject getFileAsJSONObj(String filename) throws NullPointerException {
		
		JSONObject jsonObj = null;

		String line;
		StringBuilder builder = new StringBuilder();
		BufferedReader reader = new BufferedReader(new InputStreamReader(Thread
				.currentThread().getContextClassLoader()
				.getResourceAsStream(filename)));
		try {
			while ((line = reader.readLine()) != null) {
				builder.append(line);
			}

			jsonObj = new JSONObject(builder.toString());

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return jsonObj;

	}
	
	public static JSONArray getFileAsJSONArr(String filename) {
		
		JSONArray jsonObj = null;

		String line;
		StringBuilder builder = new StringBuilder();
		BufferedReader reader = new BufferedReader(new InputStreamReader(Thread
				.currentThread().getContextClassLoader()
				.getResourceAsStream(filename)));
		try {
			while ((line = reader.readLine()) != null) {
				builder.append(line);
			}
			
			jsonObj = new JSONArray(builder.toString());

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return jsonObj;

	}
}
