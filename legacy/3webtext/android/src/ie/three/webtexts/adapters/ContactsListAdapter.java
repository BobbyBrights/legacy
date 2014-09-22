package ie.three.webtexts.adapters;

import ie.three.webtexts.R;
import ie.three.webtexts.objects.Contact;

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

public class ContactsListAdapter extends ArrayAdapter<Contact> {

	Context context;
	int layoutResourceId;
	List<Contact> data = null;
	List<Contact> selectedContacts = new ArrayList<Contact>();
	List<Integer> selectedRows = new ArrayList<Integer>();

	public ContactsListAdapter(Context context, int layoutResourceId,
			List<Contact> contacts) {
		super(context, layoutResourceId, contacts);
		this.layoutResourceId = layoutResourceId;
		this.context = context;
		this.data = contacts;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		View row = convertView;
		ViewHolder holder = null;

		if (row == null) {
			LayoutInflater inflater = ((Activity) context).getLayoutInflater();
			row = inflater.inflate(layoutResourceId, parent, false);
		}

		Contact contact = data.get(position);

		holder = new ViewHolder();
		holder.txtName = (TextView) row.findViewById(R.id.contact_name_text);
		holder.txtNumber = (TextView) row
				.findViewById(R.id.contact_number_text);
		holder.tickbox = (CheckBox) row
				.findViewById(R.id.checkbox_select_contact);

		row.setTag(holder);

		holder.tickbox.setChecked(false);
		holder.tickbox.setVisibility(View.INVISIBLE);

		if (isSelected(position)) {
			holder.tickbox.setChecked(true);
			holder.tickbox.setVisibility(View.VISIBLE);
		}

		holder.txtName
				.setText(contact.name.replaceAll(Pattern.quote("+"), " "));
		holder.txtNumber.setText(contact.address.replaceAll("tel:", ""));

		return row;
	}

	static class ViewHolder {
		TextView txtName;
		TextView txtNumber;
		CheckBox tickbox;
	}

	public void toggleSelected(int position) {
		// TODO Auto-generated method stub
		Integer i = Integer.valueOf(position);
		if (selectedRows.contains(i)) {
			selectedRows.remove(i);
		} else {
			selectedRows.add(i);
		}
		notifyDataSetChanged();
	}

	private Boolean isSelected(int position) {
		return selectedRows.contains(Integer.valueOf(position));
	}

	public void setSelectedRows(List<Integer> i) {
		this.selectedRows = i;
	}
}
