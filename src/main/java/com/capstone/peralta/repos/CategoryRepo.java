package com.capstone.peralta.repos;

import com.capstone.peralta.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<Cart, Integer> {
}
