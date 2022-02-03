package com.capstone.peralta.controllers;

import com.capstone.peralta.models.User;
import com.capstone.peralta.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    User getById(@PathVariable Integer userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/all")
    List<User> getAll() {
        return userService.getAll();
    }

    @PostMapping
    User createUser(@RequestBody User user) {
        return userService.addUser(user);
    }
}
