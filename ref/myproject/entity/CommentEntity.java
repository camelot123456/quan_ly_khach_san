package com.myproject.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "[comments]")
public class CommentEntity extends AbstractEntity{
	
	@Column(name = "[rated]", columnDefinition = "int")
	private Integer rated;
	
	@Column(name = "[content]", columnDefinition = "nvarchar(1024)")
	private String content;
	
	@Column(name = "[id_parent]", columnDefinition = "varchar(10)")
	private String idParent;
	
//	1 comment - 1 account
	@ManyToOne
	@JoinColumn(name = "id_account")
	private AccountEntity account;
	
//	1 comment - 1 room
	@ManyToOne
	@JoinColumn(name = "id_room")
	private RoomEntity room;
	
//	1 comment - n comment_photo
	@OneToMany(mappedBy = "comment")
	private List<CommentPhotoEntity> commentPhotoArr;
} 
