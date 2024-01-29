package com.TM.Task.Manager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "tasks")
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "task_id")
	private int taskId;

	@Column(name = "task_name", length = 255)
	private String taskName;

	@Column(name = "status", columnDefinition = "boolean default false")
	private boolean status;

	// Other task-related fields can be added

	@ManyToOne
	@JoinColumn(name = "list_id", nullable = false)
	private UserLists userList;

	// Getters and setters
}