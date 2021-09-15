package com.softwareDevelopment.model;

public class JwtResp {
	private String jwtToken;

	public JwtResp(String jwtToken) {
		super();
		this.jwtToken = jwtToken;
	}

	public JwtResp() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}

}
