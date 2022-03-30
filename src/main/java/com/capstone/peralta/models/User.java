package com.capstone.peralta.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.Collection;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USERS")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_Id", nullable = false,unique = true)
    private Integer userId;
    @Column(name = "email", nullable = false,unique = true)
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String address;
    private String postalCode;
    private String phoneNumber;

    @OneToMany(mappedBy = "user")
    private List<Order> userOrders;

    @OneToOne(mappedBy = "user", cascade = CascadeType.PERSIST)
    private Cart cart;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Collection<Role> roles = new ArrayList<>();


    //Constructor for creating a User with Auto Gen ID, and lists
    public User(Integer userId, String email, String password, String firstName, String lastName, String address, String postalCode, String phoneNumber) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.postalCode = postalCode;
        this.phoneNumber = phoneNumber;
        this.userOrders = new ArrayList<>();
        this.cart = new Cart();
        this.roles = new ArrayList<>();
    }

    //Constructor for creating a User with an Auto Gen ID, and lists. This was for testing purposes and not necessary
    public User(String email, String password, String firstName, String lastName, String address, String postalCode, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.postalCode = postalCode;
        this.phoneNumber = phoneNumber;
        this.userOrders = new ArrayList<>();
        this.cart = new Cart();
        this.roles = new ArrayList<>();
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public Collection<Role> getRoles() { return roles; }

    public void setRoles(Collection<Role> roles) { this.roles = roles; }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<Order> getUserOrders() {
        return userOrders;
    }
}