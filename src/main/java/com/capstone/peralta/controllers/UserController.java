package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.User;
import com.capstone.peralta.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "3000")
public class UserController {

    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    User getById(@PathVariable Integer userId) {
        return userService.getUserById(userId);
    }

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
