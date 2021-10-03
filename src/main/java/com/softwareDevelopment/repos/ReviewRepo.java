package com.softwareDevelopment.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.softwareDevelopment.model.Review;
import com.softwareDevelopment.model.Film;
import java.util.List;

public interface ReviewRepo extends JpaRepository<Review, Integer>{

	@Query("from Review where movie.id=?1")
	List<Review> findByMovieId(int id);
	
	@Query("from Review where movie.id=?1")
	List<Review> findReviewCount(int id);
	
	int countByMovie(Film movie);
	@Query("select count(r) from Review r where r.movie=?1 and r.jRating = ?2")
	int countByMovieAndRating(Film movie, int rating);
}

