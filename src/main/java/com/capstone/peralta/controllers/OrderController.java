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
 * @author Jared Smith
 */
@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "3000")
public class OrderController {

//    Autowired tells Spring to inject an OrderService object when the constructor is called
    @Autowired
    private final OrderService orderService;

    /**
     * Class constructor for the OrderController
     * @param orderService The OrderService is used for all business logic,
     *                     auto-injected by Spring when calling the constructor.
     */
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * This method is used to retrieve a specific order from the database using
     * the order's id
     * @param orderId the id of the order to be retrieved, specified in the
     *                path of the endpoint
     * @return the order with the specified id
     */
    @GetMapping("/get/{orderId}")
    Order getById(@PathVariable Integer orderId) {
        return orderService.getOrderById(orderId);
    }

    /**
     * This method is used to retrieve all orders from the database attached to a
     * specific user
     * @param userId the id of the user whose orders are being retrieved from the
     *               database
     * @return a list of all orders attached to the specified user
     */
    @GetMapping("/get/user/{userId}")
    List<Order> getByUser(@PathVariable Integer userId) {
        return orderService.getByUser(userId);
    }

    /**
     * This method is used to retrieve all orders from the database
     * @return a list of all orders in the database
     */
    @GetMapping("/all")
    List<Order> getAll() {
        return orderService.getAll();
    }

    /**
     * This method creates an order from JSON and persists it
     * @param order the Order object to be persisted
     * @return the category after it has been successfully persisted
     */
    @PostMapping("/add")
    Order createOrder(@RequestBody Order order) {
        return orderService.addOrder(order);
    }

    /**
     * This method is only to be used for testing and with test data. We only used
     * this method while initially adding test data through PostMan
     * @param orderList a list of order objects sent as JSON
     * @return the list of orders after they have been successfully persisted
     */
    @PostMapping("/addMultiple")
    List<Order> addMultiple(@RequestBody List<Order> orderList) {
        return orderService.addMultiple(orderList);

    }
}
