package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.User;
import com.capstone.peralta.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "3000")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;

    @GetMapping("/{userId}")
    User getById(@PathVariable Integer userId) {
        return userService.getUserById(userId);
    }

    @PostMapping("/authenticate")
    UserDetails getUserDetails(@RequestBody String login) { return userService.loadUserByUsername(login); } //Grabs user details by email

    @GetMapping("/all")
    List<User> getAll() {
        return userService.getAll();
    }

    @PostMapping("/add")
    User createUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PostMapping("/addMultiple")
    List<User> addMultiple(@RequestBody List<User> userList) {
        return userService.addMultiple(userList);

    }
}
