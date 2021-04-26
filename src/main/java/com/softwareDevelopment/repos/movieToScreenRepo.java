package com.softwareDevelopment.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.softwareDevelopment.model.Film;
import com.softwareDevelopment.model.MovieToScreen;
import com.softwareDevelopment.model.Screen;

public interface movieToScreenRepo extends JpaRepository<MovieToScreen, Integer>{
	@Query("from MovieToScreen where Movie.id=?1 and sLanguage=?2 and sScreenType=?3")
	List<MovieToScreen> findScreens(int movie_id, String sLanguage, String sScreenType);
//	@Query("from MovieToScreen where Screen.id=?1")
//	MovieToScreen getByScreen(int screen_id);
}
