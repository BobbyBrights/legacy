package ie.three.webtexts.api;

import java.io.Serializable;

public class HttpAuthCredentials  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6162244043033075281L;
	public HttpAuthCredentials() {
		
	}
	
	public HttpAuthCredentials(String s, String v) {
		this.msisdn = s;
		this.pin = v;
	}

	public String getMsisdn() {
		return msisdn;
	}

	public void setMsisdn(String msisdn) {
		this.msisdn = msisdn;
	}

	public void setAuthCredentials(String msisdn, String pin) {
		setMsisdn(msisdn);
		setPin(pin);
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	public String msisdn;
	public String pin;

}
