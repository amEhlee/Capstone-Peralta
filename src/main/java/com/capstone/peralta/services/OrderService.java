package com.capstone.peralta.services;

import com.capstone.peralta.models.Order;
import com.capstone.peralta.repos.OrderRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private OrderRepo orderRepo;

    public Order getOrderById(int id) {
        return orderRepo.getById(id);
    }

    public List<Order> getAll() {
        return orderRepo.findAll();
    }

    public Order addOrder(Order order) {
        return orderRepo.save(order);
    }
}
