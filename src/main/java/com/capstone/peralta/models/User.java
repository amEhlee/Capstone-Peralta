package com.capstone.peralta.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;
import java.util.Collection;

/**
 * This is the model for users
 *
 * @author Jared Smith
 * @author Don Laliberte
 */
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

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Order> userOrders;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Collection<Role> roles = new ArrayList<>();


    /**
     * Instantiates a new User.
     *
     * @param userId      the user id
     * @param email       the email
     * @param password    the password
     * @param firstName   the first name
     * @param lastName    the last name
     * @param address     the address
     * @param postalCode  the postal code
     * @param phoneNumber the phone number
     */
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
        this.roles = new ArrayList<>();
    }

    /**
     * Instantiates a new User.
     *
     * @param email       the email
     * @param password    the password
     * @param firstName   the first name
     * @param lastName    the last name
     * @param address     the address
     * @param postalCode  the postal code
     * @param phoneNumber the phone number
     */
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
        this.roles = new ArrayList<>();
    }

    /**
     * Instantiates a new User.
     *
     * @param userId the user id
     */
    public User(Integer userId, String email) {
        this.userId = userId;
        this.email = email;
    }

    /**
     * Gets user id.
     *
     * @return the user id
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * Sets user id.
     *
     * @param userId the user id
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
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
     * Gets password.
     *
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets password.
     *
     * @param password the password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Gets first name.
     *
     * @return the first name
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets first name.
     *
     * @param firstName the first name
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Gets last name.
     *
     * @return the last name
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Sets last name.
     *
     * @param lastName the last name
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
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
     * Gets roles.
     *
     * @return the roles
     */
    public Collection<Role> getRoles() { return roles; }

    /**
     * Sets roles.
     *
     * @param roles the roles
     */
    public void setRoles(Collection<Role> roles) { this.roles = roles; }

    /**
     * Sets address.
     *
     * @param address the address
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * Gets postal code.
     *
     * @return the postal code
     */
    public String getPostalCode() {
        return postalCode;
    }

    /**
     * Sets postal code.
     *
     * @param postalCode the postal code
     */
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    /**
     * Gets phone number.
     *
     * @return the phone number
     */
    public String getPhoneNumber() {
        return phoneNumber;
    }

    /**
     * Sets phone number.
     *
     * @param phoneNumber the phone number
     */
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    /**
     * Gets user orders.
     *
     * @return the user orders
     */
    public List<Order> getUserOrders() {
        return userOrders;
    }
}