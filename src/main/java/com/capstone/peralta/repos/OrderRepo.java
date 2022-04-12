package com.capstone.peralta.repos;

import com.capstone.peralta.models.Order;
import com.capstone.peralta.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * The interface Order repository.
 *
 * @author Jared Smith
 */
@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {
    /**
     * Find all by a user.
     *
     * @param user the user
     * @return the list
     */
    List<Order> findAllByUser(User user);
}
