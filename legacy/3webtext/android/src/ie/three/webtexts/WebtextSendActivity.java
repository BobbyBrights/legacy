package ie.three.webtexts;

import ie.three.webtexts.api.HttpAuthCredentials;
import ie.three.webtexts.api.WebServiceDelegate;
import ie.three.webtexts.api.json.JSONResponse;
import ie.three.webtexts.api.json.objects.ResourceReference;
import ie.three.webtexts.base.WebtextBaseActivity;
import ie.three.webtexts.objects.Contact;
import ie.three.webtexts.objects.ContactTypes;
import ie.three.webtexts.objects.Group;
import ie.three.webtexts.objects.WebtextMessage;
import ie.three.webtexts.utils.FileIO;
import ie.three.webtexts.utils.WebtextUtilities;
import ie.three.webtexts.view.layout.FlowLayout;
import ie.three.webtexts.view.layout.FlowLayout.LayoutParams;

import java.io.File;
import java.io.FileNotFoundException;
import java.net.URLDecoder;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Random;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.preference.PreferenceManager;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.ads.AdRequest;
import com.google.ads.AdView;
import com.google.gson.Gson;

@SuppressLint({ "HandlerLeak", "HandlerLeak" })
public class WebtextSendActivity extends WebtextBaseActivity {

	/*
	 * (non-Javadoc)
	 * 
	 * @see android.app.Activity#onResume()
	 */
	@Override
	protected void onResume() {
		// TODO Auto-generated method stub
		super.onResume();
		screenInitialize();
	}

	
	public Button sendMessageBtn;
	public Button pickContactBtn;
	public TextView remainingTexts;
	public EditText contacts;
	public LinearLayout l;
	public HttpAuthCredentials h;
	public String webtextContacts;
	public Context mContext;
	public ArrayList<Contact> selectedContacts = new ArrayList<Contact>();
	public ArrayList<Group> selectedGroups = new ArrayList<Group>();

	public static final int CONTACTS_SELECTED = 1001;
	public static final int POPULATE_MESSAGE = 1002;

	public WebtextMessage m;
	public WebServiceDelegate ws;
	public TextView remainingAllowanceText;

