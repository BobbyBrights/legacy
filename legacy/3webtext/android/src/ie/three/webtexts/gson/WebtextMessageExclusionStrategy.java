package ie.three.webtexts.gson;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

public class WebtextMessageExclusionStrategy implements ExclusionStrategy {

	public boolean shouldSkipClass(Class<?> arg0) {
		return false;
	}

	public boolean shouldSkipField(FieldAttributes f) {
		/*
		 * return (f.getDeclaringClass() == Student.class && f.getName().equals(
		 * "firstName")) || (f.getDeclaringClass() == Country.class &&
		 * f.getName() .equals("name"));
		 */
		return false;
	}

}