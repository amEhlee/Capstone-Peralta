package com.capstone.peralta.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "ORDERS")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_Id", nullable = false)
    private Integer orderId;

    private Double orderTotal;
    private String orderStatus;
    private Integer itemAmount;
    private java.util.Date orderDate;
    private String address;
    private String email;

    @ManyToMany
    @JoinTable(
            name = "order_item",
            joinColumns = @JoinColumn(name = "order_Id"),
            inverseJoinColumns = @JoinColumn(name = "item_Id")
    )
    private List<Item> itemList;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="user_Id", referencedColumnName = "user_Id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getItemAmount() {
        return itemAmount;
    }

    public void setItemAmount(Integer itemAmount) {
        this.itemAmount = itemAmount;
    }

    public java.util.Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(java.util.Date orderDate) {
        this.orderDate = orderDate;
    }

    public Double getOrderTotal() {
        return orderTotal;
    }

    public void setOrderTotal(Double orderTotal) {
        this.orderTotal = orderTotal;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
