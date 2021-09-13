package com.softwareDevelopment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softwareDevelopment.model.Screen;
import com.softwareDevelopment.repos.ScreenRepo;

@Controller
public class ScreenController {

	@Autowired
	ScreenRepo screenrepo;
	@Autowired
	List<Screen> screens;
	
	@GetMapping("/screens")
	@ResponseBody
	public ResponseEntity<List<Screen>> getScreens()
	{
		screens=screenrepo.findAll();
		ResponseEntity<List<Screen>> resp = new ResponseEntity<List<Screen>>(screens,HttpStatus.OK);
		return resp;
	}
	
}
