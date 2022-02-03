package com.capstone.peralta.services;

import com.capstone.peralta.models.User;
import com.capstone.peralta.repos.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserRepo userRepo;

    public User getUserById(int id) {
        return userRepo.getById(id);
    }

    public List<User> getAll() {
        return userRepo.findAll();
    }

    public User addUser(User user) {
        return userRepo.save(user);
    }
}
