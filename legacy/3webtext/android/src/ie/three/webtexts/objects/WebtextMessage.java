package ie.three.webtexts.objects;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

public class WebtextMessage implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2566397077945365694L;

	public String message;
	public ArrayList<Contact> messageContacts;
	public ArrayList<Group> messageGroup;
	public ArrayList<String> address; 
	
	public static final int MESSAGE_SENT = 1;
	public static final int MESSAGE_NOT_SENT = 2;
	
	public Date scheduledDate;
	public Date sentDate;
	
	public int status; 
	
	public WebtextMessage() {

	}

	public WebtextMessage(ArrayList<Contact> r, ArrayList<Group> g, String m, Date d) {
		this.messageContacts = r;
		this.messageGroup = g;
		this.message = m;
		this.scheduledDate = d;
	}

	// For immediate sending
	public WebtextMessage(ArrayList<Contact> r, ArrayList<Group> g, String m) {
		this.messageContacts = r;
		this.messageGroup = g;
		this.message = m;
	}



	public ArrayList<Contact> getMessageContacts() {
		return messageContacts;
	}

	public void setMessageContacts(ArrayList<Contact> messageContacts) {
		this.messageContacts = messageContacts;
	}

	public ArrayList<Group> getMessageGroup() {
		return messageGroup;
	}

	public void setMessageGroup(ArrayList<Group> messageGroup) {
		this.messageGroup = messageGroup;
	}

	public Date getScheduledDate() {
		return scheduledDate;
	}

	public void setScheduledDate(Date scheduledDate) {
		this.scheduledDate = scheduledDate;
	}

	public ArrayList<String> getAddress() {
		return address;
	}

	public void setAddress(ArrayList<String> address) {
		this.address = address;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Date getSentDate() {
		return sentDate;
	}

	public void setSentDate(Date sentDate) {
		this.sentDate = sentDate;
	}



}
