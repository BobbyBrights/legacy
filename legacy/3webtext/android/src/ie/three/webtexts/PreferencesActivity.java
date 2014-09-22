package ie.three.webtexts;

import ie.three.webtexts.api.HttpAuthCredentials;
import ie.three.webtexts.api.WebServiceDelegate;
import ie.three.webtexts.objects.AddressBook;
import ie.three.webtexts.singleton.WebtextApplication;
import ie.three.webtexts.utils.FileIO;
import ie.three.webtexts.utils.GsonUtils;
import android.annotation.SuppressLint;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.preference.EditTextPreference;
import android.preference.Preference;
import android.preference.Preference.OnPreferenceClickListener;
import android.preference.PreferenceActivity;
import android.preference.PreferenceManager;
import android.text.InputType;
import android.util.Log;
import android.widget.Toast;

@SuppressLint("HandlerLeak")
public class PreferencesActivity extends PreferenceActivity {

	public final static int UPDATING_CONTACTS_DIALOG = 1000;
	public AddressBook a;
	ProgressDialog cDialog;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		addPreferencesFromResource(R.xml.prefs);
		try {

			final EditTextPreference msisdn = (EditTextPreference) findPreference("msisdn");
			msisdn.getEditText().setInputType(InputType.TYPE_CLASS_PHONE);
			final EditTextPreference pin = (EditTextPreference) findPreference("pin");
			pin.getEditText().setInputType(InputType.TYPE_CLASS_PHONE);

			Log.i("PreferencesActivity: msisdn", msisdn.getText().toString());
			Log.i("PreferencesActivity: pin", pin.getText().toString());

			/* Implement syncNow */
			Preference customPref = (Preference) findPreference("syncNow");
			customPref
					.setOnPreferenceClickListener(new OnPreferenceClickListener() {
						public boolean onPreferenceClick(Preference preference) {
							String m = msisdn.getText().toString();
							String p = pin.getText().toString();
							if (!("").equals(m) && !("").equals(p)) {
								HttpAuthCredentials h = new HttpAuthCredentials(
										m, p);
								updateAddressBook(h);
							} else {
								Toast.makeText(
										getApplicationContext(),
										"Both Number and PIN need to be set above before you can update contacts.",
										Toast.LENGTH_SHORT).show();
							}
							return true;
						}

					});

			Preference clearPref = (Preference) findPreference("clearPrefs");

			Log.i("Webtext.PreferencesActivity", clearPref.toString());

			clearPref
					.setOnPreferenceClickListener(new OnPreferenceClickListener() {
						public boolean onPreferenceClick(Preference preference) {
							SharedPreferences prefs = PreferenceManager
									.getDefaultSharedPreferences(getApplicationContext());
							Editor e = prefs.edit();
							e.clear();
							e.commit();
							Toast.makeText(getApplicationContext(),
									"Preferences cleared.", Toast.LENGTH_SHORT)
									.show();
							return true;
						}
					});
		} catch (NullPointerException npe) {
			npe.printStackTrace();
		}

	}

	public void updateAddressBook(final HttpAuthCredentials h) {
		if (WebtextApplication.hasNetworkConnection()) {
			showDialog(UPDATING_CONTACTS_DIALOG);
			Thread thread = new Thread() {
				@Override
				public void run() {
					try {
						Looper.prepare();

						Message msg = new Message();
						WebServiceDelegate ws = new WebServiceDelegate(h);
						String response = ws.getAddressBookAsJson();
						if (!response.equals("")) {
							Bundle b = new Bundle();
							b.putString("address_json", response);
							msg.setData(b);
							contactsUpdateHandler.sendMessage(msg);
						} else {
							contactsUpdateHandler.sendEmptyMessage(0);
						}
						Looper.loop();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			};
			thread.start();
		} else {
			// TODO Make toast for no network activity.
		}
	}

	public Handler contactsUpdateHandler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			Log.i("Webtext.PreferencesActivity", "Message returned to handler");
			Bundle b = msg.getData();
			String j = b.getString("address_json");
			Log.i("JSON", j.toString());

			a = GsonUtils.getNetworkAddressBookFromJson(j);
			syncNow();
		}

	};

	protected Dialog onCreateDialog(int id) {
		switch (id) {
		case UPDATING_CONTACTS_DIALOG:
			cDialog = new ProgressDialog(PreferencesActivity.this);
			cDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
			cDialog.setMessage("Updating contacts, please be patient...");
			return cDialog;
		default:
			return null;
		}
	}

	private Boolean syncNow() {
		// TODO Implement NAB Syncer
		String fname = getApplicationContext().getResources().getString(
				R.string.nab_filename);
		String fileName = getFilesDir().getAbsolutePath() + fname;
		Log.i("Webtext.PreferencesActivity", fileName);
		killDialogs();
		if (a != null) {
			new FileIO().saveToFile(fileName, a);
			Toast.makeText(this, "We are go, contacts saved locally.",
					Toast.LENGTH_SHORT).show();
		} else {
			Toast.makeText(this, "Huston, we have a problem.",
					Toast.LENGTH_SHORT).show();
		}
		return false;
	}

	private void killDialogs() {
		try {
			// Kill all dialogs
			dismissDialog(UPDATING_CONTACTS_DIALOG);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("unused")
	private void clearAllMessages() {
		// TODO this function will wipe local storage for messages

	}
}
