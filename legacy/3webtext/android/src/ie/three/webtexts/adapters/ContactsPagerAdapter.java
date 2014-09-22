package ie.three.webtexts.adapters;

import java.util.Vector;

import android.content.Context;
import android.support.v4.view.PagerAdapter;
import android.view.View;
import android.view.ViewGroup;

public class ContactsPagerAdapter extends PagerAdapter {

	@SuppressWarnings("unused")
	private Context mContext;
	private Vector<View> pages;

	public ContactsPagerAdapter(Context context, Vector<View> pages) {
		this.mContext = context;
		this.pages = pages;
	}

	@Override
	public int getCount() {
		return pages.size();
	}

	@Override
	public Object instantiateItem(ViewGroup collection, int position) {
		View page = pages.get(position);
		collection.addView(page);
		return page;
	}

	@Override
	public boolean isViewFromObject(View view, Object object) {
		return view.equals(object);
	}

	@Override
	public void destroyItem(ViewGroup container, int position, Object object) {
		container.removeView((View) object);
	}

}
