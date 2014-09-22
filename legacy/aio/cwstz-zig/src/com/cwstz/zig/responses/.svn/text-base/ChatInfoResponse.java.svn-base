package com.cwstz.zig.responses;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonAutoDetect
// use this annotation if you don't have getters and setters for each
// JsonProperty
@JsonIgnoreProperties(ignoreUnknown = true)
// use this if there isn't an exact correlation between JSON and class
// properties
public class ChatInfoResponse extends GeneralResponse {

	@JsonProperty
	private String accountId;
	@JsonProperty
	private String chatSessionTimer;
	@JsonProperty
	private String errorMsgVerbiage;
	@JsonProperty
	private String timeBeforeChatSessionExpires;

	public ChatInfoResponse(String accountId, String chatSessionTimer,
			String errorMsgVerbiage, String timeBeforeChatSessionExpires) {
		super();
		this.setAccountId(accountId);
		this.setChatSessionTimer(chatSessionTimer);
		this.setErrorMsgVerbiage(errorMsgVerbiage);
		this.setTimeBeforeChatSessionExpires(timeBeforeChatSessionExpires);
	}

	public String getTimeBeforeChatSessionExpires() {
		return timeBeforeChatSessionExpires;
	}

	public void setTimeBeforeChatSessionExpires(
			String timeBeforeChatSessionExpires) {
		this.timeBeforeChatSessionExpires = timeBeforeChatSessionExpires;
	}

	public String getErrorMsgVerbiage() {
		return errorMsgVerbiage;
	}

	public void setErrorMsgVerbiage(String errorMsgVerbiage) {
		this.errorMsgVerbiage = errorMsgVerbiage;
	}

	public String getChatSessionTimer() {
		return chatSessionTimer;
	}

	public void setChatSessionTimer(String chatSessionTimer) {
		this.chatSessionTimer = chatSessionTimer;
	}

	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

}