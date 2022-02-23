package com.myproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myproject.entity.RoleEntity;

public interface IRoleRepo extends JpaRepository<RoleEntity, String>{

}
