package ie.three.webtexts.api;

import java.net.SocketTimeoutException;
import java.net.UnknownHostException;
import java.security.KeyStore;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.tsccm.ThreadSafeClientConnManager;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

public class WebServiceDelegate {

	public static final String TAG = "Webtext.WebServiceDelegate";
	public static final int DEFAULT_CONNECTION_TIMEOUT = 30000;

	public final String API_BASE_URL = "https://api.webtext.three.ie/three-webtext/v1";
	public final String API_ACCOUNT = API_BASE_URL
			+ "/user_policies/{0}/send_message";
	public final String API_GET_CONTACTS = API_BASE_URL + "/address_book/{0}";
	public final String API_POST_MESSAGE = API_BASE_URL
			+ "/oneapi/{0}/smsmessaging/outbound/{1}/requests";
	
	public String json;

	public WebServiceDelegate(HttpAuthCredentials h) {
		this.h = h;
	}

	public HttpAuthCredentials h;

	public HttpClient getNewHttpClient() {
		try {
			KeyStore trustStore = KeyStore.getInstance(KeyStore
					.getDefaultType());
			trustStore.load(null, null);

			SSLSocketFactory sf = new MySSLSocketFactory(trustStore);
			sf.setHostnameVerifier(SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);

			HttpParams params = new BasicHttpParams();
			HttpProtocolParams.setVersion(params, HttpVersion.HTTP_1_1);
			HttpProtocolParams.setContentCharset(params, HTTP.UTF_8);

			SchemeRegistry registry = new SchemeRegistry();
			registry.register(new Scheme("http", PlainSocketFactory
					.getSocketFactory(), 80));
			registry.register(new Scheme("https", sf, 443));

			ClientConnectionManager ccm = new ThreadSafeClientConnManager(
					params, registry);

			return new DefaultHttpClient(ccm, params);
		} catch (Exception e) {
			return new DefaultHttpClient();
		}
	}

	public String postHttpRequest(String url, String payload, String contentType) {
		StringBuffer sb = new StringBuffer("");

		try {
			HttpClient httpclient = getNewHttpClient();
			httpclient.getParams()
					.setParameter(CoreConnectionPNames.SO_TIMEOUT,
							DEFAULT_CONNECTION_TIMEOUT);
			UsernamePasswordCredentials creds = new UsernamePasswordCredentials(
					h.getMsisdn(), h.getPin());

			// Prepare a request object
			HttpPost p = new HttpPost(url);
			p.addHeader(new BasicScheme().authenticate(creds, p));
			StringEntity str = new StringEntity(payload, HTTP.UTF_8);
			str.setContentType(contentType);
			p.setEntity(str);

			// Execute the request
			HttpResponse response = httpclient.execute(p);
			// Examine the response status
			System.out.println(response.getStatusLine());
			// Get hold of the response entity
			HttpEntity entity = response.getEntity();
			sb.append(EntityUtils.toString(entity));
		} catch (Exception e) {
			e.printStackTrace();
		}
		// Log.i(TAG, sb.toString());

		return sb.toString();
	}

	public String getHttpResponse(String url) {
		StringBuffer sb = new StringBuffer("");
		try {
			HttpClient httpclient = getNewHttpClient();
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
			sb.append(EntityUtils.toString(entity));

		} catch (SocketTimeoutException s) {
			Map<String, String> m = new HashMap<String, String>();
			m.put("error", "socket_timeout");
			JSONObject j = new JSONObject(m);
			sb.append(j.toString());
		} catch (UnknownHostException u) {
			Map<String, String> m = new HashMap<String, String>();
			m.put("error", "unknown_host_exception");
			JSONObject j = new JSONObject(m);
			sb.append(j.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		// Log.i(TAG, sb.toString());

		return sb.toString();
	}

	public String getAddressBookAsJson() {
		return getHttpResponse(MessageFormat.format(API_GET_CONTACTS,
				h.getMsisdn()));
	}

	public String getAccountDetailsAsJson() {
		return getHttpResponse(MessageFormat.format(API_ACCOUNT,
				h.getMsisdn()));
	}
	
	public String postSendMessage(String json2) {
		// TODO Auto-generated method stub
		return postHttpRequest(
				MessageFormat.format(API_POST_MESSAGE, h.getMsisdn(),
						h.getMsisdn()), json2, "application/json");
	}
}
