package com.softwareDevelopment.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.softwareDevelopment.model.User;

public interface UserRepo extends JpaRepository<User, Integer>{
	
	@Query("from User where sEmail=?1")
	User findUserBySEmail(String sEmail);

}
