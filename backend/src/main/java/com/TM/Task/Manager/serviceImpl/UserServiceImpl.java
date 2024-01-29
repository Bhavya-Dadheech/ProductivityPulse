package com.TM.Task.Manager.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.TM.Task.Manager.dto.LoginDto;
import com.TM.Task.Manager.dto.UserDto;
import com.TM.Task.Manager.entity.User;
import com.TM.Task.Manager.repo.UserRepository;
import com.TM.Task.Manager.response.LoginResponse;
import com.TM.Task.Manager.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public String addUser(UserDto userDto) {
		User user = new User(userDto.getUser_id(), userDto.getUsername(), userDto.getEmail(),
				this.passwordEncoder.encode(userDto.getPassword()), null);

		User user_check = userRepository.findByEmail(userDto.getEmail());

		if (user_check == null) {
			User saved_user = userRepository.save(user);
			return saved_user.getEmail();
		} else {
			if (user_check.getEmail().equals(user.getEmail())) {
				return "this email id already exists";
			} else if (user_check.getUsername().equals(user.getUsername())) {
				return "this username already exists";
			} else {
//				userRepository.save(user);
				return null;
			}
		}
	}

	@Override
	public LoginResponse loginUser(LoginDto loginDto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<User> getAllUsers() {
		List<User> users = userRepository.findAll();
		return users;
	}

}
