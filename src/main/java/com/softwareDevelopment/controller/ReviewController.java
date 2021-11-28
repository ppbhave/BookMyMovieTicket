package com.softwareDevelopment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softwareDevelopment.model.Film;
import com.softwareDevelopment.model.Review;
import com.softwareDevelopment.model.ReviewStats;
import com.softwareDevelopment.repos.FilmRepo;
import com.softwareDevelopment.repos.ReviewRepo;
import com.softwareDevelopment.repos.UserRepo;

@Controller
public class ReviewController {
	@Autowired
	Film movie;
	@Autowired
	ReviewRepo reviewrepo;
	@Autowired
	FilmRepo fr;
	@Autowired
	UserRepo ur;
	@Autowired
	ReviewStats rstat;
	
	@GetMapping("/Reviews/stats/{id}")
	@ResponseBody
	public ResponseEntity<ReviewStats> getReviewStats(@PathVariable("id") int id)
	{
		Film movie = fr.findById(id).get();
		if(movie == null) {
			return new ResponseEntity<ReviewStats>(rstat, HttpStatus.BAD_REQUEST);
		}
		int total = reviewrepo.countByMovie(movie);
		int [] ratingStats = new int[5];
		for (int i=0; i<5; i++ ) {
			ratingStats[i]=reviewrepo.countByMovieAndRating(movie,i+1);
		}
		rstat.setMovie(movie);
		rstat.setRatingStat(ratingStats);
		rstat.setTotalReviews(total);
		return new ResponseEntity<ReviewStats>(rstat, HttpStatus.OK);
		
	}
	
	@GetMapping("/Reviews/{id}")
	@ResponseBody
	public ResponseEntity<List<Review>> getMovieReviews(@PathVariable("id")int id)
	{
		ResponseEntity<List<Review>> reviews=new ResponseEntity<List<Review>>(reviewrepo.findByMovieId(id),HttpStatus.OK);
		return reviews;
	}
	
	@PostMapping("/session/newReview")
	@ResponseBody
	public HttpStatus addNewReview(@RequestBody Review review)
	{
		if(review.getUser().getId() >0 || review.getMovie().getId()>0)
		{ 
			review=reviewrepo.save(review);
			return HttpStatus.OK;
		}
		return HttpStatus.CONFLICT;
	}
	
	@DeleteMapping("/session/dropReview")
	@ResponseBody
	public String deleteReview(@RequestBody Review review)
	{
		reviewrepo.delete(review);
		return "";
	}

}
