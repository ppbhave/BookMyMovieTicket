package com.softwareDevelopment.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.stereotype.Component;

@Component
@Entity
public class Film {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;

	String sMovieName, sGenre, sDescription, sTrailer, sPosterLink; // straight
	String sCast, sScreenType, sLanguages; // csv
	String sDuration; // HH:mm
	String dReleaseDate; // dd:mm:yyyy

	public String getsPosterLink() {
		return sPosterLink;
	}

	public void setsPosterLink(String sPosterLink) {
		this.sPosterLink = sPosterLink;
	}

	public String getsTrailer() {
		return sTrailer;
	}

	public void setsTrailer(String sTrailer) {
		this.sTrailer = sTrailer;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getsMovieName() {
		return sMovieName;
	}

	public void setsMovieName(String sMovieName) {
		this.sMovieName = sMovieName;
	}

	public String getsGenre() {
		return sGenre;
	}

	public void setsGenre(String sGenre) {
		this.sGenre = sGenre;
	}

	public String getsDescription() {
		return sDescription;
	}

	public void setsDescription(String sDescription) {
		this.sDescription = sDescription;
	}

	public String getsCast() {
		return sCast;
	}

	public void setsCast(String sCast) {
		this.sCast = sCast;
	}

	public String getsScreenType() {
		return sScreenType;
	}

	public void setsScreenType(String sScreenType) {
		this.sScreenType = sScreenType;
	}

	public String getsLanguages() {
		return sLanguages;
	}

	public void setsLanguages(String sLanguages) {
		this.sLanguages = sLanguages;
	}

	public String getsDuration() {
		return sDuration;
	}

	public void setsDuration(String sDuration) {
		this.sDuration = sDuration;
	}

	public String getdReleaseDate() {
		return dReleaseDate;
	}

	public void setdReleaseDate(String dReleaseDate) {
		this.dReleaseDate = dReleaseDate;
	}

}
