package com.myproject.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[comments]")
public class CommentEntity {
	
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
	
	
	@Column(name = "[rated]", columnDefinition = "int")
	private Integer rated;
	
	@Column(name = "[content]", columnDefinition = "nvarchar(1024)")
	private String content;
	
	@Column(name = "[id_parent]", columnDefinition = "varchar(10)")
	private String idParent;
	
//	1 comment - 1 account
	@JsonBackReference("comment-account")
	@ManyToOne
	@JoinColumn(name = "id_account")
	private AccountEntity account;
	
//	1 comment - 1 room
	@JsonBackReference("comment-room")
	@ManyToOne
	@JoinColumn(name = "id_room")
	private RoomEntity room;
	
//	1 comment - n comment_photo
	@JsonManagedReference("comment_photo-comment")
	@OneToMany(mappedBy = "comment")
	private List<CommentPhotoEntity> commentPhotoArr;
} 
