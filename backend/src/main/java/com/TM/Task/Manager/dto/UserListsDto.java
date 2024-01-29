package com.TM.Task.Manager.dto;

import com.TM.Task.Manager.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserListsDto {

	private int list_id;
	private String list_name;
	private User user;
}
