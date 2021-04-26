package com.softwareDevelopment.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.softwareDevelopment.model.Review;
import com.softwareDevelopment.model.Film;
import java.util.List;

public interface ReviewRepo extends JpaRepository<Review, Integer>{

	@Query("from Review where movie.id=?1")
	List<Review> findByMovieId(int id);
}

