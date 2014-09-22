package ie.three.webtexts;

import ie.three.webtexts.adapters.ContactsListAdapter;
import ie.three.webtexts.adapters.GroupsListAdapter;
import ie.three.webtexts.api.HttpAuthCredentials;
import ie.three.webtexts.api.WebServiceDelegate;
import ie.three.webtexts.objects.AddressBook;
import ie.three.webtexts.objects.Contact;
import ie.three.webtexts.objects.ContactList;
import ie.three.webtexts.objects.ContactTypes;
import ie.three.webtexts.objects.Group;
import ie.three.webtexts.singleton.WebtextApplication;
import ie.three.webtexts.utils.FileIO;
import ie.three.webtexts.utils.GsonUtils;
import ie.three.webtexts.utils.WebtextUtilities;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import android.app.Activity;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.Button;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.google.gson.Gson;

public class ContactsActivity extends Activity {

	public ArrayList<Contact> allContacts = new ArrayList<Contact>();
	public ArrayList<Contact> selectedContacts = new ArrayList<Contact>();
	public List<Group> allGroups = new ArrayList<Group>();
	public ArrayList<Group> selectedGroups = new ArrayList<Group>();
	public Intent i;
	public final static String TAG = "Webtext.ContactsActivity";
	public Context m;
	public final static int GETTING_CONTACTS_DIALOG = 1000;
	ProgressDialog applicationDialog;

	public static ArrayList<Integer> selectedRows = new ArrayList<Integer>();

	public HttpAuthCredentials h;

	public ContactsActivity() {
		// TODO Auto-generated constructor stub
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see android.app.Activity#onCreate(android.os.Bundle)
	 */
	@SuppressWarnings("unchecked")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.contacts);
		i = getIntent();
		m = this;
		h = (HttpAuthCredentials) i.getExtras().get("auth");
		selectedContacts = (ArrayList<Contact>) i.getExtras().get(
				"selectedContacts");
		selectedGroups = (ArrayList<Group>) i.getExtras().get("selectedGroups");

		buildListView();
		updateStatusBar();
	}

	private void buildListView() {
		// TODO Auto-generated method stub
		String fname = getApplicationContext().getResources().getString(
				R.string.nab_filename);
		try {
			Object o = FileIO.retrieveFromFile(getFilesDir() + fname);
			if (o instanceof AddressBook) {
				AddressBook a = (AddressBook) o;
				allContacts.addAll(a.entries);
				allGroups = a.groups;
			}
		} catch (FileNotFoundException fne) {
			// TODO prompt to download contacts
		}

		allContacts.addAll(new WebtextUtilities()
				.getPhoneContactsWithMobileNumber(m));

		allContacts = removeDuplicatesAndSort(allContacts);

		final ListView contacts = (ListView) findViewById(R.id.contacts_list_view);
		final ContactsListAdapter contactsListAdapter = new ContactsListAdapter(
				m, R.layout.contacts_list_row, allContacts);
		List<Integer> selectedContactRows = new ArrayList<Integer>();
		List<Integer> selectedGroupRows = new ArrayList<Integer>();

		for (Contact x : allContacts) {
			if (selectedContacts.contains(x)) {
				selectedContactRows
						.add(Integer.valueOf(allContacts.indexOf(x)));
			}
		}

		if (selectedContactRows.size() > 0) {
			contactsListAdapter.setSelectedRows(selectedContactRows);
		}

		contacts.setAdapter(contactsListAdapter);
		contacts.setFastScrollEnabled(true);
		contacts.setOnItemClickListener(new OnItemClickListener() {
			public void onItemClick(AdapterView<?> adapter, View v,
					int position, long arg3) {
				contactsListAdapter.toggleSelected(position);
				toggleContactedSelected((Contact) adapter
						.getItemAtPosition(position));
				updateStatusBar();
			}

		});

		ListView groups = (ListView) findViewById(R.id.groups_list_view);
		final GroupsListAdapter groupsListAdapter = new GroupsListAdapter(m,
				R.layout.groups_list_row, allGroups);
		groups.setAdapter(groupsListAdapter);
		for (Group x : allGroups) {
			if (selectedGroups.contains(x)) {
				selectedGroupRows.add(Integer.valueOf(allGroups.indexOf(x)));
			}
		}

		if (selectedGroupRows.size() > 0) {
			groupsListAdapter.setSelectedRows(selectedGroupRows);
		}
		groups.setOnItemClickListener(new OnItemClickListener() {
			public void onItemClick(AdapterView<?> adapter, View v,
					int position, long arg3) {
				groupsListAdapter.toggleSelected(position);
				toggleGroupSelected((Group) adapter.getItemAtPosition(position));
				updateStatusBar();
			}

		});

	}

	public void contactsDone(View view) {
		Log.i(TAG, selectedContacts.size() + "");
		Log.i(TAG, i.getClass().getName());

		Bundle bundle = new Bundle();
		bundle.putSerializable("contacts", selectedContacts);
		bundle.putSerializable("groups", selectedGroups);
		i.putExtras(bundle);
		// i.putEx
		if (getParent() == null) {
			setResult(Activity.RESULT_OK, i);
		} else {
			getParent().setResult(Activity.RESULT_OK, i);
		}
		finish();
	}

	private void updateStatusBar() {
		// TODO Auto-generated method stub
		RelativeLayout statusBar = (RelativeLayout) findViewById(R.id.status);
		int size = 0;
		size = selectedContacts.size();

		for (Group g : selectedGroups) {
			size += g.groupEntries.size();
		}

		if (size > 0) {
			TextView statusText = (TextView) statusBar
					.findViewById(R.id.status_text);
			Button acceptButton = (Button) statusBar.findViewById(R.id.accept);
			acceptButton.setText("Done");
			statusText.setText(size + " contacts selected.");
			statusBar.setVisibility(View.VISIBLE);
		} else {
			statusBar.setVisibility(View.INVISIBLE);
		}

	}

	private void toggleContactedSelected(Contact c) {
		if (selectedContacts.contains(c)) {
			selectedContacts.remove(c);
		} else {
			selectedContacts.add(c);
		}
	}

	private void toggleGroupSelected(Group g) {
		if (selectedGroups.contains(g)) {
			selectedGroups.remove(g);
		} else {
			selectedGroups.add(g);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static ArrayList<Contact> removeDuplicatesAndSort(
			ArrayList<Contact> allContacts) {
		Set _a = new LinkedHashSet(allContacts);
		allContacts.clear();
		allContacts.addAll(_a);
		Collections.sort(allContacts);
		return allContacts;
	}

	@Override
	protected Dialog onCreateDialog(int id) {
		applicationDialog = new ProgressDialog(ContactsActivity.this);
		applicationDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
		switch (id) {
		case GETTING_CONTACTS_DIALOG:
			applicationDialog.setMessage("Retrieving your network contacts...");
			return applicationDialog;
		default:
			return null;
		}
	}

}
