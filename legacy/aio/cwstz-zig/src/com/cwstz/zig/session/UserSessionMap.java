package com.cwstz.zig.session;

import java.util.HashMap;
import java.util.Iterator;

public enum UserSessionMap {
	
	HASHMAP;
	
	private HashMap<String, String> _userSessionMap;
	
	private UserSessionMap(){
		_userSessionMap  = new HashMap<String, String>();
	}
	
	public synchronized void addUserSession(String us, String id){
		_userSessionMap.put(us, id);
	}
	
	public synchronized void removeUserSession(String us){
		_userSessionMap.remove(us);
	}
	
	public synchronized boolean userSessionExists(String us){
		return _userSessionMap.containsKey(us);
	}
	
	public synchronized String getUsername(String us){
		String username = "";
		if(_userSessionMap.containsKey(us)){
			username = _userSessionMap.get(us);
		}
		
		return username;
	}
	


}
