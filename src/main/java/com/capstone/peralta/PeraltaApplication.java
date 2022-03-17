package com.capstone.peralta;

import com.capstone.peralta.models.*;
import com.capstone.peralta.services.ImageService;
import com.capstone.peralta.services.UserService;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.boot.CommandLineRunner;
import com.capstone.peralta.models.Item;
import com.capstone.peralta.services.ImageService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.*;
import org.springframework.web.filter.CorsFilter;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@SpringBootApplication
public class PeraltaApplication {

	@Resource
	ImageService imageService;


	public static void main(String[] args) {
		SpringApplication.run(PeraltaApplication.class, args);
	}

	public void run(String... arg) throws Exception{
		imageService.init();
	}

	@Bean
	BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	//Just a test function NOTE: Comment out later
	@Bean
	CommandLineRunner run (UserService userService) {
		return args -> {
		};
	}
}
