package com.softwareDevelopment.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
@Component
@Entity
public class MovieToScreen {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	@Autowired
	@ManyToOne
	Film Movie;
	@Autowired
	@OneToOne
	Screen screen;
	String sScreenType,sLanguage;
	int gold,silver,royal;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Film getMovie() {
		return Movie;
	}
	public int getGold() {
		return gold;
	}
	public void setGold(int gold) {
		this.gold = gold;
	}
	public int getSilver() {
		return silver;
	}
	public void setSilver(int silver) {
		this.silver = silver;
	}
	public int getRoyal() {
		return royal;
	}
	public void setRoyal(int royal) {
		this.royal = royal;
	}
	public void setMovie(Film movie) {
		Movie = movie;
	}
	public Screen getScreen() {
		return screen;
	}
	public void setScreen(Screen screen) {
		this.screen = screen;
	}
	public String getsScreenType() {
		return sScreenType;
	}
	public void setsScreenType(String sScreenType) {
		this.sScreenType = sScreenType;
	}
	public String getsLAnguage() {
		return sLanguage;
	}
	public void setsLAnguage(String sLanguage) {
		this.sLanguage = sLanguage;
	}
	
}
