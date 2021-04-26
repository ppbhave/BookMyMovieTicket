package com.softwareDevelopment.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.softwareDevelopment.model.Film;

public interface FilmRepo extends JpaRepository<Film, Integer>{
	@Query("from Film")	
	List<Film> findAll();
}
