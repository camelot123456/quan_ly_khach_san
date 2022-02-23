package com.myproject.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[account_role]")
public class AccountRoleEntity extends AbstractEntity{
	
//	1 account_role - 1 account
	@ManyToOne
	@JoinColumn(name = "[id_account]")
	private AccountEntity account;
	
//	1 account_role - 1 role
	@ManyToOne
	@JoinColumn(name = "[id_role]")
	private RoleEntity role;
	
}

