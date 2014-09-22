package ie.three.webtexts.adapters;

import java.util.ArrayList;
import java.util.List;

import ie.three.webtexts.R;
import ie.three.webtexts.objects.Contact;
import ie.three.webtexts.objects.Group;
import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.TextView;

public class GroupsListAdapter extends ArrayAdapter<Group> {

	Context context;
	int layoutResourceId;
	List<Group> data = null;
	List<Integer> selectedRows = new ArrayList<Integer>();

	public GroupsListAdapter(Context context, int layoutResourceId,
			List<Group> groups) {
		super(context, layoutResourceId, groups);
		this.layoutResourceId = layoutResourceId;
		this.context = context;
		this.data = groups;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		View row = convertView;
		GroupsHolder holder = null;

		if (row == null) {
			LayoutInflater inflater = ((Activity) context).getLayoutInflater();
			row = inflater.inflate(layoutResourceId, parent, false);
		}
		
		Group group = data.get(position);
		holder = new GroupsHolder();

		holder.txtName = (TextView) row.findViewById(R.id.group_name_text);
		holder.txtMembers = (TextView) row
				.findViewById(R.id.group_members);
		holder.tickbox = (CheckBox) row
				.findViewById(R.id.checkbox_select_group);
		
		row.setTag(holder);
		holder.tickbox.setChecked(false);
		holder.tickbox.setVisibility(View.INVISIBLE);

		if (isSelected(position)) {
			holder.tickbox.setChecked(true);
			holder.tickbox.setVisibility(View.VISIBLE);
		}

		
		holder.txtName.setText(group.name);
		holder.txtMembers.setText(group.groupEntries.size() + " members");
		return row;
	}

	static class GroupsHolder {
		TextView txtName;
		TextView txtMembers;
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
