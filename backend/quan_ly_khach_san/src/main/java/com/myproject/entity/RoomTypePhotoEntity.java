package com.myproject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "[roomtype_photo]")
public class RoomTypePhotoEntity {
	
	@Id
	@Column(name = "[id]", columnDefinition = "varchar(10)")
	protected String id;

	@Column(name = "[avatar]", columnDefinition = "bit")
	private Boolean avatar;
	
	@Column(name = "[url]", columnDefinition = "nvarchar(255)")
	private String url;
	
//	1 room_type_photo - 1 room_type
	@JsonBackReference("roomtype_photo-roomtype")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "[id_roomtype]")
	private RoomTypeEntity roomType;
	
}
