package com.myproject.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "[services]")
public class ServiceEntity extends AbstractEntity{

	@Column(name = "[name]", columnDefinition = "nvarchar(64)")
	private String name; 
	
	@Column(name = "[photo]", columnDefinition = "nvarchar(255)")
	private String photo;
	
	@Column(name = "[price]", columnDefinition = "float default 0")
	private String price;
	
	@Column(name = "[description]", columnDefinition = "nvarchar(max)")
	private String description;
	
//	1 service - n reservation_service
	@OneToMany(mappedBy = "service")
	private List<ReservationServiceEntity> reservationServiceArr;
}
