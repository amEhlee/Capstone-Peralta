package com.capstone.peralta.repos;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * The interface Item repository.
 *
 * @author Jared Smith
 * @author Nicholas Tan
 */
@Repository
public interface ItemRepo extends JpaRepository<Item, Integer> {

    /**
     * Find items by item name containing a specified string.
     *
     * @param name the name
     * @return the list
     */
    List<Item> findItemsByItemNameContaining(String name);

    /**
     * Find items by category.
     *
     * @param category the category
     * @return the list
     */
    List<Item> findItemsByCategory(Category category);


}
