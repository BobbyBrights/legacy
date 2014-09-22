package ie.three.webtexts.utils;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class FileIO {

	public FileIO() {
		// TODO Auto-generated constructor stub
	}

	public static Boolean saveToFile(String fileName, Object data) {

		Boolean retValue = false;
		ObjectOutputStream objectOut = null;
		try {
			File file = new File(fileName);
			if (!file.exists()) {
				file = new File(fileName);
				file.createNewFile();
			}

			FileOutputStream stream = new FileOutputStream(fileName);
			objectOut = new ObjectOutputStream(new BufferedOutputStream(stream));
			objectOut.writeObject(data);

			retValue = true;
		} catch (IOException ioe) {
			ioe.printStackTrace();
		} finally {
			try {
				if (objectOut != null)
					objectOut.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}

		return retValue;
	}

	public static Object retrieveFromFile(String filename) throws FileNotFoundException {
		FileInputStream fis = null;
		ObjectInputStream in = null;
		Object o = null;
		try {
			fis = new FileInputStream(filename);
			in = new ObjectInputStream(fis);
			o = in.readObject();
			in.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		} catch (ClassNotFoundException ex) {
			ex.printStackTrace();
		}
		return o;
	}
}
