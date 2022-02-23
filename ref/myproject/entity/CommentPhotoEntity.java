package com.myproject.entity;

import javax.persistence.Column;
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
@Table(name = "[comment_photo]")
public class CommentPhotoEntity extends AbstractEntity{

	@Column(name = "[URL]", columnDefinition = "nvarchar(255)")
	private String url;
	
//	1 comment_photo - 1 comment
	@ManyToOne
	@JoinColumn(name = "id_comment")
	private CommentEntity comment;
}
