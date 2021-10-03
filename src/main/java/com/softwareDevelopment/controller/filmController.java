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

import com.softwareDevelopment.model.Film;
import com.softwareDevelopment.repos.FilmRepo;


@Controller
public class filmController {

	@Autowired
	FilmRepo filmrepo;
	@Autowired
	Film movie;
	
	@GetMapping(value={"/movies","/"})
	@ResponseBody
	public ResponseEntity<List<Film>> home()
	{
		List<Film> films =filmrepo.findAll();
		ResponseEntity<List<Film>> listoffilms=new ResponseEntity<List<Film>>(films,HttpStatus.OK);
		return listoffilms;
	}
	
	@GetMapping("/movie/{id}")
	@ResponseBody
	public ResponseEntity<Film> getMovieById(@PathVariable int id)
	{
		Film film=filmrepo.findById(id).orElseThrow();
		ResponseEntity<Film> resp=new ResponseEntity<Film>(film,HttpStatus.OK);
		return resp;
	}

	@PostMapping("admin/add/movie")
	@ResponseBody
	public HttpStatus newMovie(@RequestBody Film m)
	{
		filmrepo.save(m);
		return HttpStatus.OK;
	}
	
	@PutMapping("admin/update/movie")
	@ResponseBody
	public ResponseEntity<Film> updatemovie(@RequestBody Film film)
	{
		movie = filmrepo.save(film);
		return new ResponseEntity<Film>(movie,HttpStatus.OK);
	}
	
	@DeleteMapping("admin/delete/movie")
	@ResponseBody
	public HttpStatus deleteMovie(@RequestBody Film film)
	{
		filmrepo.delete(film);
		return HttpStatus.OK;
	}   
}
