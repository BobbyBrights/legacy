package ie.three.webtexts.objects;

import java.io.Serializable;
import java.util.List;


public class AddressBook implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6380765836340114048L;
	public List<Contact> entries;
	public List<Group> groups;
	
}
