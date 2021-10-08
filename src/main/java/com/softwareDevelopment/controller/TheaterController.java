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

import com.softwareDevelopment.model.Theater;
import com.softwareDevelopment.repos.TheaterRepo;

@Controller
public class TheaterController {

	@Autowired
	TheaterRepo theaterrepo;
	@Autowired
	Theater theater;
	
	@GetMapping(value="admin/theaters")
	@ResponseBody
	public ResponseEntity<List<Theater>> theaters()
	{
		List<Theater> theaters = theaterrepo.findAll();
		ResponseEntity<List<Theater>> listoftheaters =new ResponseEntity<List<Theater>>(theaters,HttpStatus.OK);
		return listoftheaters;
	}
	
	@GetMapping("admin/theater/{id}")
	@ResponseBody
	public ResponseEntity<Theater> getTheaterById(@PathVariable int id)
	{
		Theater Theater=theaterrepo.findById(id).get();
		ResponseEntity<Theater> resp=new ResponseEntity<Theater>(Theater,HttpStatus.OK);
		return resp;
	}

	@PostMapping("admin/add/theater")
	@ResponseBody
	public HttpStatus newTheater(@RequestBody Theater m)
	{
		theaterrepo.save(m);
		return HttpStatus.OK;
	}
	
	@PutMapping("admin/update/theater")
	@ResponseBody
	public HttpStatus updateTheater(@RequestBody Theater theater)
	{
		theater = theaterrepo.save(theater);
		return HttpStatus.OK;
	}
	
	@DeleteMapping("admin/delete/theater")
	@ResponseBody
	public HttpStatus deleteTheater(@RequestBody Theater theater)
	{
		try{
			theaterrepo.delete(theater);
		} catch(Exception e) {
			return HttpStatus.BAD_REQUEST;
		}
		return HttpStatus.OK;
	}   

}
