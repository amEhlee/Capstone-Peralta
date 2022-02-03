package com.capstone.peralta.controllers;

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
    private OrderService orderService;

    @GetMapping("/{orderId}")
    Order getById(@PathVariable Integer orderId) {
        return orderService.getOrderById(orderId);
    }

    @GetMapping("/all")
    List<Order> getAll() {
        return orderService.getAll();
    }

    @PostMapping
    Order createOrder(@RequestBody Order order) {
        return orderService.addOrder(order);
    }
}
