package com.softwareDevelopment.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softwareDevelopment.model.Booking;
import com.softwareDevelopment.model.BookingRequest;
import com.softwareDevelopment.model.MessageHandler;
import com.softwareDevelopment.model.Shows;
import com.softwareDevelopment.repos.BookingRepo;
import com.softwareDevelopment.repos.LockRepo;
import com.softwareDevelopment.repos.SeatRepo;
import com.softwareDevelopment.repos.ShowRepo;
import com.softwareDevelopment.repos.UserRepo;
import com.softwareDevelopment.repos.movieToScreenRepo;

@Controller
public class BookingController {
	@Autowired
	BookingRepo bookingrepo;
	@Autowired
	ShowRepo showrepo;
	@Autowired
	UserRepo userrepo;
	@Autowired 
	LockRepo lockrepo;
	@Autowired
	movieToScreenRepo m2srepo;
	@Autowired
	SeatRepo seatsrepo;
	@Autowired
	Booking booking;
	@Autowired
	MessageHandler mh;
	
	@GetMapping("/session/Bookings/{show_id}")
	@ResponseBody
	public ResponseEntity<List<Booking>> getShowBookings(@PathVariable int show_id)
	{
		List<Booking> bookingsForShow=bookingrepo.findByShowId(show_id);
		return new ResponseEntity<List<Booking>>(bookingsForShow,HttpStatus.OK);
	}
	
	@GetMapping("/session/MyBookings/{user_id}")
	@ResponseBody
	public ResponseEntity<List<List<Booking>>> getUserBookings(@PathVariable int user_id)
	{
		List<Booking> bookingsbyUser=bookingrepo.findByUserId(user_id);
		List<List<Booking>> listByShows= new ArrayList<List<Booking>>();
		
		if(bookingsbyUser.size()>0)
		{
			Shows currentShow=bookingsbyUser.get(0).getShow();
			List<Booking> blist=new ArrayList<Booking>();
			listByShows.add(blist);
			for(Booking b:bookingsbyUser) {
				if(currentShow.equals(b.getShow())) {
					blist.add(b);
				}else {
					currentShow=b.getShow();
					blist=new ArrayList<Booking>();
					listByShows.add(blist);
					blist.add(b);
				}
			}
		}
		return new ResponseEntity<List<List<Booking>>>(listByShows,HttpStatus.OK);
	}
	
	@PostMapping("/session/seatbooking")
	@ResponseBody
	public MessageHandler bookingConfirmation(@RequestBody BookingRequest bookingReq)
	{
		for(int seat_id: bookingReq.getSeats_id()) {
			booking=new Booking();
			booking.setShow(showrepo.findById(bookingReq.getShow_id()).get());
			booking.setSeat(seatsrepo.findById(seat_id).get());
			booking.setUser(userrepo.findById(bookingReq.getUser_id()).get());
			//MovieToScreen m2s= m2srepo.getByScreen(booking.getShow().getScreen().getId());+" "+m2s.getsLAnguage()+" "+m2s.getsScreenType()
			booking.setsMovieName(bookingReq.getMovie());
			bookingrepo.save(booking);
			//lockrepo.delete(lockrepo.findExistingLock(booking.getSeat().getId(), booking.getShow().getId()));
		}
		mh.setMessage("Booking process is completed");
		mh.setHttpstatus(HttpStatus.OK);
		return mh;
	} 
}
