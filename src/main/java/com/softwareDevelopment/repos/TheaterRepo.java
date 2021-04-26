package com.softwareDevelopment.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.softwareDevelopment.model.Theater;

public interface TheaterRepo extends JpaRepository<Theater, Integer>{

}