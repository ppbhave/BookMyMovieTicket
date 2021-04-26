package com.softwareDevelopment.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.softwareDevelopment.model.Screen;
import com.softwareDevelopment.model.Seat;

public interface SeatRepo extends JpaRepository<Seat, Integer>{
	@Query("from Seat where screen=?1 order by pos")
	List<Seat> getAllSeatsByScreen(Screen screen);
}
