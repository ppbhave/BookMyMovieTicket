package com.softwareDevelopment.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.softwareDevelopment.model.Shows;
import com.softwareDevelopment.model.Screen;

import java.time.LocalDateTime;
import java.util.List;

public interface ShowRepo extends JpaRepository<Shows, Integer>{
	@Query("from Shows where screen=?1 and dStartTiming between ?2 and ?3 order by dStartTiming")
	List<Shows> findByScreenAndDate(Screen screen,LocalDateTime show_date1, LocalDateTime show_date2);	
}
