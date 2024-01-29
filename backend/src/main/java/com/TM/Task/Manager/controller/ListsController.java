package com.TM.Task.Manager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TM.Task.Manager.dto.UserDto;
import com.TM.Task.Manager.entity.UserLists;
import com.TM.Task.Manager.repo.LIstsRepo;
import com.TM.Task.Manager.response.ResponseHandler;
import com.TM.Task.Manager.service.UserService;
import com.TM.Task.Manager.serviceImpl.ListsServiceImpl;
import com.TM.Task.Manager.serviceImpl.TaskServiceImpl;

@RestController
@RequestMapping("/api/lists")
public class ListsController {

	@Autowired
	ListsServiceImpl listServiceimpl;

	@Autowired
	TaskServiceImpl taskServiceImpl;

	@GetMapping("/get_lists/{userId}")
	public ResponseEntity<?> getAllLists(@PathVariable int userId) {
//		List<UserLists> uls = listServiceimpl.getAllListsByUserId(userId);
//		for (UserLists ul : uls) {
//			System.out.println(ul);
//		}
		return ResponseHandler.responseBuilder("list fetched successfully", HttpStatus.OK,
				listServiceimpl.getAllListsByUserId(userId));
	}

	@PostMapping("/save_list/{userId}")
	public ResponseEntity<?> saveList(@RequestBody UserLists userlists, @PathVariable int userId) {

		if (userlists.getList_name() == null || userlists.getList_name() == "") {
			return ResponseHandler.responseBuilder("please provide valid list name", HttpStatus.BAD_REQUEST, null);
		} else {
			return ResponseHandler.responseBuilder("list saved successfully", HttpStatus.OK,
					listServiceimpl.saveList(userlists, userId));
		}

	}

	@PutMapping("/update_list/{listId}")
	public ResponseEntity<?> updateList(@RequestBody UserLists userlists, @PathVariable int listId) {
		return ResponseHandler.responseBuilder("list updated successfully", HttpStatus.OK,
				listServiceimpl.updateList(userlists, listId));
	}

	@DeleteMapping("/delete_list/{listId}")
	public ResponseEntity<?> deleteList(@PathVariable int listId) {
		taskServiceImpl.deleteTasksByListId(listId);
		return ResponseHandler.responseBuilder("list deleted successfully", HttpStatus.OK,
				listServiceimpl.deleteList(listId));
	}

}
