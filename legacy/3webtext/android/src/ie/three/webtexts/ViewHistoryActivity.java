package ie.three.webtexts;

import ie.three.webtexts.adapters.MessageListAdapter;
import ie.three.webtexts.objects.WebtextMessage;
import ie.three.webtexts.utils.FileIO;
import ie.three.webtexts.utils.WebtextUtilities;

import java.io.File;
import java.util.ArrayList;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ListView;
import android.widget.TextView;

@SuppressLint("ValidFragment")
public class ViewHistoryActivity extends FragmentActivity {

	public static Intent i;
	public Context c;
	public static WebtextMessage selectedMessage;

	@Override
	public void onCreate(Bundle savedInstanceState) {

		super.onCreate(savedInstanceState);
		setContentView(R.layout.view_history);
		i = getIntent();
		c = this;

		ArrayList<WebtextMessage> messageList = getMessagesFromFile();
		if (messageList == null) {
			// TODO handle no messages
		} else {
			final ListView messagesListView = (ListView) findViewById(R.id.list_history);
			final MessageListAdapter messageListAdapter = new MessageListAdapter(
					this, R.layout.message_list_row, messageList);
			messagesListView.setAdapter(messageListAdapter);
			messagesListView.setFastScrollEnabled(true);

			messagesListView.setOnItemClickListener(new OnItemClickListener() {
				public void onItemClick(AdapterView<?> adapter, View v,
						int position, long arg3) {
					WebtextMessage message = (WebtextMessage) adapter
							.getItemAtPosition(position);
					showMessageDetail(message);
				}
			});

		}
	}

	public static class MessageDialogFragment extends DialogFragment {
		WebtextMessage webtextMessage;
		Context c;

		static MessageDialogFragment newInstance(WebtextMessage sWebtextMessage) {
			MessageDialogFragment mdf = new MessageDialogFragment();
			Bundle args = new Bundle();
			args.putSerializable("message", sWebtextMessage);
			mdf.setArguments(args);
			return mdf;
		}

		@Override
		public void onCreate(Bundle savedInstanceState) {
			// TODO Auto-generated method stub
			super.onCreate(savedInstanceState);
			c = getActivity();
			webtextMessage = (WebtextMessage) getArguments().get("message");
		}

		@Override
		public Dialog onCreateDialog(Bundle savedInstanceState) {
			// TODO Auto-generated method stub
			LayoutInflater inflater = LayoutInflater.from(c);
			View v = inflater.inflate(R.layout.message_dialog, null);
			TextView r = (TextView) v
					.findViewById(R.id.dialog_message_recipients);
			TextView m = (TextView) v.findViewById(R.id.dialog_message_detail);
			TextView d = (TextView) v.findViewById(R.id.dialog_message_date);
			m.setText(webtextMessage.getMessage());
			r.setText(WebtextUtilities.recipientsToString(webtextMessage
					.getMessageContacts()));

			Dialog dialog = new Dialog(c);

			dialog = new AlertDialog.Builder(c)
					.setView(v)
					.setTitle("Message")
					.setPositiveButton(R.string.btn_resend,
							new DialogInterface.OnClickListener() {
								public void onClick(DialogInterface dialog,
										int whichButton) {
									((ViewHistoryActivity) getActivity())
											.returnFocus(webtextMessage);
								}
							})
					.setNegativeButton("Cancel",
							new DialogInterface.OnClickListener() {
								public void onClick(DialogInterface dialog,
										int whichButton) {
									Log.i("Dialog", "Cancel clicked");
								}
							}).create();
			dialog.setCanceledOnTouchOutside(true);
			return dialog;

			// return super.onCreateDialog(savedInstanceState);

		}

	}

	private void returnFocus(WebtextMessage m) {
		Bundle bundle = new Bundle();
		bundle.putSerializable("message", m);
		i.putExtras(bundle);
		// i.putEx
		if (getParent() == null) {
			setResult(Activity.RESULT_OK, i);
		} else {
			getParent().setResult(Activity.RESULT_OK, i);
		}
		finish();
	}

	public void showMessageDetail(WebtextMessage m) {
		FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
		Fragment prev = getSupportFragmentManager().findFragmentByTag("dialog");
		if (prev != null) {
			ft.remove(prev);
		}
		DialogFragment newFragment = MessageDialogFragment.newInstance(m);
		newFragment.show(ft, "dialog");
	}

	protected void doNegativeClick() {
		// TODO Auto-generated method stub

	}

	protected void doPositiveClick() {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.view_history, menu);
		return true;
	}

	@SuppressWarnings("unchecked")
	public ArrayList<WebtextMessage> getMessagesFromFile() {
		String fname = getFilesDir()
				+ getApplicationContext().getResources().getString(
						R.string.msgs_filename);

		ArrayList<WebtextMessage> messageList = null;
		if (new File(fname).exists()) {
			try {
				messageList = (ArrayList<WebtextMessage>) FileIO
						.retrieveFromFile(fname);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return messageList;
	}

}
