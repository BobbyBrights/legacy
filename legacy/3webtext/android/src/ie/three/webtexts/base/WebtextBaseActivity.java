package ie.three.webtexts.base;

import ie.three.webtexts.R;
import ie.three.webtexts.api.HttpAuthCredentials;
import ie.three.webtexts.notification.Notify;
import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;

public class WebtextBaseActivity extends Activity {

	public static final String PREFS_NAME = "WebtextPrefsFile";
	public static final String TAG = "Webtext";
	public static final int LOGIN_BTN = 100;
	public static final int LOGIN_DIALOG = 0;
	public static final int CONTACTS_SELECTED = 200;

	@Override
	public void onStart() {
		super.onStart();
		/*
		 * Override the onStart method to check for an active connection if no
		 * connection active, we can load a different layout informing the
		 * customer that no connection is available.
		 * 
		 * Maybe a retry button here?
		 */
		ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo activeNetworkInfo = connectivityManager
				.getActiveNetworkInfo();
		if (activeNetworkInfo == null) {
			Notify notify = new Notify();
			notify.showValidationError(
					getString(R.string.no_network_available), this);
		}
	}

	public void storeCredentials(HttpAuthCredentials h) {
		Log.i(TAG, "Storing credentials: " + h.getMsisdn() + ":" + h.getPin());
		SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
		SharedPreferences.Editor editor = settings.edit();
		editor.putString("msisdn", h.getMsisdn());
		editor.putString("pin", h.getPin());
		editor.commit();

	}

	public HttpAuthCredentials retrieveCredentials() {
		Log.i(TAG, "Retrieving credentials..");
		HttpAuthCredentials h = new HttpAuthCredentials();
		SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
		h.setAuthCredentials(settings.getString("msisdn", ""),
				settings.getString("pin", ""));
		if (h.getMsisdn().equals("") || h.getPin().equals("")) {
			return null;
		}
		return h;
	}

	public void clearPrefs() {
		SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
		SharedPreferences.Editor editor = settings.edit();
		editor.clear();
		editor.commit();
	}

}