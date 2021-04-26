package com.softwareDevelopment.model;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class MessageHandler {
	String Message;
	HttpStatus httpstatus;
	
	public MessageHandler() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getMessage() {
		return Message;
	}
	public void setMessage(String message) {
		Message = message;
	}
	public HttpStatus getHttpstatus() {
		return httpstatus;
	}
	public void setHttpstatus(HttpStatus httpstatus) {
		this.httpstatus = httpstatus;
	}

}
