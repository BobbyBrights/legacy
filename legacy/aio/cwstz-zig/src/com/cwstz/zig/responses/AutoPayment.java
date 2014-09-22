package com.cwstz.zig.responses;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
// JAX-RS supports an automatic mapping from JAXB annotated class to XML and
// JSON
// Isn't that cool?
public class AutoPayment {
	final SimpleDateFormat expDateFormat = new SimpleDateFormat("MM/yyyy");
	private String creditCard;
	private String name;
	private Date expDate;

	public AutoPayment() {

	}

	public AutoPayment(String creditCard, String name, String date) throws ParseException {
		this.creditCard = creditCard;
		this.name = name;
		this.expDate = expDateFormat.parse(date);
	}

	public String getCreditCard() {
		return creditCard;
	}

	public void setCreditCard(String creditCard) {
		this.creditCard = creditCard;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getExpDate() {
		return expDateFormat.format(expDate);
	}

	public void setExpDate(String date) throws ParseException {
		this.expDate = expDateFormat.parse(date);
	}

}