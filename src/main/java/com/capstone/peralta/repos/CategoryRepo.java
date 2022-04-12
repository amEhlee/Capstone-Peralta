package com.capstone.peralta.repos;

import com.capstone.peralta.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The interface Category repository.
 *
 * @author Jared Smith
 * @author Nicholas Tan
 */
@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {
    /**
     * Find by category name containing a specified string.
     *
     * @param searchString the search string
     * @return the category
     */
    Category findByCategoryNameContaining(String searchString);
}
