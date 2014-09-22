package ie.three.webtexts.adapters;

import ie.three.webtexts.R;
import ie.three.webtexts.objects.Contact;
import ie.three.webtexts.objects.WebtextMessage;
import ie.three.webtexts.utils.WebtextUtilities;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;

public class MessageListAdapter extends ArrayAdapter<WebtextMessage> {

	Context context;
	int layoutResourceId;
	ArrayList<WebtextMessage> data = null;

	public MessageListAdapter(Context context, int layoutResourceId,
			ArrayList<WebtextMessage> messages) {
		super(context, layoutResourceId, messages);
		this.layoutResourceId = layoutResourceId;
		this.context = context;
		this.data = messages;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		View row = convertView;
		ViewHolder holder = null;

		if (row == null) {
			LayoutInflater inflater = ((Activity) context).getLayoutInflater();
			row = inflater.inflate(layoutResourceId, parent, false);
		}

		WebtextMessage message = data.get(position);
		holder = new ViewHolder();
		holder.txtRecipients = (TextView) row
				.findViewById(R.id.message_recipients);
		holder.txtDetail = (TextView) row.findViewById(R.id.message_detail);
		holder.txtDate = (TextView) row.findViewById(R.id.message_date);
		row.setTag(holder);
		holder.txtRecipients.setText(WebtextUtilities
				.recipientsToString(message.getMessageContacts()));
		holder.txtDetail.setText(message.getMessage().trim());
		holder.txtDate.setText(message.getSentDate().toLocaleString());

		return row;
	}

	static class ViewHolder {
		TextView txtRecipients;
		TextView txtDetail;
		TextView txtDate;
	}
}
