package com.TM.Task.Manager.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.TM.Task.Manager.entity.Task;

import jakarta.transaction.Transactional;

@Repository
@EnableJpaRepositories
public interface TaskRepo extends JpaRepository<Task, Integer> {

	@Query("SELECT tasks FROM Task tasks WHERE tasks.userList.list_id = :listId")
	List<Task> findByListId(@Param("listId") int listId);

	@Transactional
    @Modifying
    @Query("DELETE FROM Task tasks WHERE tasks.userList.list_id = :listId")
	void deleteByUserListListId(@Param("listId") int listId);
}
