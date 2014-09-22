package com.cwstz.zig.session;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;

import com.cwstz.zig.responses.AutoPayDetailsObject;
import com.cwstz.zig.responses.UserAccount;

public enum AccountMap {

	HASHMAP;
	
	private HashMap<String, UserAccount> _accountMap;
	
	public Collection<UserAccount> getAccounts() {
		return _accountMap.values();
	}

	private AccountMap(){
		_accountMap  = new HashMap<String, UserAccount>();
	}
	
	public synchronized void addAccount(UserAccount ua){
		_accountMap.put(ua.getLogin(), ua);
	}
	
	public synchronized boolean accountExists(String un){
		return _accountMap.containsKey(un);
	}
	
	public synchronized UserAccount getAccount(String un){
		return _accountMap.get(un);
	}
	
	public synchronized void setAutoPay(String un, AutoPayDetailsObject apdo){
		
	}
}
