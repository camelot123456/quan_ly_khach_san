package com.myproject.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractEntity {

	@Id
	@Column(name = "[id]", columnDefinition = "varchar(10)")
	protected String id;
	
	@CreatedDate
	@Column(name = "[created_at]", columnDefinition = "datetime", updatable = false)
	protected Date createdAt;
	
	@CreatedBy
	@Column(name = "[created_by]", columnDefinition = "nvarchar(50)", updatable = false)
	protected String createdBy;
	
	@LastModifiedDate
	@Column(name = "[modified_at]", columnDefinition = "datetime")
	protected Date modifiedAt;
	
	@LastModifiedBy
	@Column(name = "[modifiedBy]", columnDefinition = "nvarchar(50)")
	protected String modifiedBy;
	
	@Column(name = "[deleted_at]", columnDefinition = "datetime")
	protected Date deletedAt;
	
	@Column(name = "[deleted_by]", columnDefinition = "nvarchar(50)")
	protected String deletedBy;

	@Column(name = "[deleted]", columnDefinition = "bit default 0")
	protected Boolean deleted;
}
