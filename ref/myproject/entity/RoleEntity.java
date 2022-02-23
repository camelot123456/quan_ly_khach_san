package com.myproject.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
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
@Table(name = "[roles]")
public class RoleEntity extends AbstractEntity{

	@Column(name = "[name]", columnDefinition = "nvarchar(30)")
	private String name;
	
	@Column(name = "[code]", columnDefinition = "varchar(16) not null unique")
	private String code;
	
//	1 role - n account_role
	@OneToMany(mappedBy = "role")
	private List<AccountRoleEntity> accountRoleArr;
}