package com.TM.Task.Manager.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.TM.Task.Manager.entity.UserLists;

@Repository
@EnableJpaRepositories
public interface LIstsRepo extends JpaRepository<UserLists, Integer> {
	
	@Query("SELECT ul FROM UserLists ul WHERE ul.user.user_id = :userId")
	List<UserLists> findByUserId(@Param("userId") int userId);
	
}
