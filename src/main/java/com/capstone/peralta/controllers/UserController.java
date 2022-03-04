package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.Role;
import com.capstone.peralta.models.User;
import com.capstone.peralta.services.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.annotation.security.RolesAllowed;
import javax.xml.bind.SchemaOutputResolver;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "3000")
@RequiredArgsConstructor
@RolesAllowed("USER")
public class UserController {

    @Autowired
    private final UserService userService;


    public void filter() {

    }

    //Returns all Users
    @GetMapping("/users")
    public ResponseEntity<List<User>>getUsers() { return ResponseEntity.ok().body(userService.getAll()); }

    //Saves User to java object from React
    @PostMapping("/user/save")
    public ResponseEntity<User>saveUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.addUser(user));
    }

/*    @PostMapping("/user/delete")
    public void deleteUser(@RequestBody User user) {
        userService.deleteUser(user);
    }*/

    //Saves role to java object from React
    @PostMapping("/role/save")
    public ResponseEntity<Role>saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("role/save").toUriString());
        return ResponseEntity.created(uri).body(userService.addRole(role));
    }

    //Adds roles to user
    @PostMapping("/role/addtouser")
    public ResponseEntity<Role>addRoleToUser(@RequestBody RoleToUserForm form) {
        userService.addRoleToUser(form.getEmail(),form.getRoleName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    User getById(@PathVariable Integer userId) {
        return userService.getUserById(userId);
    }

    //Grabs user details by email, mostly useless for now
/*    @PostMapping("/authenticate")
    UserDetails getUserDetails(@RequestBody String userEmail) {
        return userService.loadUserByUsername(userEmail);
    } */

    @GetMapping("/all")
    List<User> getAll() {
        return userService.getAll();
    }

    //Currently incompatible with security
/*    @PostMapping("/add")
    User createUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PostMapping("/addMultiple")
    List<User> addMultiple(@RequestBody List<User> userList) {
        return userService.addMultiple(userList);

    }*/

    @Data
    class RoleToUserForm {
        private String email;
        private String roleName;
    }
}
