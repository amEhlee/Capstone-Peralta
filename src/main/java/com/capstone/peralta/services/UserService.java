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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.Map;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class UserService implements UserDetailsService {

    @Autowired
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;

    public User getUserById(Integer id) {
        return userRepo.getById(id);
    }

    public User addUser(User user) {
        log.info("Saving new User into Database");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

/*    public void deleteUser(User user) {
        log.info("User deleted");
        userRepo.removeUserById(user.getUserId());
    }*/

    public void updateUser(User user) {
        log.info("Updating User " + user.getEmail());
        userRepo.update(user);
    }

    public Role addRole(Role role) {
        log.info("Saving new Role into Database");
        return roleRepo.save(role);
    }

    public User getUserByName(String email) {
        log.info("Fetching User: {}", email);
        return userRepo.findUserByEmail(email);
    }

    public void addRoleToUser(String email, String roleName) {
        log.info("Adding role {} to user {}", roleName, email);
        User user = userRepo.findUserByEmail(email);
        Role role = roleRepo.findByRoleName(roleName);
        user.getRoles().add(role);
    }

    public Role getRoleById(int id) { return roleRepo.getById(id); }

    public Role getRoleByName(String name) { return roleRepo.findByRoleName(name); }

    public List<User> getAll() {
        log.info("Fetching all Users");
        return userRepo.findAll();
    }

    public List<User> addMultiple(List<User> userList) { return userRepo.saveAll(userList); }

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

    public PasswordEncoder getPasswordEncoder() {
        return passwordEncoder;
    }

}
