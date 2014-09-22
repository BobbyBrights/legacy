package com.cwstz.zig.session;

import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.cwstz.zig.responses.ServiceInformation;
import com.cwstz.zig.responses.UserAccount;
import com.cwstz.zig.rest.JSONService;

/**
 * Object kept in session to remember the current user transaction flow. (Shop /
 * Refuel ....)
 * 
 * @author VFEDRONIC
 */
public class MockUserTransaction {
	private final static Logger LOGGER = Logger.getLogger(MockUserTransaction.class
			.getName());
	
	public final ArrayList<ServiceInformation> addedService = new ArrayList<ServiceInformation>();
	public final ArrayList<ServiceInformation> removedServices = new ArrayList<ServiceInformation>();
	public float balanceAfterProcessing;
	public float immediatePayement;
	public float debitFromBalance;

	public MockUserTransaction(String data) throws JSONException {

		JSONObject jsonData = new JSONObject(data);
		JSONArray ja1 = jsonData.getJSONArray("addedServices");
		JSONArray ja2 = jsonData.getJSONArray("removedServices");
		
		
		/*
		 * Get full service object from id and add it to the list of added
		 * services.
		 */
		for (int i = 0; i < ja1.length(); i++) {
			String serviceId = ja1.getJSONObject(i).getString("serviceId");
			int nb = ja1.getJSONObject(i).getInt("numberOfInstances");
			
			ServiceInformation oService = getServiceById(serviceId);
			LOGGER.log(Level.INFO, serviceId + "");
			
			if (oService != null) {
				oService.setNumberOfInstances(nb);
				addedService.add(oService);
			}
		}

		for (int j = 0; j < ja2.length(); j++) {
			String serviceId = ja2.getJSONObject(j).getString("serviceId");
			ServiceInformation oService = getServiceById(serviceId);
			if (oService != null) {
				removedServices.add(oService);
			}
		}

	}

	/**
	 * Get the impact of this change on the MRC
	 * @return
	 */
	public float getMRCModification() {
		float delta = 0;
		for (ServiceInformation service : addedService) {
			if(ServiceInformation.REC.equals(service.getTypeIndicator())){
				delta += Float.parseFloat(service.getAmount());
			}
		}
		for (ServiceInformation service : removedServices) {
			if(ServiceInformation.REC.equals(service.getTypeIndicator())){
				delta -= Float.parseFloat(service.getAmount());
			}
		}
		return delta;
	}
	
	public float getChangePrice(){
		float price = 0;
		for (ServiceInformation service : addedService) {
			if(ServiceInformation.OT.equals(service.getTypeIndicator())){
				price += service.getNumberOfInstances() * Float.parseFloat(service.getAmount());
			} else {
				price +=  Float.parseFloat(service.getAmount());
			}
		}
		return price;
		//no price for remove services
	}

	/**
	 * Create an instance of service using serviceId.
	 * 
	 * @param serviceId
	 * @return
	 */
	private ServiceInformation getServiceById(String serviceId) {
		ServiceInformation oService = null;
		for (ServiceInformation sev : UserAccount.SERVICES) {
			if (sev.getServiceId().equals(serviceId)) {
				oService = new ServiceInformation();
				oService.setServiceId(sev.getServiceId());
				oService.setServiceName(sev.getServiceName());
				oService.setServiceShortDescription(sev
						.getServiceShortDescription());
				oService.setAmount(sev.getAmount());
				oService.setIsStackable(sev.getIsStackable());
				oService.setTypeIndicator(sev.getTypeIndicator());
			}
		}
		return oService;
	}
}
