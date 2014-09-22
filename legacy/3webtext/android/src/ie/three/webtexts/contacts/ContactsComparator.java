package ie.three.webtexts.contacts;

import ie.three.webtexts.objects.Contact;

import java.util.Comparator;

public class ContactsComparator implements Comparator<Contact>{

	public int compare(Contact lhs, Contact rhs) {
		// TODO Auto-generated method stub
		
		if(lhs.getName() != null && rhs.getName() != null){
			String a = lhs.getName().toUpperCase();
			String b = rhs.getName().toUpperCase();
			
			return a.compareTo(b);
		}
		return 0;
	}
	

}
