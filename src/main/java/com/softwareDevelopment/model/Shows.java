package com.softwareDevelopment.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
@Component
@Entity
public class Shows {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	@Autowired
	@ManyToOne
	Screen screen;
	LocalDateTime dStartTiming; //dd:mm:yyyy HH:mm 24 Hr format.
	@Transient
	String datetime;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDatetime() {
		return datetime;
	}
	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}
	public Screen getScreen() {
		return screen;
	}
	public void setScreen(Screen screen) {
		this.screen = screen;
	}	
	public LocalDateTime getdStartTiming() {
		return dStartTiming;
	}
	public void setdStartTiming(LocalDateTime dStartTiming) {
		this.dStartTiming = dStartTiming;
	}
	
}
