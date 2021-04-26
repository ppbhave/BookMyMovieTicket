package com.softwareDevelopment.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
@Component
@Entity
public class Seat {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	@Autowired
	@ManyToOne
	Screen screen;
    String pos;
    boolean bookedFlag;
	public boolean isBookedFlag() {
		return bookedFlag;
	}
	public void setBookedFlag(boolean bookedFlag) {
		this.bookedFlag = bookedFlag;
	}
	public String getPos() {
		return pos;
	}
	public void setPos(String pos) {
		this.pos = pos;
	}
	public Seat() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Screen getScreen() {
		return screen;
	}
	public void setScreen(Screen screen) {
		this.screen = screen;
	}

}
