package com.capstone.peralta.services;

import ch.qos.logback.core.CoreConstants;
import com.capstone.peralta.exceptions.EmailNotFoundException;
import com.capstone.peralta.models.Role;
import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.User;
import com.capstone.peralta.repos.RoleRepo;
import com.capstone.peralta.repos.UserRepo;
import com.fasterxml.jackson.core.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.json.JsonParseException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.Map;
/**
 * The User service. Contains all business logic for the User model
 * Serves as the bridge from user controller to user repository
 * @author Don Laliberte
 */
@Service @RequiredArgsConstructor @Transactional @Slf4j
public class UserService implements UserDetailsService {

    @Autowired
    private final UserRepo userRepo;
    @Autowired
    private final RoleRepo roleRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    /**
     * Gets user by id.
     * @param id the id
     * @return the user found by id
     */
    public User getUserById(Integer id) {
        return userRepo.getById(id);
    }

    /**
     * Adds user to database.
     * @param user user to add
     * @return the user added to database
     */
    public User addUser(User user) {
        user.setEmail(user.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String formattedPostalCode = user.getPostalCode().replaceAll("[\\s-]", "");
        String formattedPhoneNumber = user.getPhoneNumber().replaceAll("[\\s\\D-]","");
        user.setPostalCode(formattedPostalCode);
        user.setPhoneNumber(formattedPhoneNumber);
        User returnUser = userRepo.save(user);
        addRoleToUser(user.getEmail(), "ROLE_USER");
        return returnUser;
    }

    /**
     * Delete user from database
     * @param user user to delete
     */
    public void deleteUser(User user) {
        User deletedUser = new User(user.getUserId());
        userRepo.save(deletedUser);
    }

    /**
     * Update user in database
     * @param user user to update
     */
    public void updateUser(User user) { //TODO: Not done yet needs checks
        user.setEmail(user.getEmail().toLowerCase());
        log.info("Updating User " + user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String formattedPostalCode = user.getPostalCode().replaceAll("[\\s-]", "");
        String formattedPhoneNumber = user.getPhoneNumber().replaceAll("[\\s\\D-]","");
        user.setPostalCode(formattedPostalCode);
        user.setPhoneNumber(formattedPhoneNumber);
        userRepo.save(user);
    }

    /**
     * Save a new role into database
     * @param role role to save
     * @return the role saved
     */
    public Role addRole(Role role) {
        log.info("Saving new Role into Database");
        return roleRepo.save(role);
    }

    /**
     * Gets user by given email.
     * @param email to check for
     * @return the user found by email
     */
    public User getUserByName(String email) {
        log.info("Fetching User: {}", email);
        return userRepo.findUserByEmail(email);
    }

    /**
     * Add role to user
     * @param email email of user to add role to
     * @param roleName role to be added
     */
    public void addRoleToUser(String email, String roleName) {
        log.info("Adding role {} to user {}", roleName, email);
        User user = userRepo.findUserByEmail(email);
        Role role = roleRepo.findByRoleName(roleName);
        if (user.getRoles().contains(role)) {
            log.info("User already has this role");
        }
        else {
            log.info("User Role Added");
            user.getRoles().add(role);
            userRepo.save(user);
        }

    }

    /**
     * Gets role by role id 
     * @param roleId id of role to find
     * @return role to be returned
     */
    public Role getRoleById(int id) { return roleRepo.getById(id); }

    /**
     * Gets role by role name
     * @param roleName name of role to find
     * @return role to be returned
     */
    public Role getRoleByName(String name) { return roleRepo.findByRoleName(name); }

    /**
     * Gets all users from database
     * @return list of users
     */
    public List<User> getAll() {
        log.info("Fetching all Users");
        return userRepo.findAll();
    }

    /**
     * adds multiple users to database
     * @param users list of users to add
     * @return list of users added
     */
    public List<User> addMultiple(List<User> userList) { return userRepo.saveAll(userList); }

    /**
     * Gets a user based on their identifier in this case email
     * @param email email of user to find
     * @return user found
     */
    public UserDetails loadUserByUsername(String userEmail) throws EmailNotFoundException {
        log.info(userEmail);
        User userDbResult = userRepo.findUserByEmail(userEmail);
        if (userDbResult == null) {
            log.info("Email does not exist in database");
            throw new EmailNotFoundException("Email does not exist in database");
        }
        else {
            log.info("User Loaded!");
        }


        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        userDbResult.getRoles().forEach(role -> { //grabs all role fields for user
            authorities.add(new SimpleGrantedAuthority(role.getRoleName())); //adds them to authorities list
        });
        return new org.springframework.security.core.userdetails.User(userDbResult.getEmail(), userDbResult.getPassword(), authorities); //Returns new Spring Security User Class NOT our User class with loaded privileges
    }

    /**
     * Encodes the user password
     * @return password encorder
     */
    public BCryptPasswordEncoder getPasswordEncoder() {
        return passwordEncoder;
    }

}
