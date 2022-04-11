package com.capstone.peralta.repos;

import com.capstone.peralta.models.Order;
import com.capstone.peralta.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {
    List<Order> findAllByUser(User user);
}
