package com.TM.Task.Manager.service;

import java.util.List;

import com.TM.Task.Manager.dto.LoginDto;
import com.TM.Task.Manager.dto.UserDto;
import com.TM.Task.Manager.entity.User;
import com.TM.Task.Manager.response.LoginResponse;

public interface UserService {

	String addUser(UserDto userDto);

	LoginResponse loginUser(LoginDto loginDto);

	List<User> getAllUsers();

}
