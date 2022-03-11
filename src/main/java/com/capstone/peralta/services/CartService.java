package com.capstone.peralta.services;

import com.capstone.peralta.models.Cart;
import com.capstone.peralta.repos.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CartService {

    @Autowired
    private final CartRepo cartRepo;

    public CartService(CartRepo cartRepo) {
        this.cartRepo = cartRepo;
    }

    public Cart getCart(Integer userId) {
        return cartRepo.getById(userId);
    }

    public List<Cart> getAll() {
        return cartRepo.findAll();
    }

    public Cart addCart(Cart cart) {
        return cartRepo.save(cart);
    }

    public List<Cart> addMultiple(List<Cart> cartList) {
        return cartRepo.saveAll(cartList);
    }
}
