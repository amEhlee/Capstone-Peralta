package com.capstone.peralta.services;

import ch.qos.logback.core.CoreConstants;
import com.capstone.peralta.exceptions.EmailNotFoundException;
import com.capstone.peralta.models.Role;
import com.capstone.peralta.models.User;
import com.capstone.peralta.repos.RoleRepo;
import com.capstone.peralta.repos.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.xml.bind.SchemaOutputResolver;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service @RequiredArgsConstructor @Transactional
public class UserService implements UserDetailsService {

    @Autowired
    private final UserRepo userRepo;
    @Autowired
    private final RoleRepo roleRepo;

    public User saveUser(User user) { return userRepo.save(user); }

    public Role saveRole(Role role) { return roleRepo.save(role); }

    public User getUserById(int id) { return userRepo.getById(id); }

    public Role getRoleById(int id) { return roleRepo.getById(id); }

    public List<User> getAll() { return userRepo.findAll(); }

    public User addUser(User user) { return userRepo.save(user); }

    public List<User> addMultiple(List<User> userList) { return userRepo.saveAll(userList); }

    public UserDetails loadUserByUsername(String login) throws EmailNotFoundException {
        String email = login.substring(login.indexOf("=") + 1, login.indexOf("password") - 1).replace("%40", "@"); //TODO: Find out why this doesn't work as intended
        System.out.println(email);
        User user = userRepo.findUserByEmail(email);
        if (user == null) {
            System.out.println("Email does not exist in database");
            throw new EmailNotFoundException("Email does not exist in database");
        }
        else {
            System.out.println("User Loaded!");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> { //grabs all role fields for user
            authorities.add(new SimpleGrantedAuthority(role.getRoleName())); //adds them to authorities list
        });
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities); //Returns new Spring Security User Class NOT our User class with loaded privileges
    }

}
