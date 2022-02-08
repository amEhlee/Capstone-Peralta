package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.Order;
import com.capstone.peralta.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "3000")
public class OrderController {

    @Autowired
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{orderId}")
    Order getById(@PathVariable Integer orderId) {
        return orderService.getOrderById(orderId);
    }

    @GetMapping("/all")
    List<Order> getAll() {
        return orderService.getAll();
    }

    @PostMapping("/add")
    Order createOrder(@RequestBody Order order) {
        return orderService.addOrder(order);
    }

    @PostMapping("/addMultiple")
    List<Order> addMultiple(@RequestBody List<Order> orderList) {
        return orderService.addMultiple(orderList);

    }
}
