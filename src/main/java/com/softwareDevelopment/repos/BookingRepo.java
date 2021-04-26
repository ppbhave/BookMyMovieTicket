package com.softwareDevelopment.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.softwareDevelopment.model.Booking;

public interface BookingRepo extends JpaRepository<Booking, Integer>{
	@Query("from Booking where show.id=?1")
	List<Booking> findByShowId(int show_id);
	@Query("from Booking where user.id=?1 order by show")
	List<Booking> findByUserId(int user_id);
}
