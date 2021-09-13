package com.softwareDevelopment.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softwareDevelopment.model.Film;
import com.softwareDevelopment.model.MovieToScreen;
import com.softwareDevelopment.model.Screen;
import com.softwareDevelopment.model.Shows;
import com.softwareDevelopment.repos.FilmRepo;
import com.softwareDevelopment.repos.ShowRepo;
import com.softwareDevelopment.repos.movieToScreenRepo;

@Controller
public class MovieShowController {
	@Autowired
	ShowRepo showrepo;
	@Autowired
	movieToScreenRepo movieOnScreen;

	@ResponseBody
	@GetMapping("/shows/{movie_id}/{show_date}/{language}/{format}")
	public ResponseEntity<List<List<Shows>>> getMovieShows(@PathVariable int movie_id,@PathVariable String language,@PathVariable String format,@PathVariable String show_date) 
	{	//20210704
		String yyyy=show_date.substring(0, 4);
		String dd=show_date.substring(4,6);
		String mm=show_date.substring(6,8);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
		LocalDateTime showDate1=LocalDateTime.parse(dd+"-"+mm+"-"+yyyy+" 00:00",formatter);
		LocalDateTime showDate2=showDate1.plusDays(1);
		List<MovieToScreen> screenconnect=movieOnScreen.findScreens(movie_id, language, format);
		
		List<List<Shows>> listShows=new ArrayList<List<Shows>>();
		
		for(MovieToScreen ms:screenconnect) {
			listShows.add(showrepo.findByScreenAndDate(ms.getScreen(), showDate1, showDate2));
		}
		return new ResponseEntity<List<List<Shows>>>(listShows,HttpStatus.OK);
	} 

	@ResponseBody
	@PostMapping("/admin/show/addition")
	public ResponseEntity<HttpStatus> setMovieShow(@RequestBody Shows show) 
	{
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
		show.setdStartTiming(LocalDateTime.parse(show.getDatetime(),formatter));
		show=showrepo.save(show);
		if(show.getId()>0) {
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}else {
			return new ResponseEntity<HttpStatus>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@ResponseBody
	@GetMapping("/session/show/{id}")
	public ResponseEntity<Shows> getShowById(@PathVariable int show_id)
	{	
		Shows show=showrepo.findById(show_id).get();
		return new ResponseEntity<Shows>(show,HttpStatus.OK);
	} 

}
