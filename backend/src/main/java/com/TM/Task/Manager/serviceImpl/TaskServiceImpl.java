package com.TM.Task.Manager.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TM.Task.Manager.entity.Task;
import com.TM.Task.Manager.entity.User;
import com.TM.Task.Manager.entity.UserLists;
import com.TM.Task.Manager.repo.LIstsRepo;
import com.TM.Task.Manager.repo.TaskRepo;
import com.TM.Task.Manager.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	TaskRepo taskRepo;

	@Autowired
	ListsServiceImpl listServiceImpl;

	@Override
	public String saveTask(Task task, int list_id) {
		UserLists ul = listServiceImpl.getListById(list_id);
		task.setUserList(ul);
		taskRepo.save(task);
		return "success";
	}

	@Override
	public List<Task> getAllTaskByListId(int list_id) {
		List<Task> tasks = taskRepo.findByListId(list_id);
		for (Task tasks1 : tasks) {
			tasks1.getUserList().setTasks(null);
			tasks1.getUserList().setUser(null);
		}
		return tasks;
	}

	@Override
	public String deleteTask(int taskId) {
		taskRepo.deleteById(taskId);
		return "success";
	}

	@Override
	public String updateTask(Task task, int list_id) {
		UserLists ul = listServiceImpl.getListById(list_id);
		task.setUserList(ul);
		taskRepo.save(task);
		return "success";

	}

	@Override
	public Task getTaskById(int taskId) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
    public void deleteTasksByListId(int listId) {
		taskRepo.deleteByUserListListId(listId);
    }

}
