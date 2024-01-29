package com.TM.Task.Manager.dto;

import com.TM.Task.Manager.entity.UserLists;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TaskDto {
    private int taskId;
    private String taskName;
    private UserLists userList;
}
