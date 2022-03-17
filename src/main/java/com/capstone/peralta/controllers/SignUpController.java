package com.capstone.peralta.controllers;

import com.capstone.peralta.models.User;
import com.capstone.peralta.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/signup")
@CrossOrigin(origins = "3000")
@RequiredArgsConstructor
public class SignUpController {

    @Autowired
    private final UserService userService;

    //Saves User to java object from React (Used for signup)
    @PostMapping("/save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        //TODO:We need backend validation for signing up to be placed here

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.addUser(user));
    }
}
