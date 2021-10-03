package com.softwareDevelopment.model;

import org.springframework.stereotype.Component;

@Component
public class ReviewStats {
	Film movie;
	int totalReviews;
	int[] ratingStat;
	public Film getMovie() {
		return movie;
	}
	public void setMovie(Film movie) {
		this.movie = movie;
	}
	public int getTotalReviews() {
		return totalReviews;
	}
	public void setTotalReviews(int totalReviews) {
		this.totalReviews = totalReviews;
	}
	public int[] getRatingStat() {
		return ratingStat;
	}
	public void setRatingStat(int[] ratingStat) {
		this.ratingStat = ratingStat;
	}
}
