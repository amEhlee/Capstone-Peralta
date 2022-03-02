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
	public CorsFilter corsFilter() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		final CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		//config.addAllowedOrigin("*"); // this allows all origin
		config.addAllowedOrigin("http://localhost:3000");
		//config.addAllowedOrigin("http://localhost:8080");
		config.addAllowedHeader("*"); // this allows all headers
		config.addAllowedMethod("OPTIONS");
		config.addAllowedMethod("HEAD");
		config.addAllowedMethod("GET");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("DELETE");
		config.addAllowedMethod("PATCH");
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}

	@Bean
	BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	//Just a test function NOTE: Comment out later
	@Bean
	CommandLineRunner run (UserService userService) {
		return args -> {
			userService.addRole(new Role(1, "ROLE_USER"));
			userService.addRole(new Role(2, "ROLE_ADMIN"));
			userService.addRole(new Role(3, "ROLE_OWNER"));


			userService.addUser(new User(1,"admin@gmail.com", "password", "Mister", "Admin", "someplace", "T3J2Y9", "403678123") );
			userService.addUser(new User(2,"john@gmail.com", "t100", "John", "Connor", "someplace", "T1K4V7", "403789123") );

			userService.addRoleToUser("admin@gmail.com", "ROLE_USER");
			userService.addRoleToUser("admin@gmail.com", "ROLE_ADMIN");

			userService.addRoleToUser("john@gmail.com", "ROLE_USER");
		};
	}
}
