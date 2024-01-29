package com.TM.Task.Manager.controller;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TM.Task.Manager.dto.JwtRequest;
import com.TM.Task.Manager.dto.JwtResponse;
import com.TM.Task.Manager.dto.UserDto;
import com.TM.Task.Manager.repo.UserRepository;
import com.TM.Task.Manager.response.ResponseHandler;
import com.TM.Task.Manager.security.JwtHelper;
import com.TM.Task.Manager.service.CustomUserDetailsService;
import com.TM.Task.Manager.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	UserService userService;

	@Autowired
	CustomUserDetailsService customUserDetailsService;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private JwtHelper helper;

	private Logger logger = LoggerFactory.getLogger(AuthController.class);

	@PostMapping("/register")
	public ResponseEntity<?> addUser(@RequestBody UserDto userDto) {

		if (userDto.getUsername() != null && userDto.getEmail() != null && userDto.getPassword() != null) {
			String resp = userService.addUser(userDto);

			return ResponseHandler.responseBuilder(resp + "user added successfully", HttpStatus.OK, null);
		} else {
			return ResponseHandler.responseBuilder("Please provide valid data", HttpStatus.OK, null);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

		if (request.getEmail() != null && request.getPassword() != null) {
			this.doAuthenticate(request.getEmail(), request.getPassword());

			UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.getEmail());
			String token = this.helper.generateToken(userDetails);
			Date expirationDate = this.helper.getExpirationDateFromToken(token);

			JwtResponse response = JwtResponse.builder().jwtToken(token)
					.username(customUserDetailsService.getUserName(userDetails.getUsername()))
					.user_id(customUserDetailsService.getUserId(userDetails.getUsername())).exp_date(expirationDate)
					.build();
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(new JwtResponse("", "Bad Credentials", 0, null), HttpStatus.BAD_REQUEST);
		}
	}

	private void doAuthenticate(String email, String password) {

		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
		try {
			manager.authenticate(authentication);
		} catch (BadCredentialsException e) {
			throw new BadCredentialsException(" Invalid Username or Password  !!");
		}

	}

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<?> exceptionHandler() {
		return ResponseHandler.responseBuilder("Bad Credentials", HttpStatus.BAD_REQUEST, null);
	}

	@GetMapping("/users")
	private ResponseEntity<?> getAllUsers() {
		return ResponseHandler.responseBuilder("fetched successfully", HttpStatus.OK, userService.getAllUsers());
	}
}
