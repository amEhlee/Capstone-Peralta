package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Cart;
import com.capstone.peralta.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


/**
 * Controller class for the Cart model. Contains all the REST endpoints
 */
@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "3000")
public class CartController {

//    Autowired tells Spring to inject a CartService object when the constructor is called
    @Autowired
    private final CartService cartService;

//    Constructor that is automatically injected with a CartService object
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

//    Returns a cart, takes in a cart id as the variable at path /cart/{cartId}
    @GetMapping("/{cartId}")
    Cart getById(@PathVariable Integer cartId) {
        return cartService.getCart(cartId);
    }

//    Returns a list of all carts at path /cart/all
    @GetMapping("/all")
    List<Cart> getAll() {
        return cartService.getAll();
    }

//    Takes a Cart object sent in the body of a request and adds it to the database
    @PostMapping("/add")
    Cart createCart(@RequestBody Cart cart) {
        return cartService.addCart(cart);
    }

//    Adds multiple Cart objects to the database from the body of the request
    @PostMapping("/addMultiple")
    List<Cart> addMultiple(@RequestBody List<Cart> cartList) {
        return cartService.addMultiple(cartList);
    }
}
