package ie.three.webtexts.objects;

import java.io.Serializable;
import java.util.List;

public class Group implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7743674732610618255L;
	
	public String name;
	public List<String> groupEntries;
	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((groupEntries == null) ? 0 : groupEntries.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Group other = (Group) obj;
		if (groupEntries == null) {
			if (other.groupEntries != null)
				return false;
		} else if (!groupEntries.equals(other.groupEntries))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
	
}
