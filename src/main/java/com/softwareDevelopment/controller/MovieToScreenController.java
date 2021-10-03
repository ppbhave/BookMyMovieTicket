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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softwareDevelopment.model.MovieToScreen;
import com.softwareDevelopment.model.Screen;
import com.softwareDevelopment.model.Shows;
import com.softwareDevelopment.model.Theater;
import com.softwareDevelopment.repos.movieToScreenRepo;

@Controller
public class MovieToScreenController {
	@Autowired
	MovieToScreen movieScreens;
	@Autowired
	movieToScreenRepo movieScreenRepo;
	
	@ResponseBody
	@GetMapping("/screens/{movie_id}/{language}/{format}")
	public  ResponseEntity<List<MovieToScreen>> getScreensForFilm(@PathVariable int movie_id,@PathVariable("language") String language,@PathVariable("format") String format) 
	{
		return new ResponseEntity<List<MovieToScreen>>(movieScreenRepo.findScreens(movie_id, language, format),HttpStatus.OK);		
	} 
	
	@ResponseBody
	@GetMapping("/admin/movies/screens/installed")
	public  ResponseEntity<List<MovieToScreen>> geInstallations() 
	{
		return new ResponseEntity<List<MovieToScreen>>(movieScreenRepo.findAll(),HttpStatus.OK);		
	}
	
	@PostMapping("/admin/add/installation")
	@ResponseBody
	public HttpStatus addInstallation(@RequestBody MovieToScreen installed)
	{
		MovieToScreen m2s = movieScreenRepo.getByScreen(installed.getScreen());
		if(m2s != null) {
			return HttpStatus.CONFLICT;
		}
		installed = movieScreenRepo.save(installed);
		return HttpStatus.OK;
	}
	
	@DeleteMapping("/admin/delete/installation")
	@ResponseBody
	public HttpStatus deleteInstallation(@RequestBody MovieToScreen installed)
	{
		movieScreenRepo.delete(installed);
		return HttpStatus.OK;
	} 
	
	@PutMapping("/admin/update/installation")
	@ResponseBody
	public ResponseEntity<MovieToScreen> updateInstallation(@RequestBody MovieToScreen installed)
	{
		movieScreens = movieScreenRepo.save(installed);
		return new ResponseEntity<MovieToScreen>(installed,HttpStatus.OK);
	}
	
	
	

}
