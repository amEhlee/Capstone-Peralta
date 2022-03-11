package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Role;
import com.capstone.peralta.models.User;
import com.capstone.peralta.services.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.annotation.security.RolesAllowed;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "3000")
@RequiredArgsConstructor
@RolesAllowed({"ROLE_ADMIN", "ROLE_OWNER"})
public class AdminController {

    @Autowired
    private final UserService userService;

    //Returns all Users for the admin view
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getAll());
    }

    //Adds multiple Users to DB, most likely un-needed
    @PostMapping("/addMultiple")
    List<User> addMultiple(@RequestBody List<User> userList) {
        return userService.addMultiple(userList);

    }


    //Saves an applicable role to java object from React
    @PostMapping("/role/save")
    public ResponseEntity<Role>saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("role/save").toUriString());
        return ResponseEntity.created(uri).body(userService.addRole(role));
    }

    //Adds roles to a user
    @PostMapping("/role/addtouser")
    public ResponseEntity<Role>addRoleToUser(@RequestBody AdminController.RoleToUserForm form) {
        userService.addRoleToUser(form.getEmail(),form.getRoleName());
        return ResponseEntity.ok().build();
    }

    //Converts a role to a specific format necessary for role processing. We need the role name to be attached to an email.
    @Data
    class RoleToUserForm {
        private String email;
        private String roleName;
    }

}
