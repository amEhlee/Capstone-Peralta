package com.capstone.peralta.models;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Entity
@Table(name = "ORDERS")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "order_Id", nullable = false)
    private Integer orderId;

    private Double itemTotal;
    private Double orderTotal;
    private Double shippingCost;
    private String orderStatus;
    private Integer itemAmount;
    private Date orderDate;

    @ManyToMany
    @JoinTable(
            name = "order_item",
            joinColumns = @JoinColumn(name = "order_Id"),
            inverseJoinColumns = @JoinColumn(name = "item_Id")
    )
    private List<Item> itemList;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_Id", referencedColumnName = "user_Id")
    private User user;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }


    public Double getItemTotal() {
        return itemTotal;
    }

    public void setItemTotal(Double itemTotal) {
        this.itemTotal = itemTotal;
    }

    public Double getOrderTotal() {
        return orderTotal;
    }

    public void setOrderTotal(Double orderTotal) {
        this.orderTotal = orderTotal;
    }

    public Double getShippingCost() {
        return shippingCost;
    }

    public void setShippingCost(Double shippingCost) {
        this.shippingCost = shippingCost;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public List<Item> getItemList() {
        return itemList;
    }

    public User getUser() {
        return user;
    }
}
