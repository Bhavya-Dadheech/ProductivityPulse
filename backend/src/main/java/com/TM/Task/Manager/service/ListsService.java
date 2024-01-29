package com.TM.Task.Manager.service;

import java.util.List;

import com.TM.Task.Manager.entity.UserLists;

public interface ListsService {

//	public String addLists(UserLists userList);
//	
//	public List<UserLists> getAllList();
//	
//	public UserLists getListById(int list_id);
//
//	public String updateList(UserLists userList);
//
//	public String deleteList(int list_id);

	public String saveList(UserLists userList, int userId);

	public List<UserLists> getAllListsByUserId(int userId);

	public String deleteList(int listId);

	public String updateList(UserLists userList, int userId);

	public UserLists getListById(int listId);

}
