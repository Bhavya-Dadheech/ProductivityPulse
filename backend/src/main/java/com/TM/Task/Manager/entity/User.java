package com.TM.Task.Manager.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "userLists")
public class User {

	@Id
	@Column(name = "user_id", length = 45)
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int user_id;

	@Column(name = "username", length = 255)
	private String username;

	@Column(name = "email", length = 255)
	private String email;

	@Column(name = "password", length = 255)
	private String password;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<UserLists> userLists;
}
