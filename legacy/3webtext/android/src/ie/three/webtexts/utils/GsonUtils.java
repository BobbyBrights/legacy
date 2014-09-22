package ie.three.webtexts.utils;

import ie.three.webtexts.objects.AddressBook;
import ie.three.webtexts.objects.Contact;
import ie.three.webtexts.objects.ContactTypes;

import com.google.gson.Gson;

public class GsonUtils {

	public GsonUtils() {
		// TODO Auto-generated constructor stub

	}

	public static AddressBook getNetworkAddressBookFromJson(String s) {
		Gson gson = new Gson();
		AddressBook a = gson.fromJson(s, AddressBook.class);
		if (null != a.entries) {
			for (Contact c : a.entries) {
				c.setType(ContactTypes.CONTACT_TYPE_NETWORK);
				c.selected = false;
			}
		}
		return a;
	}

}
