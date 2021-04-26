package com.softwareDevelopment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softwareDevelopment.model.MovieToScreen;
import com.softwareDevelopment.model.Shows;
import com.softwareDevelopment.repos.movieToScreenRepo;

@Controller
public class MovieToScreenController {
	@Autowired
	MovieToScreen movieScreens;
	@Autowired
	static
	movieToScreenRepo movieScreenRepo;
	/*
	@ResponseBody
	@GetMapping("/screens/{movie_id}/{language}/{format}")
	public static ResponseEntity<List<MovieToScreen>> getScreensForFilm(@PathVariable int movie_id,@PathVariable("language") String language,@PathVariable("format") String format) 
	{
		return new ResponseEntity<List<MovieToScreen>>(movieScreenRepo.findScreens(movie_id, language, format),HttpStatus.OK);		
	} */
	
	

}
