package com.TM.Task.Manager.service;

import java.util.List;

import com.TM.Task.Manager.entity.Task;

import jakarta.transaction.Transactional;

public interface TaskService {
	public String saveTask(Task task, int list_id);

	public List<Task> getAllTaskByListId(int list_id);

	public String deleteTask(int taskId);

	public String updateTask(Task task, int list_id);

	public Task getTaskById(int taskId);

	public void deleteTasksByListId(int listId);
}
