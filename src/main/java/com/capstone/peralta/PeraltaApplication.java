package com.capstone.peralta;

import com.capstone.peralta.models.*;
import com.capstone.peralta.services.ImageService;
import com.capstone.peralta.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.boot.CommandLineRunner;
import com.capstone.peralta.models.Item;
import com.capstone.peralta.services.ImageService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.*;
import org.springframework.web.filter.CorsFilter;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Slf4j
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
			try {
				log.info("Adding Owner Role");
				userService.addRole(new Role(null, "ROLE_OWNER"));
			}
			catch (Exception e) {
				log.info("Role Data already exists");
			}
			try {
				log.info("Adding User Role");
				userService.addRole(new Role(null, "ROLE_USER"));
			}
			catch (Exception e) {
				log.info("Role Data already exists");
			}
			try {
				log.info("Adding Admin Role");
				userService.addRole(new Role(null, "ROLE_ADMIN"));
			}
			catch (Exception e) {
				log.info("Role Data already exists");
			}


			try {
				log.info("Adding Guest User");
				userService.addUser(new User(1, "", "", "guest", "", "", "", ""));
			}
			catch (Exception e) {
				log.info("User Data already exists");
			}

			try {
				log.info("Adding Admin User");
				userService.addUser(new User(2, "admin@gmail.com", "password", "Mister", "Admin", "N/A", "T4R7F9", "4037684562"));

			}
			catch (Exception e) {
				log.info("User Data already exists");
			}

			try {
				log.info("Adding Basic User");
				userService.addUser(new User(3, "john@gmail.com", "terminator100", "John", "Connor", "Santa Monica", "T1K4V7", "4037891234"));
			}
			catch (Exception e) {
				log.info("User Data already exists");
			}

			try {
				userService.addRoleToUser("guest", "ROLE_USER");
			}
			catch (Exception e) {
				log.info("User Role Data already exists");
			}

			try {
				userService.addRoleToUser("admin@gmail.com", "ROLE_USER");
			}
			catch (Exception e) {
				log.info("User Role Data already exists");
			}
			try {
				userService.addRoleToUser("admin@gmail.com", "ROLE_ADMIN");
			}
			catch (Exception e) {
				log.info("User Role Data already exists");
			}


			try {
				userService.addRoleToUser("john@gmail.com", "ROLE_USER");
			}
			catch (Exception e) {
				log.info("User Role Data already exists");
			}

		};
	}
}
