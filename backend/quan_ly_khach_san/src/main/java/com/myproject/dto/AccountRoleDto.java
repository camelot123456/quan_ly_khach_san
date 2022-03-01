package com.myproject.dto;

import com.myproject.entity.AccountEntity;
import com.myproject.entity.RoleEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountRoleDto {
	private String id;
	private AccountEntity account;
	private RoleEntity role;
}
