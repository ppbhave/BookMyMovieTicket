package com.softwareDevelopment;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
@ControllerAdvice
public class ErrorHandler{
	
	@ExceptionHandler(NoSuchElementException.class)
	public ResponseEntity<?> noSuchElementExceptionHandling(NoSuchElementException exception, WebRequest request){
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> globalExceptionHandling(Exception exception, WebRequest request){
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	

}