	public Handler messageSenderHandler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			Bundle b = msg.getData();
			String response = b.getString("response");
			decipher(response);
		}
	};

	public Handler accountUpdateHandler = new Handler() {
		@SuppressWarnings("unused")
		@Override
		public void handleMessage(Message msg) {
			Bundle b = msg.getData();
			String response = b.getString("response");
			Gson gson = new Gson();
			JSONResponse ref = gson.fromJson(response, JSONResponse.class);
			if (ref.getRemainingAllowance() > 0) {
				remainingAllowanceText.setText(MessageFormat.format(
						getResources().getString(R.string.remaining_texts),
						String.valueOf(ref.getRemainingAllowance())));
				remainingAllowanceText.setVisibility(View.VISIBLE);
			}
		}
	};

	public void sendMessage(View v) {
		String fname = getFilesDir()
				+ getApplicationContext().getResources().getString(
						R.string.nab_filename);
		EditText e = (EditText) findViewById(R.id.message_text);
		String t = e.getText().toString();

		if (selectedContacts.size() > 0 || selectedGroups.size() > 0) {

			if (!("").equals(t)) {
				Log.i(TAG, fname);
				ArrayList<Contact> _recipients = new ArrayList<Contact>();
				m = new WebtextMessage();

				_recipients.addAll(selectedContacts);
				try {
					_recipients.addAll(WebtextUtilities
							.convertGroupstoContactList(selectedGroups, fname));
				} catch (FileNotFoundException ex) {
					ex.printStackTrace();
				}

				_recipients = ContactsActivity
						.removeDuplicatesAndSort(_recipients);
				Log.i("Webtext", "Sorted list size: " + _recipients.size());
				ArrayList<String> _a = new ArrayList<String>();
				for (Contact _r : _recipients) {
					_a.add(WebtextUtilities.cleanMsisdn(_r.address));
				}

				m.setAddress(_a);
				m.setMessage(e.getText().toString());
				m.setMessageContacts(selectedContacts);
				m.setMessageGroup(selectedGroups);

				Gson gson = new Gson();
				String json = gson.toJson(m);
				actuallySendMessage(h, json);

			} else {
				showRandomMessage(R.array.error_msgs_no_msg, Toast.LENGTH_LONG);
			}
		} else {
			showRandomMessage(R.array.error_msgs_no_recipients,
					Toast.LENGTH_LONG);
		}
	}

	private void actuallySendMessage(final HttpAuthCredentials h2,
			final String json) {
		Toast.makeText(
				this,
				"Message scheduled for sending. I'll notify you if its successful.",
				Toast.LENGTH_SHORT).show();

		Thread thread = new Thread() {
			@Override
			public void run() {
				try {
					Message msg = new Message();
					String response = ws.postSendMessage(json);
					Bundle b = new Bundle();
					b.putString("response", response);
					msg.setData(b);
					messageSenderHandler.sendMessage(msg);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		};
		thread.start();
	}

	protected void decipher(String response) {
		Log.i("Webtext.sendMessage", response);
		Gson gson = new Gson();
		JSONResponse j = gson.fromJson(response, JSONResponse.class);
		if (null != j.resourceReference
				&& j.resourceReference instanceof ResourceReference) {
			ResourceReference r = j.resourceReference;
			if (null != r.resourceURL && !("").equals(r.resourceURL)) {
				// Message sent successfully, toast it.
				Toast.makeText(this, "Message sent!", Toast.LENGTH_LONG).show();
				m.setStatus(WebtextMessage.MESSAGE_SENT);
				updateMessagesRemaining(h);
			}
		} else {
			Toast.makeText(
					this,
					"Something went wrong, I could not send your message at this time.",
					Toast.LENGTH_LONG).show();
			m.setStatus(WebtextMessage.MESSAGE_NOT_SENT);
		}
		saveMessageToFilestore(m);
	}

	private void updateMessagesRemaining(final HttpAuthCredentials h2) {
		remainingAllowanceText = (TextView) findViewById(R.id.remaining_texts);
		remainingAllowanceText.setVisibility(View.INVISIBLE);

		// TODO Auto-generated method stub
		Thread thread = new Thread() {
			@Override
			public void run() {
				try {
					Message msg = new Message();
					String response = ws.getAccountDetailsAsJson();
					Bundle b = new Bundle();
					b.putString("response", response);
					msg.setData(b);
					accountUpdateHandler.sendMessage(msg);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		};
		thread.start();
	}

	@SuppressWarnings("unchecked")
	private void saveMessageToFilestore(WebtextMessage m2) {
		m2.setSentDate(new Date());
		String fname = getFilesDir()
				+ getApplicationContext().getResources().getString(
						R.string.msgs_filename);

		ArrayList<WebtextMessage> messageList = new ArrayList<WebtextMessage>();
		if (new File(fname).exists()) {
			try {
				messageList = (ArrayList<WebtextMessage>) FileIO
						.retrieveFromFile(fname);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		Log.i(TAG, messageList.toString());
		messageList.add(m2);

		try {
			FileIO.saveToFile(fname, messageList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		// TODO Limit to stored messages number
		Log.i(TAG, "Message saved to fileStore");
	}

	public void loadContacts(View v) {
		Intent intent = new Intent(mContext, ContactsActivity.class);
		intent.putExtra("auth", h);
		intent.putExtra("selectedContacts", selectedContacts);
		intent.putExtra("selectedGroups", selectedGroups);
		startActivityForResult(intent, CONTACTS_SELECTED);
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		mContext = this;
		setContentView(R.layout.send);
		screenInitialize();
	}

	private void screenInitialize() {
		SharedPreferences prefs = PreferenceManager
				.getDefaultSharedPreferences(getApplicationContext());
		String u = prefs.getString("msisdn", "");
		String p = prefs.getString("pin", "");
		resizeScreenElements();

		if (u.equals("") || p.equals("")) {
			// TODO Add logic to check if preferences file exists, and if not,
			// redirect to preferences screen.
			showPreferences();
		} else {
			h = new HttpAuthCredentials(u, p);
			ws = new WebServiceDelegate(h);
			// final Context ctx = getApplicationContext();
			updateMessagesRemaining(h);
		}
	}

	private void resizeScreenElements() {
		// TODO Auto-generated method stub

		DisplayMetrics metrics = new DisplayMetrics();
		getWindowManager().getDefaultDisplay().getMetrics(metrics);
		Log.i(TAG, "Screen size is " + metrics.densityDpi);

		EditText msgText = (EditText) findViewById(R.id.message_text);

		switch (metrics.densityDpi) {
		case DisplayMetrics.DENSITY_LOW:
			Log.i(TAG, "Screen size is low ");
			msgText.setLayoutParams(new LinearLayout.LayoutParams(
					LinearLayout.LayoutParams.MATCH_PARENT, 0, 3));
			msgText.setSingleLine();
			msgText.setLines(1);
			break;
		case DisplayMetrics.DENSITY_MEDIUM:
			Log.i(TAG, "Screen size is medium ");
			break;
		case DisplayMetrics.DENSITY_HIGH:
			Log.i(TAG, "Screen size is high ");
			break;
		}
		//Toast.makeText(mContext, metrics.densityDpi + "", Toast.LENGTH_LONG.show();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		super.onCreateOptionsMenu(menu);
		MenuInflater inflater = getMenuInflater();
		inflater.inflate(R.menu.send_message_menu, menu);
		return true;
	}

	public void showHistory() {
		Intent intent = new Intent(WebtextSendActivity.this,
				ViewHistoryActivity.class);
		startActivityForResult(intent, POPULATE_MESSAGE);
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		super.onOptionsItemSelected(item);
		// Handle item selection
		switch (item.getItemId()) {
		case R.id.history:
			showHistory();
			return true;
		case R.id.preferences:
			showPreferences();
			return true;
		default:
			return super.onOptionsItemSelected(item);
		}
	}

	private void showPreferences() {
		Intent intent = new Intent(WebtextSendActivity.this,
				PreferencesActivity.class);
		startActivity(intent);
	}

	public void showRandomMessage(int res, int length) {
		String[] m = getResources().getStringArray(res);
		Random r = new Random();
		Toast.makeText(this, m[r.nextInt(m.length)], length).show();
	}

	public void addArbitraryContact(View v) {
		EditText e = (EditText) findViewById(R.id.msisdn);
		if (e.getText().toString().equals("")) {
			showRandomMessage(R.array.error_msgs_no_input, Toast.LENGTH_SHORT);
		} else {
			Contact _c = new Contact(e.getText().toString(), e.getText()
					.toString());
			_c.setType(ContactTypes.CONTACT_TYPE_ARBITRARY);
			selectedContacts.add(_c);
			populateRecipients();
			e.setText("");
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		switch (requestCode) {
		case CONTACTS_SELECTED:
			if (resultCode == RESULT_OK) {
				Bundle b = data.getExtras();
				ArrayList<Contact> c = (ArrayList<Contact>) b.get("contacts");
				ArrayList<Group> g = (ArrayList<Group>) b.get("groups");
				int size = c.size();
				for (Group f : g) {
					size += f.groupEntries.size();
				}
				Toast.makeText(this, size + " contacts selected in total",
						Toast.LENGTH_SHORT).show();
				Log.i("Webtext", c.toString());
				selectedContacts = c;
				selectedGroups = g;
				populateRecipients();

			}
			break;
		case POPULATE_MESSAGE:
			if (resultCode == RESULT_OK) {
				Bundle b = data.getExtras();
				WebtextMessage w = (WebtextMessage) b.get("message");
				if (null != w.getMessageContacts()) {
					selectedContacts = w.getMessageContacts();
				}
				EditText e = (EditText) findViewById(R.id.message_text);
				e.setText(w.getMessage());
				populateRecipients();
			}
			break;
		}
	}

	public void populateRecipients() {

		final FlowLayout selectedContactsPanel = (FlowLayout) this
				.findViewById(R.id.flow_layout);
		LayoutParams flowLayoutParams = new LayoutParams(15, 15);
		final LayoutInflater inflater = (LayoutInflater) getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		selectedContactsPanel.removeAllViews();

		if (selectedContacts != null) {
			for (final Contact _c : selectedContacts) {

				Button _sc = (Button) inflater.inflate(R.layout.contact_button,
						null);
				if (_c.type == ContactTypes.CONTACT_TYPE_NETWORK) {
					_sc.setText(URLDecoder.decode(_c.name));
				} else {
					_sc.setText(_c.name);
				}
				_sc.setPadding(10, 0, 0, 10);
				_sc.setTag(_c);

				_sc.setOnClickListener(new View.OnClickListener() {
					public void onClick(View v) { // Perform action on click
						selectedContacts.remove(_c);
						selectedContactsPanel.removeView(v);
					}
				});

				_sc.setPadding(20, 10, 10, 10);
				selectedContactsPanel.addView(_sc, flowLayoutParams);
			}
		}
		if (selectedGroups != null) {

			for (final Group _c : selectedGroups) {

				Button _sc = (Button) inflater.inflate(R.layout.group_button,
						null);

				_sc.setText(_c.name);
				_sc.setPadding(10, 0, 0, 10);
				_sc.setTag(_c);

				_sc.setOnClickListener(new View.OnClickListener() {
					public void onClick(View v) { // Perform action on click
						selectedGroups.remove(_c);
						selectedContactsPanel.removeView(v);
					}
				});

				_sc.setPadding(20, 10, 10, 10);
				selectedContactsPanel.addView(_sc, flowLayoutParams);
			}
		}
		ScrollView scrollView = (ScrollView) findViewById(R.id.scroller);
		scrollView.smoothScrollTo(0, selectedContactsPanel.getBottom());
	}

}
