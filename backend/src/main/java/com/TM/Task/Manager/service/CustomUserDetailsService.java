package com.TM.Task.Manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.TM.Task.Manager.entity.CustomUser;
import com.TM.Task.Manager.repo.UserRepository;

public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		if (userRepository.findByEmail(username) != null) {
			UserDetails userDetails = User.builder().username(userRepository.findByEmail(username).getEmail())
					.password(userRepository.findByEmail(username).getPassword()).roles("USER").build();

			return userDetails;
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
//		throw new UsernameNotFoundException("User not found with username: " + username);
	}
	
	public String getUserName(String username) {
		return userRepository.findByEmail(username).getUsername();
	}
	
	public int getUserId(String username) {
		return userRepository.findByEmail(username).getUser_id();
	}

}
