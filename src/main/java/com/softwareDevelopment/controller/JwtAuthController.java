package com.softwareDevelopment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.softwareDevelopment.model.JwtReq;
import com.softwareDevelopment.model.JwtResp;
import com.softwareDevelopment.securityImpls.CustomUserDetailsService;
import com.softwareDevelopment.securityImpls.JwtUtil;

@RestController
public class JwtAuthController {
	@Autowired
	private CustomUserDetailsService userDetailsService;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	BCryptPasswordEncoder passwordEncoder;

	@PostMapping("/authenticate")
	public ResponseEntity<JwtResp> authenticate(@RequestBody JwtReq jwtRequest) throws Exception {

		try {
			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(),
					jwtRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}

		UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
		String token = this.jwtUtil.generateToken(userDetails);

		return new ResponseEntity<JwtResp>(new JwtResp(token), HttpStatus.OK);
	}
}
