package com.capstone.peralta.services;

import com.capstone.peralta.models.Cart;
import com.capstone.peralta.repos.CartRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private CartRepo cartRepo;

    public Cart getCart(int userId) {
        return cartRepo.getById(userId);
    }

    public List<Cart> getAll() {
        return cartRepo.findAll();
    }

    public Cart addCart(Cart cart) {
        return cartRepo.save(cart);
    }
}
