package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.Order;
import com.capstone.peralta.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controller class for the Order model. Contains all REST endpoints
 */
@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "3000")
public class OrderController {

//    Autowired tells Spring to inject an OrderService object when the constructor is called
    @Autowired
    private final OrderService orderService;

//    Constructor that is automatically injected with an OrderService object
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

//    Returns an order, takes in an order id as the variable at path /order/{orderId}
    @GetMapping("/{orderId}")
    Order getById(@PathVariable Integer orderId) {
        return orderService.getOrderById(orderId);
    }

//    Returns a list of all orders in the database
    @GetMapping("/all")
    List<Order> getAll() {
        return orderService.getAll();
    }

//    Takes an Order object in the body of the request and adds it to the database
    @PostMapping("/add")
    Order createOrder(@RequestBody Order order) {
        return orderService.addOrder(order);
    }

//    Adds multiple Order objects to the database from the body of the request
    @PostMapping("/addMultiple")
    List<Order> addMultiple(@RequestBody List<Order> orderList) {
        return orderService.addMultiple(orderList);

    }
}
