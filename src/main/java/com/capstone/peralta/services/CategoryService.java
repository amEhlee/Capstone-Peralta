package com.capstone.peralta.services;

import com.capstone.peralta.models.Category;
import com.capstone.peralta.repos.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The Category service. Contains all business logic for the Category model.
 *
 * @author Jared Smith
 */
@Service
public class CategoryService {

    @Autowired
    private final CategoryRepo categoryRepo;

    /**
     * Instantiates a new Category service.
     *
     * @param categoryRepo the category repo auto-injected by Spring.
     */
    public CategoryService(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    /**
     * Gets category by id.
     *
     * @param categoryId the category id
     * @return the category found by id
     */
    public Category getCategoryById(Integer categoryId) {
        return categoryRepo.getById(categoryId);
    }

    /**
     * Gets all categories in the database.
     *
     * @return the all
     */
    public List<Category> getAll() {
        return categoryRepo.findAll();
    }

    /**
     * Add category to the database.
     *
     * @param category the category
     * @return the category after it has been successfully persisted
     */
    public Category addCategory(Category category) {
        return categoryRepo.save(category);
    }

    /**
     * This method is only to be used for testing and with test data. We only used
     * this method while initially adding test data through PostMan
     *
     * @param categoryList the category list
     * @return the list of categories after they have been successfully persisted
     */
    public List<Category> addMultiple(List<Category> categoryList) {
        return categoryRepo.saveAll(categoryList);
    }
}
