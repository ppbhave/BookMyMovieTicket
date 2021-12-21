package com.softwareDevelopment.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
import com.softwareDevelopment.model.Shows;
import com.softwareDevelopment.repos.ScreenRepo;
import com.softwareDevelopment.repos.ShowRepo;
import com.softwareDevelopment.repos.movieToScreenRepo;

@Controller
public class MovieShowController {
	@Autowired
	ShowRepo showrepo;
	@Autowired
	movieToScreenRepo movieOnScreen;
	@Autowired
	ScreenRepo screenrepo;

	@ResponseBody
	@GetMapping("/shows/{movie_id}/{show_date}/{language}/{format}")
	public ResponseEntity<List<List<Shows>>> getMovieShows(@PathVariable int movie_id, @PathVariable String language,
			@PathVariable String format, @PathVariable String show_date) { // 20210910
		String yyyy = show_date.substring(0, 4);
		String dd = show_date.substring(4, 6);
		String mm = show_date.substring(6, 8);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
		LocalDateTime showDate1 = LocalDateTime.parse(dd + "-" + mm + "-" + yyyy + " 00:00", formatter);
		LocalDateTime showDate2 = showDate1.plusDays(1);
		List<MovieToScreen> screenconnect = movieOnScreen.findScreens(movie_id, language, format);

		List<List<Shows>> listShows = new ArrayList<List<Shows>>();

		for (MovieToScreen ms : screenconnect) {
			List<Shows> lshow = showrepo.findByScreenAndDate(ms.getScreen(), showDate1, showDate2);
			if (lshow.size() > 0)
				listShows.add(lshow);
		}
		return new ResponseEntity<List<List<Shows>>>(listShows, HttpStatus.OK);
	}

	@ResponseBody
	@GetMapping("/show/{show_id}")
	public ResponseEntity<Shows> getShowbyId(@PathVariable int show_id) { // 20210910
		Shows show = showrepo.findById(show_id).get();
		if(show != null && show.getId() > 0) {
			return new ResponseEntity<Shows>(show, HttpStatus.OK);
		}
		return new ResponseEntity<Shows>(show, HttpStatus.CONFLICT);
	}

	
	@ResponseBody
	@GetMapping("admin/screen/shows/{dateFrom}/{dateTo}/{screenId}")
	public ResponseEntity<List<List<Shows>>> getShowsForScreen(@PathVariable int screenId,
			@PathVariable String dateFrom, @PathVariable String dateTo) { // 20210910
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

		String yyyy = dateFrom.substring(0, 4);
		String dd = dateFrom.substring(4, 6);
		String mm = dateFrom.substring(6, 8);
		LocalDateTime showDate1 = LocalDateTime.parse(dd + "-" + mm + "-" + yyyy + " 00:00", formatter);

		yyyy = dateTo.substring(0, 4);
		dd = dateTo.substring(4, 6);
		mm = dateTo.substring(6, 8);
		LocalDateTime showDate2 = LocalDateTime.parse(dd + "-" + mm + "-" + yyyy + " 00:00", formatter);

		List<Shows> lshow = showrepo.findByScreenAndDate(screenrepo.findById(screenId).get(), showDate1, showDate2);

		List<List<Shows>> listShows = new ArrayList<List<Shows>>();
		
		if(lshow.size() > 0) {
			LocalDateTime currentDate = showDate1;
			List<Shows> showDay = new ArrayList<Shows>();
			
			for(int i=0; i < lshow.size(); i++ ) {
				if (! currentDate.toLocalDate().isEqual(lshow.get(i).getdStartTiming().toLocalDate())) {
					listShows.add(showDay);
					showDay = new ArrayList<Shows>();
				}
				showDay.add(lshow.get(i));
			}
			listShows.add(showDay);
		}
		return new ResponseEntity<List<List<Shows>>>(listShows, HttpStatus.OK);
	}

	@ResponseBody
	@PostMapping("/admin/show/addition")
	public HttpStatus setMovieShow(@RequestBody Shows show) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
		show.setdStartTiming(LocalDateTime.parse(show.getDatetime(), formatter));
		show = showrepo.save(show);
		if (show.getId() > 0) {
			return HttpStatus.OK;
		} else {
			return HttpStatus.EXPECTATION_FAILED;
		}
	}

	@ResponseBody
	@PutMapping("admin/show/update")
	public HttpStatus updateMovieShow(@RequestBody Shows show) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
		show.setdStartTiming(LocalDateTime.parse(show.getDatetime(), formatter));
		show = showrepo.save(show);
			return HttpStatus.OK;
	}

	@ResponseBody
	@DeleteMapping("/admin/show/delete")
	public HttpStatus deleteMovieShow(@RequestBody Shows show) {
		showrepo.delete(showrepo.findById(show.getId()).get());
		return HttpStatus.OK;
	}

	@ResponseBody
	@GetMapping("/session/show/{id}")
	public ResponseEntity<Shows> getShowById(@PathVariable int show_id) {
		Shows show = showrepo.findById(show_id).get();
		return new ResponseEntity<Shows>(show, HttpStatus.OK);
	}

}
