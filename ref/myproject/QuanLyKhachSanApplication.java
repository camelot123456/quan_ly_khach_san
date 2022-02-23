package com.myproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.myproject.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
@EnableJpaAuditing(auditorAwareRef = "auditorWare")
public class QuanLyKhachSanApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuanLyKhachSanApplication.class, args);
	}

}
