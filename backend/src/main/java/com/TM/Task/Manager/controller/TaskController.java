package com.TM.Task.Manager.controller;

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

import com.TM.Task.Manager.entity.Task;
import com.TM.Task.Manager.entity.UserLists;
import com.TM.Task.Manager.response.ResponseHandler;
import com.TM.Task.Manager.serviceImpl.TaskServiceImpl;

@RestController
@RequestMapping("/api/task")
public class TaskController {

	@Autowired
	TaskServiceImpl taskServiceImpl;
	
	@PostMapping("/save_task/{listId}")
	public ResponseEntity<?> saveTask(@RequestBody Task task, @PathVariable int listId) {

		if (task.getTaskName() == null || task.getTaskName() == "") {
			return ResponseHandler.responseBuilder("please provide valid task name", HttpStatus.BAD_REQUEST, null);
		} else {
			return ResponseHandler.responseBuilder("task saved successfully", HttpStatus.OK,
					taskServiceImpl.saveTask(task, listId));
		}

	}
	
	@GetMapping("/get_tasks/{listId}")
	public ResponseEntity<?> getAllTasks(@PathVariable int listId) {
		return ResponseHandler.responseBuilder("tasks fetched successfully", HttpStatus.OK,
				taskServiceImpl.getAllTaskByListId(listId));
	}
	
	@PutMapping("/update_task/{listId}")
	public ResponseEntity<?> updateTask(@RequestBody Task task, @PathVariable int listId){
		return ResponseHandler.responseBuilder("task updated successfully", HttpStatus.OK, taskServiceImpl.updateTask(task,listId));
	}
	
	@DeleteMapping("/delete_task/{taskId}")
	public ResponseEntity<?> deleteTask(@PathVariable int taskId){
		return ResponseHandler.responseBuilder("task deleted successfully", HttpStatus.OK, taskServiceImpl.deleteTask(taskId));
	}
}
