package com.softwareDevelopment.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
@Entity
@Component
public class Account {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	@OneToOne
	@Autowired
	User user;
	String sUsername;
	String sPassword;
	String Role;
	@Transient
	String sOldPassword;
	public String getsOldPassword() {
		return sOldPassword;
	}
	public void setsOldPassword(String sOldPassword) {
		this.sOldPassword = sOldPassword;
	}
	public String getRole() {
		return Role;
	}
	public void setRole(String role) {
		Role = role;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	public String getsUsername() {
		return sUsername;
	}
	public void setsUsername(String sUsername) {
		this.sUsername = sUsername;
	}
	public String getsPassword() {
		return sPassword;
	}
	public void setsPassword(String sPassword) {
		this.sPassword = sPassword;
	}
	

}
