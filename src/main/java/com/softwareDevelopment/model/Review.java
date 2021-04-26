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
public class Review {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id;
	
	@Autowired
	@ManyToOne
	Film movie;
	@Autowired
	@ManyToOne
	User user;
	String sReview;
	String sReviewSummery;
	int jRating;
	public int getId() {
		return id;
	}
	
	public String getsReviewSummery() {
		return sReviewSummery;
	}
	public void setsReviewSummery(String sReviewSummery) {
		this.sReviewSummery = sReviewSummery;
	}

	public void setId(int id) {
		this.id = id;
	}
	public Film getMovie() {
		return movie;
	}
	public void setMovie(Film movie) {
		this.movie = movie;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getsReview() {
		return sReview;
	}
	public void setsReview(String sReview) {
		this.sReview = sReview;
	}
	public int getjRating() {
		return jRating;
	}
	public void setjRating(int jRating) {
		this.jRating = jRating;
	}
	

}
