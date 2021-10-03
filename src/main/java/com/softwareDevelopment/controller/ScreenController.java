package com.softwareDevelopment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softwareDevelopment.model.Screen;
import com.softwareDevelopment.model.Theater;
import com.softwareDevelopment.repos.ScreenRepo;
import com.softwareDevelopment.repos.TheaterRepo;

@Controller
public class ScreenController {

	@Autowired
	ScreenRepo screenrepo;
	@Autowired
	List<Screen> screens;
	@Autowired
	TheaterRepo theaterrepo;
	
	@GetMapping("/screens")
	@ResponseBody
	public ResponseEntity<List<Screen>> getScreens()
	{
		screens=screenrepo.findAll();
		ResponseEntity<List<Screen>> resp = new ResponseEntity<List<Screen>>(screens,HttpStatus.OK);
		return resp;
	}
	
	@PostMapping("/admin/add/screen")
	@ResponseBody
	public Screen addScreen(@RequestBody Screen screen)
	{
		screen = screenrepo.save(screen);
		if(screen.getId() > 0) {
			Theater t =screen.getTheater();
			t.setjNoOfScreens(t.getjNoOfScreens()+1);
			theaterrepo.save(t);
		}
		return screen;
	}
	
	@DeleteMapping("admin/delete/screen")
	@ResponseBody
	public HttpStatus deleteTheater(@RequestBody Screen screen)
	{
		screenrepo.delete(screen);
		return HttpStatus.OK;
	} 
	
	@PutMapping("admin/update/screen")
	@ResponseBody
	public ResponseEntity<Screen> updateTheater(@RequestBody Screen screen)
	{
		screen = screenrepo.save(screen);
		return new ResponseEntity<Screen>(screen,HttpStatus.OK);
	}
	
}
