package com.myproject.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.myproject.entity.enums.EAuthProvider;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[accounts]")
public class AccountEntity extends AbstractEntity {

	@Column(name = "[name]", columnDefinition = "nvarchar(30)")
	private String name;

	@Column(name = "[address]", columnDefinition = "nvarchar(255)")
	private String address;

	@Email
	@Column(name = "[email]", columnDefinition = "varchar(320)")
	private String email;

	@Column(name = "[phone_num]", columnDefinition = "char(15)")
	private String phoneNum;
	
	@Column(name = "[avatar]", columnDefinition = "nvarchar(255)")
	private String avatar;

	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(name = "[auth_provider]", columnDefinition = "varchar(10)")
	private EAuthProvider authProvider;

	@Column(name = "[enabled]", columnDefinition = "bit default 1")
	private Boolean enabled;

	@Column(name = "otp_code", columnDefinition = "char(64)")
	private String otpCode;
	
	@Column(name = "[verified]", columnDefinition = "bit default 0")
	private Boolean verified;
	
	@JsonIgnore
	@Column(name = "[password]", columnDefinition = "varchar(255)")
	private String password;

//	1 account - n account_role
	@OneToMany(mappedBy = "account")
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
}
