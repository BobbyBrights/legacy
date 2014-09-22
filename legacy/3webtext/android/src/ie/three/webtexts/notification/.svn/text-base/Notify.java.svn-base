package ie.three.webtexts.notification;

import ie.three.webtexts.R;
import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class Notify extends Activity {

	public void showValidationError(String message, Context c) {
		
		final Dialog dialog = new Dialog(c);

		dialog.setContentView(R.layout.custom_dialog);
		dialog.setTitle(R.string.app_name);
		TextView text = (TextView) dialog.findViewById(R.id.dialog_text);
		text.setText(message);

		dialog.show();

		Button dismiss = (Button) dialog.findViewById(R.id.dismiss_button);
		dismiss.setOnClickListener(new Button.OnClickListener() {
			public void onClick(View v) {
				// TODO Auto-generated method stub
				dialog.dismiss();
			}
		});
	}

}
