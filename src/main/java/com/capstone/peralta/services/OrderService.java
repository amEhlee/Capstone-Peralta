package com.capstone.peralta.services;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.Order;
import com.capstone.peralta.repos.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private final OrderRepo orderRepo;

    public OrderService(OrderRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

    public Order getOrderById(int id) {
        return orderRepo.getById(id);
    }

    public List<Order> getAll() {
        return orderRepo.findAll();
    }

    public Order addOrder(Order order) {
        return orderRepo.save(order);
    }

    public List<Order> addMultiple(List<Order> orderList) {
        return orderRepo.saveAll(orderList);
    }
}
