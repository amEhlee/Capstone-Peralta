package com.capstone.peralta.services;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.Order;
import com.capstone.peralta.models.User;
import com.capstone.peralta.repos.OrderRepo;
import com.capstone.peralta.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private final OrderRepo orderRepo;

    @Autowired
    private final UserRepo userRepo;

    public OrderService(OrderRepo orderRepo, UserRepo userRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    public Order getOrderById(Integer id) {
        return orderRepo.getById(id);
    }

    public List<Order> getAll() {
        return orderRepo.findAll();
    }

    public List<Order> getByUser(Integer userId) {
        User user = userRepo.getById(userId);
        return orderRepo.findAllByUser(user);
    }

    public Order addOrder(Order order) {
        java.util.Date date = new java.util.Date();
        order.setItemAmount(order.getItemList().size());
        order.setOrderDate(date);
        order.setOrderStatus("Order Placed");
        double orderTotal = 0;
        List<Item> orderList = order.getItemList();
        for (int i = 0; i < orderList.size(); i++) {
            orderTotal += orderList.get(i).getItemPrice();
        }
        order.setOrderTotal(orderTotal);
        return orderRepo.save(order);
    }

    public List<Order> addMultiple(List<Order> orderList) {
        return orderRepo.saveAll(orderList);
    }
}
