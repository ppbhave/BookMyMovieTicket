package com.softwareDevelopment.model;

import org.springframework.stereotype.Component;

@Component
public class BookingRequest {
	int user_id;
	int show_id;
	int[] seats_id;
	String movie;
	
	public BookingRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public String getMovie() {
		return movie;
	}

	public void setMovie(String movie) {
		this.movie = movie;
	}

	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getShow_id() {
		return show_id;
	}
	public void setShow_id(int show_id) {
		this.show_id = show_id;
	}
	public int[] getSeats_id() {
		return seats_id;
	}
	public void setSeats_id(int[] seats_id) {
		this.seats_id = seats_id;
	}
	
}
