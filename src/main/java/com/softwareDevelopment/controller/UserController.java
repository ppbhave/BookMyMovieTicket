package com.softwareDevelopment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.softwareDevelopment.model.Account;
import com.softwareDevelopment.model.MessageHandler;
import com.softwareDevelopment.model.User;
import com.softwareDevelopment.repos.AccountRepo;
import com.softwareDevelopment.repos.UserRepo;

@RestController
public class UserController {
	@Autowired
	UserRepo userrepo;
	@Autowired
	User user;
	@Autowired
	Account account;
	@Autowired
	AccountRepo accountrepo;
	@Autowired
	MessageHandler mh;
	@Autowired
	BCryptPasswordEncoder passwordEncoder;
	
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody User register)
	{
		if(userrepo.findUserBySEmail(register.getsEmail()) !=null)
		{
			return new ResponseEntity<User>(register,HttpStatus.CONFLICT);
		}
		else {
			register=userrepo.save(register);
			return new ResponseEntity<User>(register,HttpStatus.OK);
		}
	}
	
	@PutMapping("/session/Profile/changes")
	public ResponseEntity<User> EditUser(@RequestBody User register)
	{
		User checkUser=userrepo.findUserBySEmail(register.getsEmail());
		if(checkUser !=null && checkUser.getId()!=register.getId())
		{
			return new ResponseEntity<User>(register,HttpStatus.CONFLICT);
		}
		else {
			register=userrepo.save(register);
			return new ResponseEntity<User>(register,HttpStatus.OK);
		}
	}
	
	@GetMapping("/session/user/{id}")
	public User getUser(@PathVariable("id") int id)
	{
		return userrepo.findById(id).get();
	}
	
	@GetMapping("/session/account/{id}")
	public Account getlogin(@PathVariable("id") int id)
	{
		return accountrepo.findById(id).get();
	}
	
	
	@PostMapping("/credentials")
	public MessageHandler setCredentials(@RequestBody Account newAccount)
	{
		account=accountrepo.findByUsername(newAccount.getsUsername());
		if(account!=null)
		{
			mh.setMessage("CONFLICT");
			mh.setHttpstatus(HttpStatus.CONFLICT);
		}
		else {
			newAccount.setsPassword(passwordEncoder.encode(newAccount.getsPassword()));
			account=accountrepo.save(newAccount);
			mh.setMessage("OK");
			mh.setHttpstatus(HttpStatus.OK);
		}
		return mh;
	}
	
	@PostMapping("/userlogin")
	public ResponseEntity<User> login(@RequestBody Account login)
	{
		account=accountrepo.findByUsername(login.getsUsername());
		if(account==null || !account.getsPassword().equals(login.getsPassword()))
		{
			return new ResponseEntity<User>(login.getUser(),HttpStatus.CONFLICT);
		}
		else {
			return new ResponseEntity<User>(account.getUser(),HttpStatus.OK);
		}
	}
}
