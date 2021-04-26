package com.softwareDevelopment.repos;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.softwareDevelopment.model.locks;

public interface LockRepo extends JpaRepository<locks, Integer>{
	@Query("from locks where show.id=?1")
	List<locks> findLockByShowId(int show_id);
	
	@Query("from locks where seat.id=?1 and show.id=?2")
	locks findExistingLock(int seat_id,int show_id);

}
