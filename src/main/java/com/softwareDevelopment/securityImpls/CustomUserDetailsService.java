package com.softwareDevelopment.securityImpls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.softwareDevelopment.model.Account;
import com.softwareDevelopment.repos.AccountRepo;
@Service
public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private AccountRepo accountRepo;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Account acc= accountRepo.findByUsername(username);
		if(acc==null) {
			throw new UsernameNotFoundException("Invalid Credentials!!");
		}
		return new CustomUserDetail(acc);
	}

}
