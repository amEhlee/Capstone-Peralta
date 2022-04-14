package com.capstone.peralta.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

/**
 * This is the model for orders
 *
 * @author Jared Smith
 */
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

    @ManyToOne
    @JoinColumn(name="user_Id", referencedColumnName = "user_Id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    /**
     * Gets order id.
     *
     * @return the order id
     */
    public Integer getOrderId() {
        return orderId;
    }

    /**
     * Sets order id.
     *
     * @param orderId the order id
     */
    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    /**
     * Gets item amount.
     *
     * @return the item amount
     */
    public Integer getItemAmount() {
        return itemAmount;
    }

    /**
     * Sets item amount.
     *
     * @param itemAmount the item amount
     */
    public void setItemAmount(Integer itemAmount) {
        this.itemAmount = itemAmount;
    }

    /**
     * Gets order date.
     *
     * @return the order date
     */
    public java.util.Date getOrderDate() {
        return orderDate;
    }

    /**
     * Sets order date.
     *
     * @param orderDate the order date
     */
    public void setOrderDate(java.util.Date orderDate) {
        this.orderDate = orderDate;
    }

    /**
     * Gets order total.
     *
     * @return the order total
     */
    public Double getOrderTotal() {
        return orderTotal;
    }

    /**
     * Sets order total.
     *
     * @param orderTotal the order total
     */
    public void setOrderTotal(Double orderTotal) {
        this.orderTotal = orderTotal;
    }

    /**
     * Gets address.
     *
     * @return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * Sets address.
     *
     * @param address the address
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * Gets email.
     *
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets email.
     *
     * @param email the email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets order status.
     *
     * @return the order status
     */
    public String getOrderStatus() {
        return orderStatus;
    }

    /**
     * Sets order status.
     *
     * @param orderStatus the order status
     */
    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    /**
     * Gets item list.
     *
     * @return the item list
     */
    public List<Item> getItemList() {
        return itemList;
    }

    /**
     * Gets user.
     *
     * @return the user
     */
    public User getUser() {
        return user;
    }
}
