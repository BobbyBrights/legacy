package ie.three.webtexts.utils;

import ie.three.webtexts.objects.AddressBook;
import ie.three.webtexts.objects.Contact;
import ie.three.webtexts.objects.ContactTypes;
import ie.three.webtexts.objects.Group;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

import android.content.Context;
import android.database.Cursor;
import android.provider.ContactsContract;
import android.util.Log;

public class WebtextUtilities {

	public WebtextUtilities() {
		// TODO Auto-generated constructor stub
	}

	public static String cleanMsisdn(String address) {
		// TODO Auto-generated method stub
		return address.replaceAll("[^A-Za-z0-9\\+\\:]", "");
	}

	public static ArrayList<Contact> convertGroupstoContactList(
			ArrayList<Group> g, String filename) throws FileNotFoundException {
		ArrayList<Contact> a = new ArrayList<Contact>();
		AddressBook ab = (AddressBook) FileIO.retrieveFromFile(filename);
		for (Group _x : g) {
			// _x is the group in the outer list, ie: selectedGroups
			for (String s : _x.groupEntries) {

				for (Contact c : ab.entries) {
					if (c.getName().equals(s)) {
						a.add(c);
					}
				}
			}
		}
		Log.i("Webtext.WebtextUtilities", "Unsorted list size: " + a.size());
		return a;
	}

	public List<Contact> getPhoneContactsWithMobileNumber(Context ctx) {

		List<Contact> c = new ArrayList<Contact>();

		Cursor phones = ctx.getContentResolver().query(
				ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, null,
				null, null);

		while (phones.moveToNext()) {
			String name = phones
					.getString(phones
							.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
			String phoneNumber = phones
					.getString(phones
							.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
			int type = phones
					.getInt(phones
							.getColumnIndex(ContactsContract.CommonDataKinds.Phone.TYPE));

			if (type == ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE
					&& !("").equals(name)) {
				Contact t = new Contact(name, phoneNumber,
						ContactTypes.CONTACT_TYPE_PHONE);
				t.setSelected(false);
				c.add(t);
			}
		}

		phones.close();
		return c;

	}

	public static String recipientsToString(ArrayList<Contact> messageContacts) {
		String s = "";
		try {
			if (messageContacts != null) {
				for (Contact c : messageContacts) {
					s += c.name + ", ";
				}
			}
		} catch (NullPointerException npe) {
			s = "No contacts set.";
		}
		return s;
	}
}
