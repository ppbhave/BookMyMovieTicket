package com.softwareDevelopment.controller;

import java.nio.file.attribute.UserPrincipalNotFoundException;
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
import com.softwareDevelopment.model.MessageHandler;
import com.softwareDevelopment.model.Review;
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
	MessageHandler mh;
	
	@GetMapping("/Reviews/{id}")
	@ResponseBody
	public ResponseEntity<List<Review>> getMovieReviews(@PathVariable("id")int id)
	{
		ResponseEntity<List<Review>> reviews=new ResponseEntity<List<Review>>(reviewrepo.findByMovieId(id),HttpStatus.OK);
		return reviews;
	}
	
	@PostMapping("/session/newReview")
	@ResponseBody
	public MessageHandler addNewReview(@RequestBody Review review)
	{
		review.setMovie(fr.findById(review.getMovie().getId()).get());
		review.setUser(ur.findById(review.getUser().getId()).get());
		review=reviewrepo.save(review);
		mh.setHttpstatus(HttpStatus.OK);
		mh.setMessage("The review is successfully submitted");
		return mh;
	}
	
	@DeleteMapping("/session/dropReview")
	@ResponseBody
	public String deleteReview(@RequestBody Review review)
	{
		reviewrepo.delete(review);
		return "";
	}

}
