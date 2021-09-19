package com.softwareDevelopment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softwareDevelopment.model.Booking;
import com.softwareDevelopment.model.Screen;
import com.softwareDevelopment.model.Seat;
import com.softwareDevelopment.model.Shows;
import com.softwareDevelopment.model.locks;
import com.softwareDevelopment.repos.BookingRepo;
import com.softwareDevelopment.repos.LockRepo;
import com.softwareDevelopment.repos.SeatRepo;
import com.softwareDevelopment.repos.ShowRepo;

@Controller
public class SeatsController {
	@Autowired
	SeatRepo seatsrepo;
	@Autowired
	BookingRepo bookingrepo;
	@Autowired
	LockRepo lockrepo;
	@Autowired
	ShowRepo showrepo;

	
	@GetMapping("/session/show/seats/{show_id}")
	@ResponseBody
	public ResponseEntity<List<Seat>> getAllAvailableSeatsForShow(@PathVariable("show_id") int show_id)
	{
		Shows show=showrepo.findById(show_id).get();
		Screen s=show.getScreen();
		List<Seat> seats=seatsrepo.getAllSeatsByScreen(s);
		List<Booking> bookingsForShow=bookingrepo.findByShowId(show_id);
		List<locks> lockedSeats=lockrepo.findLockByShowId(show_id);
		seats=seatsrepo.getAllSeatsByScreen(show.getScreen());
		for(Booking b:bookingsForShow)
		{
			seats.get(seats.indexOf(b.getSeat())).setBookedFlag(true);
		}
		for(locks l:lockedSeats)
		{
			seats.get(seats.indexOf(l.getSeat())).setBookedFlag(true);
		}
		return new ResponseEntity<List<Seat>>(seats,HttpStatus.OK);
	}
	
/*	@RequestMapping("/booking")
	public String lockSelectedSeats(Model m, @RequestParam List<Seat> seats,@RequestParam int show_id, @RequestParam int User_id)
	{
		boolean isBookingPossible=true;
		for(Seat seat: seats)
		{
			if(bookingrepo.findExistingBooking(show_id, seat.getId())!=null)
			{
				isBookingPossible=false;
				break;
			}
			if(isBookingPossible  && lockrepo.findExistingLock(seat.getId(),show_id)!=null)
			{
				isBookingPossible=false;
				break;
			}
			
		}
			
			if(isBookingPossible)
			{
				for(Seat seat: seats) {
					lock.setSeat(seat);
					lock.setShow(showrepo.findById(show_id).get());
					lockrepo.save(lock);
				}
				
				m.addAttribute("lockedSeats", seats);
				m.addAttribute("user_locker_id", User_id);
				m.addAttribute("show_id", show_id);
				return ""; //payment gateway
			}
			else {
				m.addAttribute("ErrorMessage", "Some or all seats have occupied. Please try again.");
				m.addAttribute("", ".");
				m.addAttribute("viewRedirection", "");
				return ""; //errorPage and then home..
			}
	}   */
	
	@RequestMapping("/session/bookingAbort")
	public String releaseLock(Model m, @RequestParam List<Seat> seats,@RequestParam int show_id)
	{
		for(Seat seat: seats) {
			lockrepo.delete(lockrepo.findExistingLock(seat.getId(), show_id));
		}
		m.addAttribute("ErrorMessage", "Session Expired. Booking failed");
		return "";
	}
	
	@PostMapping("/admin/seat/add")
	@ResponseBody
	public ResponseEntity<Seat> addSeat(@RequestBody Seat seat)
	{
		seat = seatsrepo.save(seat);
		return new ResponseEntity<Seat>(seat,HttpStatus.OK);
		
	}
	
	@PostMapping("/admin/seat/install/{rows}/{cols}")
	@ResponseBody
	public ResponseEntity<Integer> installSeats(@RequestBody Screen screen, @PathVariable int rows,  @PathVariable int cols )
	{
		if(rows*cols != screen.getjTotalSeats()) {
			return new ResponseEntity<Integer>(0,HttpStatus.BAD_REQUEST);
		}
		char seatPos='A';
		int seatsAdded=0;
		for(int i=0;i<rows;i++) {
			for(int j=0;j<cols;j++) {
				seatsrepo.save(new Seat(screen,seatPos+""+(j+1),false));
				seatsAdded++;
			}
			seatPos++;
		}
		return new ResponseEntity<Integer>(seatsAdded,HttpStatus.OK);
		
	}


}
