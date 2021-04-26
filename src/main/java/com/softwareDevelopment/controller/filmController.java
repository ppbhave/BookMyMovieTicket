package com.softwareDevelopment.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.softwareDevelopment.model.Film;
import com.softwareDevelopment.model.Filters;
import com.softwareDevelopment.repos.FilmRepo;


@Controller
public class filmController {

	@Autowired
	FilmRepo filmrepo;
	@Autowired
	Film movie;
	
	@GetMapping(value={"/movies","/"})
	@ResponseBody
	public ResponseEntity<List<Film>> home(@RequestParam String language,@RequestParam String format,@RequestParam String genre)
	{
		List<Film> films =new ArrayList<Film>();
		boolean include;
		for(Film movie:filmrepo.findAll()) {
			include=true;
			if(!language.equals("none") && movie.getsLanguages().indexOf(language)<0) {
				include=false;
			}
			if(!format.equals("none") && movie.getsScreenType().indexOf(format)<0) {
				include=false;
			}
			if(!genre.equals("none") && movie.getsGenre().indexOf(genre)<0) {
				include=false;
			}			
			if(include) {
				films.add(movie);
			}
		}
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
	/*
	@PostMapping("filtered/movies")
	@ResponseBody
	public List<Film> getMovieByFilter(@RequestBody Filters filters)
	{
		List<Film> AllFilms = filmrepo.findAll();
		List<Film> filteredFilms = new ArrayList<>();
		for(Film filmTest:AllFilms)
		{
			if ((filters.getsGenre()==null || filmTest.getsGenre().indexOf(filters.getsGenre())>=0) &&
			(filters.getsLanguages()==null || filmTest.getsLanguages().indexOf(filters.getsLanguages())>=0) &&
			(filters.getsScreenType()==null || filmTest.getsScreenType().indexOf(filters.getsScreenType())>=0))
			{
				filteredFilms.add(filmTest);
			}
		}
		return filteredFilms;
	}
	
	@PostMapping("/addMovie")
	@ResponseBody
	public String newMovie(@RequestBody Film m)
	{
		filmrepo.save(m);
		return "";
	}
	
	@PutMapping("/updatemovie")
	@ResponseBody
	public String updatemovie(@RequestBody Film film)
	{
		filmrepo.save(movie);
		return "";
	}
	
	@DeleteMapping("/deleteMovie")
	@ResponseBody
	public String deleteMovie(@RequestBody Film film)
	{
		filmrepo.delete(movie);
		return "";
	}   */
}
