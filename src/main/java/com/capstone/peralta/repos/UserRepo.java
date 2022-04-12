package com.capstone.peralta.repos;

import com.capstone.peralta.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * The interface User repository.
 *
 * @author Don Laliberte
 */
@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    /**
     * Find user by email.
     *
     * @param email the email
     * @return the user
     */
    User findUserByEmail(String email);

}
