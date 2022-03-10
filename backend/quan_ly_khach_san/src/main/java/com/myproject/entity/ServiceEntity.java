package com.myproject.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "[services]")
public class ServiceEntity {
	
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
	
	@Column(name = "[avatar]", columnDefinition = "nvarchar(255)")
	private String avatar;
	
	@Column(name = "[price]", columnDefinition = "float default 0")
	private Double price;
	
	@Column(name = "[description]", columnDefinition = "nvarchar(max)")
	private String description;
	
//	1 service - n reservation_service
	@JsonManagedReference("service-reservation_service")
	@OneToMany(mappedBy = "service")
	private List<ReservationServiceEntity> reservationServiceArr;
	
//	----------------------------------transient------------------------------

	
	@Transient
	private Integer quantity;
	
	
}
