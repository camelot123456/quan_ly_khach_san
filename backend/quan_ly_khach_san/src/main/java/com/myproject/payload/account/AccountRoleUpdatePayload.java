package com.myproject.payload.account;

import java.util.List;

import com.myproject.entity.enums.EAuthProvider;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountRoleUpdatePayload {

	private String id;
	
	private String name;
	
	private String email;
	
	private String address;
	
	private EAuthProvider authProvider;
	
	private String phoneNum;
	
	private List<String> roles;
	
}
