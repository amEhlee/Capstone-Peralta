package com.capstone.peralta.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "ORDERS")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_Id", nullable = false)
    private Integer orderId;

    private Double itemTotal;
    private Double orderTotal;
    private Double shippingCost;
    private Boolean orderPaid;

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

    public Boolean getOrderPaid() {
        return orderPaid;
    }

    public void setOrderPaid(Boolean orderPaid) {
        this.orderPaid = orderPaid;
    }

    public List<Item> getItemList() {
        return itemList;
    }

    public User getUser() {
        return user;
    }
}
