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
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "[roomtypes]")
public class RoomTypeEntity {
	
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
	

	@Column(name = "[name]", columnDefinition = "nvarchar(64)")
	private String name;
	
	@Column(name = "[price]", columnDefinition = "float default 0")
	private Double price;
	
	@Column(name = "[description]", columnDefinition = "nvarchar(max)")
	private String description;
	
//	1 room_type - n room
	
	@JsonManagedReference("room-roomtype")
	@OneToMany(mappedBy = "roomType", fetch = FetchType.LAZY)
	private List<RoomEntity> rooms;
	
//	1 room_type - n room_type_photos
	@JsonManagedReference("roomtype_photo-roomtype")
	@OneToMany(mappedBy = "roomType", fetch = FetchType.LAZY)
	private List<RoomTypePhotoEntity> roomTypePhotoArr;
	
//	-------------------------------------Transient------------------------------------------
	
	@JsonIgnore
	@Transient
	private String[] ids;
	
}
