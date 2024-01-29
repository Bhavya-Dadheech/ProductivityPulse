package com.TM.Task.Manager.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.TM.Task.Manager.entity.User;

@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findOneByEmailAndPassword(String email, String password);

	User findByEmail(String email);

	@Query("SELECT u FROM User u WHERE u.user_id = :userId")
	User findByUserUserId(@Param("userId") int userId);

}
