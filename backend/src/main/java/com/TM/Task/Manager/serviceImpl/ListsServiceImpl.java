package com.TM.Task.Manager.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.TM.Task.Manager.entity.Task;
import com.TM.Task.Manager.entity.User;
import com.TM.Task.Manager.entity.UserLists;
import com.TM.Task.Manager.repo.LIstsRepo;
import com.TM.Task.Manager.repo.TaskRepo;
import com.TM.Task.Manager.repo.UserRepository;
import com.TM.Task.Manager.service.ListsService;

@Service
public class ListsServiceImpl implements ListsService {

	@Autowired
	private LIstsRepo listRepo;

	@Autowired
	private UserRepository userRepository;

	@Override
	public String saveList(UserLists userList, int userId) {
		User user = userRepository.findByUserUserId(userId);
		userList.setUser(user);
		listRepo.save(userList);
		return "success";
	}

	@Override
	public List<UserLists> getAllListsByUserId(int userId) {
		List<UserLists> ul = listRepo.findByUserId(userId);
		for (UserLists ul1 : ul) {
			ul1.setUser(null);
			List<Task> tk = ul1.getTasks();
			for (Task tk1 : tk) {
				tk1.setUserList(null);
			}
		}
		return ul;
	}

	@Override
	public String deleteList(int listId) {
		listRepo.deleteById(listId);
		return "deleted";
	}

	@Override
	public String updateList(UserLists updatedList, int userId) {
		UserLists existingList = listRepo.findById(updatedList.getList_id()).orElse(null);

		if (existingList != null) {
			// Update properties of the existing list with the new values
			existingList.setList_name(updatedList.getList_name());
			existingList.setUser(userRepository.findByUserUserId(userId));

			// Update associated Tasks
			List<Task> existingTasks = existingList.getTasks();
			List<Task> updatedTasks = updatedList.getTasks();

			// Assuming both existingTasks and updatedTasks have the same size
			for (int i = 0; i < existingTasks.size(); i++) {
				Task existingTask = existingTasks.get(i);
				Task updatedTask = updatedTasks.get(i);

				// Update properties of the existing task with the new values
				existingTask.setTaskName(updatedTask.getTaskName());
				// Update other properties as needed
			}

			// Save the updated UserLists with associated Tasks
			listRepo.save(existingList);

			return "success";
		} else {
			return "List not found";
		}
	}

	@Override
	public UserLists getListById(int listId) {
		return listRepo.findById(listId).orElse(null);
	}

}
