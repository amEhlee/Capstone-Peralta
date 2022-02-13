package com.capstone.peralta.repos;

import com.capstone.peralta.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepo  extends JpaRepository<Item, Integer> {
}
