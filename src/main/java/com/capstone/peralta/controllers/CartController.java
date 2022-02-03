package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Cart;
import com.capstone.peralta.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "3000")
public class CartController {

    @Autowired
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{cartId}")
    Cart getById(@PathVariable Integer cartId) {
        return cartService.getCart(cartId);
    }

    @GetMapping("/all")
    List<Cart> getAll() {
        return cartService.getAll();
    }

    @PostMapping("/add")
    Cart createCart(@RequestBody Cart cart) {
        return cartService.addCart(cart);
    }

    @PostMapping("/addMultiple")
    List<Cart> addMultiple(@RequestBody List<Cart> cartList) {
        return cartService.addMultiple(cartList);
    }
}
