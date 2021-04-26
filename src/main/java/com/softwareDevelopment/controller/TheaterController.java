package com.softwareDevelopment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.softwareDevelopment.model.Theater;
import com.softwareDevelopment.repos.TheaterRepo;

@Controller
public class TheaterController {

	@Autowired
	TheaterRepo theaterrepo;
	@Autowired
	Theater theater;

}
