package com.capstone.peralta.services;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.Order;
import com.capstone.peralta.models.User;
import com.capstone.peralta.repos.OrderRepo;
import com.capstone.peralta.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


/**
 * The Order service. Contains all business logic for the Order model
 *
 * @author Jared Smith
 */
@Service
public class OrderService {

    @Autowired
    private final OrderRepo orderRepo;

    @Autowired
    private final UserRepo userRepo;

    /**
     * Instantiates a new Order service.
     *
     * @param orderRepo the order repo auto-injected by Spring
     * @param userRepo  the user repo auto-injected by Spring
     */
    public OrderService(OrderRepo orderRepo, UserRepo userRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    /**
     * Gets order by id.
     *
     * @param id the id
     * @return the order found by id
     */
    public Order getOrderById(Integer id) {
        return orderRepo.getById(id);
    }

    /**
     * Gets all orders in the database.
     *
     * @return a list of all orders in the database
     */
    public List<Order> getAll() {
        return orderRepo.findAll();
    }

    /**
     * Gets all orders by user.
     *
     * @param userId the user id
     * @return a list of all orders attached to a user
     */
    public List<Order> getByUser(Integer userId) {
        User user = userRepo.getById(userId);
        return orderRepo.findAllByUser(user);
    }

    /**
     * Persists an order to the database.
     *
     * @param order the order object to be persisted
     * @return the order after it has been successfully persisted
     */
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
        order.setOrderTotal((Math.round(orderTotal*100.0)/100.0));
        return orderRepo.save(order);
    }

    /**
     * This method is only to be used for testing and with test data. We only used
     * this method while initially adding test data through PostMan
     * @param orderList the list of order objects
     * @return the list of orders after they have been successfully persisted
     */
    public List<Order> addMultiple(List<Order> orderList) {
        return orderRepo.saveAll(orderList);
    }
}
