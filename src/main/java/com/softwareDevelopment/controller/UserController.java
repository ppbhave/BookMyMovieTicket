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

	@PostMapping("/register/user")
	public HttpStatus userVerification(@RequestBody User user) {
		if (userrepo.findUserBySEmail(user.getsEmail()) != null) {
			return HttpStatus.CONFLICT;
		} else {
			return HttpStatus.OK;
		}
	}

	@PostMapping("/register")
	public HttpStatus registration(@RequestBody Account account) {
		if (userrepo.findUserBySEmail(account.getUser().getsEmail()) != null) {
			return HttpStatus.CONFLICT;
		} else {
			if (accountrepo.findByUsername(account.getsUsername()) != null) {
				return HttpStatus.CONFLICT;
			} else {
				account.setUser(userrepo.save(account.getUser()));
				account.setsPassword(passwordEncoder.encode(account.getsPassword()));
				account = accountrepo.save(account);
				return HttpStatus.OK;
			}
		}
	}

	@PutMapping("/session/Profile/changes")
	public HttpStatus EditUser(@RequestBody User register) {
		User checkUser = userrepo.findUserBySEmail(register.getsEmail());
		if (checkUser != null && checkUser.getId() != register.getId()) {
			return HttpStatus.CONFLICT;
		} else {
			register = userrepo.save(register);
			return HttpStatus.OK;
		}
	}

	@GetMapping("/session/user/{id}")
	public User getUser(@PathVariable("id") int id) {
		return userrepo.findById(id).get();
	}

	@GetMapping("/session/account/{id}")
	public Account getlogin(@PathVariable("id") int id) {
		return accountrepo.findById(id).get();
	}

	@PutMapping("/update/credentials")
	public HttpStatus updateCredentials(@RequestBody Account newAccount) {
		account = accountrepo.findByUsername(newAccount.getsUsername());
		if (account != null && account.getId() != newAccount.getId()) {
			return HttpStatus.CONFLICT;
		} else if (account.getsPassword() != newAccount.getsOldPassword()) {
			return HttpStatus.BAD_REQUEST;
		} else {
			newAccount.setsPassword(passwordEncoder.encode(newAccount.getsPassword()));
			account = accountrepo.save(newAccount);
			return HttpStatus.OK;
		}
	}

	@PostMapping("/credentials")
	public MessageHandler setCredentials(@RequestBody Account newAccount) {
		account = accountrepo.findByUsername(newAccount.getsUsername());
		if (account != null) {
			mh.setMessage("CONFLICT");
			mh.setHttpstatus(HttpStatus.CONFLICT);
		} else {
			newAccount.setsPassword(passwordEncoder.encode(newAccount.getsPassword()));
			account = accountrepo.save(newAccount);
			mh.setMessage("OK");
			mh.setHttpstatus(HttpStatus.OK);
		}
		return mh;
	}

	@PostMapping("/userlogin")
	public ResponseEntity<Account> login(@RequestBody Account login) {
		account = accountrepo.findByUsername(login.getsUsername());
		if (account == null || !passwordEncoder.matches(login.getsPassword(), account.getsPassword())) {
			return new ResponseEntity<Account>(login, HttpStatus.UNAUTHORIZED);
		} else {
			return new ResponseEntity<Account>(account, HttpStatus.OK);
		}

	}
}
