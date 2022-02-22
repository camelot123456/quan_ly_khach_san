package com.myproject.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.myproject.entity.enums.EAuthProvider;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "[accounts]")
public class AccountEntity {
	
	@Id
	@Column(name = "[id]", columnDefinition = "varchar(10)")
	protected String id;
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	@Column(name = "[created_at]", columnDefinition = "datetime", updatable = false)
	protected Date createdAt;
	
	@CreatedBy
	@Column(name = "[created_by]", columnDefinition = "nvarchar(50)", updatable = false)
	protected String createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	@Column(name = "[modified_at]", columnDefinition = "datetime")
	protected Date modifiedAt;
	
	@LastModifiedBy
	@Column(name = "[modifiedBy]", columnDefinition = "nvarchar(50)")
	protected String modifiedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "[deleted_at]", columnDefinition = "datetime")
	protected Date deletedAt;
	
	@Column(name = "[deleted_by]", columnDefinition = "nvarchar(50)")
	protected String deletedBy;
	
	@Column(name = "[deleted]", columnDefinition = "bit")
	protected Boolean deleted; 
	

	@Column(name = "[name]", columnDefinition = "nvarchar(30)")
	private String name;

	@Column(name = "[address]", columnDefinition = "nvarchar(255)")
	private String address;

	@Column(name = "[email]", columnDefinition = "varchar(320)")
	private String email;

	@Column(name = "[phone_num]", columnDefinition = "char(15)")
	private String phoneNum;
	
	@Column(name = "[avatar]", columnDefinition = "nvarchar(255)")
	private String avatar;

	@Enumerated(EnumType.STRING)
	@Column(name = "[auth_provider]", columnDefinition = "varchar(10)")
	private EAuthProvider authProvider;

	@Column(name = "[enabled]", columnDefinition = "bit default 1")
	private Boolean enabled;

	@JsonIgnore
	@Column(name = "otp_code", columnDefinition = "char(64)")
	private String otpCode;
	
	@Column(name = "[verified]", columnDefinition = "bit default 0")
	private Boolean verified;
	
	@JsonIgnore
	@Column(name = "[password]", columnDefinition = "varchar(255)")
	private String password;

//	1 account - n account_role
	@OneToMany(mappedBy = "account")
	@JsonManagedReference("account")
	private List<AccountRoleEntity> AccountRoleArr;

//	1 account - n transaction
	@OneToMany(mappedBy = "account")
	private List<TransactionEntity> transactions;

//	1 account - n reservation
	@OneToMany(mappedBy = "account")
	private List<ReservationEntity> reservations;

//	1 account - n comment
	@OneToMany(mappedBy = "account")
	private List<CommentEntity> comments;
	
//	----------------------------------Transient------------------------------------
	
	@Transient
	@JsonIgnore
	private String[] ids;
}
