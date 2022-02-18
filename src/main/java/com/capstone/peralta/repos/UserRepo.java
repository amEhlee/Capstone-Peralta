package com.capstone.peralta.repos;

import com.capstone.peralta.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    User findUserByEmail(String email);
    List<User> findAll();

/*    void remove(User user);*/
}
