package com.cwstz.zig.filter;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerResponse;
import com.sun.jersey.spi.container.ContainerResponseFilter;

public class ResponseCorsFilter implements ContainerResponseFilter {

	@Override
	public ContainerResponse filter(ContainerRequest req,
			ContainerResponse contResp) {
	      ResponseBuilder resp = Response.fromResponse(contResp.getResponse());
	        resp.header("Access-Control-Allow-Origin", "*")
	                .header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	 
	        String reqHead = req.getHeaderValue("Access-Control-Request-Headers");
	 
	        if(null != reqHead && !reqHead.equals(null)){
	            resp.header("Access-Control-Allow-Headers", reqHead);
	        }
	        
	        //WA for ios 6.0 bug [vfe: i know it's not related to cors.. but i don't want to create another filter ;) 
	        resp.header("cache-control", "no-cache");
	        contResp.setResponse(resp.build());
	            return contResp;
	 	}

}
