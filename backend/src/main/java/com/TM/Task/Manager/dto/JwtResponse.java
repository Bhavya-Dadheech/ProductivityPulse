package com.TM.Task.Manager.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
public class JwtResponse {
	private final String jwtToken;
	@Builder.Default
	private final String username = "";
	private final int user_id;
	private final Date exp_date;
}
