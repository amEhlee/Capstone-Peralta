package com.capstone.peralta.repos;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ItemRepo extends JpaRepository<Item, Integer> {

    List<Item> findItemsByItemNameContaining(String name);

    List<Item> findItemsByCategory(Category category);
//    List<Item> findItemsByCategoryNameContaining(String name);

}
