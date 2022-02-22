package com.myproject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[account_role]")
public class AccountRoleEntity {
	
	@Id
	@Column(name = "[id]", columnDefinition = "varchar(10)")
	protected String id;
	
	
//	1 account_role - 1 account
	@ManyToOne
	@JoinColumn(name = "[id_account]")
	@JsonBackReference("account-account_role")
	private AccountEntity account;
	
//	1 account_role - 1 role
	@ManyToOne
	@JoinColumn(name = "[id_role]")
	@JsonBackReference("role-account_role")
	private RoleEntity role;
	
}

