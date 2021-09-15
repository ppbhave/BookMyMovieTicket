package com.softwareDevelopment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softwareDevelopment.model.Theater;
import com.softwareDevelopment.repos.TheaterRepo;

@Controller
public class TheaterController {

	@Autowired
	TheaterRepo theaterrepo;
	@Autowired
	Theater theater;
	
	@GetMapping("/admin/theaters")
	@ResponseBody
	public ResponseEntity<List<Theater>> getTheatersList()
	{
		List<Theater> theaters =theaterrepo.findAll();
		ResponseEntity<List<Theater>> resp=new ResponseEntity<List<Theater>>(theaters,HttpStatus.OK);
		return resp;
	}

}
