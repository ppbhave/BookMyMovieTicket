package com.softwareDevelopment.securityImpls;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtFilter extends OncePerRequestFilter{
		
		@Autowired 
		private JwtUtil jwtUtil;
		@Autowired
		private CustomUserDetailsService userDetailService;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String reqTokenHeader = request.getHeader("Authorization");
		String userName=null;
		String reqToken = null;

		
		if(reqTokenHeader != null && reqTokenHeader.startsWith("Bearer")) {
			reqToken = reqTokenHeader.substring(7);
			try {
				userName = this.jwtUtil.getUsernameFromToken(reqToken);
				
			}catch(Exception e) {
				System.out.println("Wrong credentials");
			}
			UserDetails userDetail= this.userDetailService.loadUserByUsername(userName);
			if(userName!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetail, null, userDetail.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);
			
			} else {
				System.out.println("User token is not validated");
			}			
		}
		filterChain.doFilter(request, response);
	}

}
