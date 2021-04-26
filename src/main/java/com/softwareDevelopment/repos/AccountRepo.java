package com.softwareDevelopment.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.softwareDevelopment.model.Account;
import com.softwareDevelopment.model.User;
import java.util.List;

public interface AccountRepo extends JpaRepository<Account, Integer>{
	
	@Query("from Account where sUsername=?1")
	Account findByUsername(String sUserName);
		@Query("from Account where user.id=?1")
		Account findByUserId(int id);
}
