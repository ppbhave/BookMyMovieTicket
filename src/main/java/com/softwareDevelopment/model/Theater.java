package com.softwareDevelopment.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.stereotype.Component;
@Component
@Entity
public class Theater {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	String sName;
	String sGpsLocation;
	int jNoOfScreens;
	public int getjNoOfScreens() {
		return jNoOfScreens;
	}
	public void setjNoOfScreens(int jNoOfScreens) {
		this.jNoOfScreens = jNoOfScreens;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getsName() {
		return sName;
	}
	public void setsName(String sName) {
		this.sName = sName;
	}
	public String getsGpsLocation() {
		return sGpsLocation;
	}
	public void setsGpsLocation(String sGpsLocation) {
		this.sGpsLocation = sGpsLocation;
	}
	
}
