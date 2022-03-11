package com.capstone.peralta.services;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.User;
import com.capstone.peralta.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User getUserById(Integer id) {
        return userRepo.getById(id);
    }

    public List<User> getAll() {
        return userRepo.findAll();
    }

    public User addUser(User user) {
        return userRepo.save(user);
    }

    public List<User> addMultiple(List<User> userList) {
        return userRepo.saveAll(userList);
    }
}
