package com.softwareDevelopment.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
@Component
@Entity
public class Screen {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	@Autowired
	@ManyToOne
	Theater Theater;
	int jTotalSeats;
	/*public Screen(Theater Theater, String sScreenType, int jTotalSeats) {
		super();
		this.Theater = Theater;
		this.sScreenType = sScreenType;
		this.jTotalSeats = jTotalSeats;
	}  */
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public Theater getTheater() {
		return Theater;
	}
	public void setTheater(Theater Theater) {
		this.Theater = Theater;
	}
	public int getjTotalSeats() {
		return jTotalSeats;
	}
	public void setjTotalSeats(int jTotalSeats) {
		this.jTotalSeats = jTotalSeats;
	}
	

}
