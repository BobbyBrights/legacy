package ie.three.webtexts.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.SocketTimeoutException;
import java.security.KeyStore;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.tsccm.ThreadSafeClientConnManager;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.protocol.HTTP;
import org.json.JSONObject;

import android.util.Log;

public class RESTComponent {

	public static final String PREFS_NAME = "WebtextPrefsFile";
	public static final String TAG = "RESTComponent";
	public static final int DEFAULT_CONNECTION_TIMEOUT = 30000;

	
	public final String API_BASE_URL = "https://api.webtext.three.ie/three-webtext/v1";
	public final String API_ACCOUNT = API_BASE_URL + "/user_policies/{0}/send_message";
	public final String API_GET_CONTACTS = API_BASE_URL + "/address_book/{0}";
	
	
	// Some global variables if we can.
	public HttpAuthCredentials h;
	public String json;


	public RESTComponent(HttpAuthCredentials t) {
		this.h = t;
	}

	public HttpClient getNewHttpClient() {
	    try {
	        KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
	        trustStore.load(null, null);

	        SSLSocketFactory sf = new MySSLSocketFactory(trustStore);
	        sf.setHostnameVerifier(SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);

	        HttpParams params = new BasicHttpParams();
	        HttpProtocolParams.setVersion(params, HttpVersion.HTTP_1_1);
	        HttpProtocolParams.setContentCharset(params, HTTP.UTF_8);

	        SchemeRegistry registry = new SchemeRegistry();
	        registry.register(new Scheme("http", PlainSocketFactory.getSocketFactory(), 80));
	        registry.register(new Scheme("https", sf, 443));

	        ClientConnectionManager ccm = new ThreadSafeClientConnManager(params, registry);

	        return new DefaultHttpClient(ccm, params);
	    } catch (Exception e) {
	        return new DefaultHttpClient();
	    }
	}
	
	public String getHttpResponse(String url) {
		StringBuffer sb = new StringBuffer("");
		HttpHost targetHost = new HttpHost("api.webtext.three.ie", 80, "https");

		try {
			Log.i(TAG, "Using " + h.getMsisdn() + ":" + h.getPin());			
			HttpClient httpclient = getNewHttpClient();

			// The time it takes to open TCP connection.
			// httpclient.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT,
			// 3000);
			// Timeout when server does not send data.
			httpclient.getParams()
					.setParameter(CoreConnectionPNames.SO_TIMEOUT,
							DEFAULT_CONNECTION_TIMEOUT);
			UsernamePasswordCredentials creds = new UsernamePasswordCredentials(
					h.getMsisdn(), h.getPin());

			// Prepare a request object
			HttpGet httpget = new HttpGet(url);
			httpget.addHeader(new BasicScheme().authenticate(creds, httpget));

			// Execute the request
			HttpResponse response = httpclient.execute(httpget);
			// Examine the response status
			System.out.println(response.getStatusLine());
			// Get hold of the response entity
			HttpEntity entity = response.getEntity();
			// If the response does not enclose an entity, there is no need
			// to worry about connection release
			if (entity != null) {
				InputStream instream = entity.getContent();
				try {
					BufferedReader reader = new BufferedReader(
							new InputStreamReader(instream));
					String s = "";
					
					while((s = reader.readLine()) != null){
						sb.append(s);
					}
					//sb.append(reader.readLine());
					// System.out.println(reader.readLine());
				} catch (Exception ex) {
					// In case of an IOException the connection will be released
					// back to the connection manager automatically
					httpget.abort();
					throw ex;
				} finally {
					// Closing the input stream will trigger connection release
					instream.close();
				}

				// When HttpClient instance is no longer needed,
				// shut down the connection manager to ensure
				// immediate deallocation of all system resources
				httpclient.getConnectionManager().shutdown();
			}

		} catch (SocketTimeoutException s) {
			Map<String, String> m = new HashMap<String, String>();
			m.put("error", "socket_timeout");
			JSONObject j = new JSONObject(m);
			sb.append(j.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sb.toString();
	}

	public String getAccountDetails(){
		String u = MessageFormat.format(API_ACCOUNT, h.getMsisdn());
		Log.i("Webtext", u);
		return getHttpResponse(u);	
	}
	
	public void sendMessage(ArrayList<String> recipients, String message
			) {
	}

	public void sendMessage(ArrayList<String> recipients, String message,
			Date scheduledDate) {

	}

	public String getContactsJSON() {
		String u = MessageFormat.format(API_GET_CONTACTS, h.getMsisdn());
		Log.i("Webtext", u);
		return getHttpResponse(u);
	}

	public ArrayList<String> getGroups() {
		return null;

	}

	public HttpAuthCredentials getHttpAuthCredentials() {
		return h;
	}

	public void setHttpAuthCredentials(HttpAuthCredentials h) {
		this.h = h;
	}

}
