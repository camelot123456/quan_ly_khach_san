package com.myproject.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[roles]")
@EntityListeners(AuditingEntityListener.class)
public class RoleEntity {
	
	@Id
	@Column(name = "[id]", columnDefinition = "varchar(10)")
	protected String id;
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	@Column(name = "[created_at]", columnDefinition = "datetime", updatable = false)
	protected Date createdAt;
	
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	@Column(name = "[modified_at]", columnDefinition = "datetime")
	protected Date modifiedAt;
	

	@Column(name = "[name]", columnDefinition = "nvarchar(30)")
	private String name;
	
	@Column(name = "[avatar]", columnDefinition = "nvarchar(255)")
	private String avatar;
	
	@Column(name = "[code]", columnDefinition = "varchar(16) not null unique")
	private String code;
	
//	1 role - n account_role
	@OneToMany(mappedBy = "role", fetch = FetchType.LAZY)
	@JsonManagedReference("role-account_role")
	private List<AccountRoleEntity> accountRoleArr;
	
//	---------------------------Transient-------------------------
	
	@Transient
	@JsonIgnore
	private String[] ids;
}