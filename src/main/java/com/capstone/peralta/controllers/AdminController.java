package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.Role;
import com.capstone.peralta.models.User;
import com.capstone.peralta.services.ItemService;
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

/**
 * Controller class for the Admin side of user models. Contains all the REST endpoints for admins
 * @author Don Laliberte
 * @author Elie Kabengele
 */
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "3000")
@RequiredArgsConstructor
@RolesAllowed({"ROLE_ADMIN", "ROLE_OWNER"})
public class AdminController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final ItemService itemService;

    /**
     * Returns all users for the admin view
     * @return list of admin users which will be formed into the response
     */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getAll());
    }

    /**
     * AddUser endpoint for admin
     * @param user the user to be added
     * @return the user that was added
     */
    //Add a user
    @PostMapping("/adduser")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    /**
     * AddMultiple endpoint for admin
     * adds multiple users to the database at once
     * @param users the users to be added
     * @return the users that were added
     */
    @PostMapping("/addMultiple")
    List<User> addMultiple(@RequestBody List<User> userList) {
        return userService.addMultiple(userList);

    }

    /**
     * AllItem endpoint for admin
     * returns the current list of items stored in database
     * @return the list of items
     */
    @GetMapping("/get/allItems")
    List<Item> getAll() {
        return itemService.getAll();
    }


    /**
     * AddRole endpoint for admin
     * saves a new user role into the database
     * @param role the role to be added
     * @return the role that was added
     */
    @PostMapping("/role/save")
    public ResponseEntity<Role>saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("role/save").toUriString());
        return ResponseEntity.created(uri).body(userService.addRole(role));
    }

    /**
     * AddRoleToUser endpoint for admin
     * adds a role to a user
     * @param form object containing the user identifier (email) and role id
     * @return the user that was added
     */
    @PostMapping("/role/addtouser")
    public ResponseEntity<Role>addRoleToUser(@RequestBody AdminController.RoleToUserForm form) {
        userService.addRoleToUser(form.getEmail(),form.getRoleName());
        return ResponseEntity.ok().build();
    }


    /**
     * Create a model to hold the user identifier (email) and role name
     * @author Don Laliberte
     */
    //Converts a role to a specific format necessary for role processing. We need the role name to be attached to an email.
    @Data
    class RoleToUserForm {
        private String email;
        private String roleName;
    }

}
