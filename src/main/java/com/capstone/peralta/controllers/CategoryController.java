package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Category;
import com.capstone.peralta.models.Item;
import com.capstone.peralta.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controller class for the Category model. Contains all the REST endpoints
 * @author Jared Smith
 */
@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "3000")
public class CategoryController {

//    Autowired tells Spring to inject a CategoryService object when the constructor is called
    @Autowired
    private final CategoryService categoryService;

    /**
     * Class constructor for the CategoryController
     * @param categoryService the CategoryService is used for all business logic,
     *                        auto-injected by Spring when calling the constructor.
     */
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * This method is used to retrieve a specific category from the database using
     * the category's id
     * @param categoryId the id of the category to be retrieved, specified in the
     *                   path of the endpoint
     * @return the category with the specified id
     */
    @GetMapping("/{categoryId}")
    Category getById(@PathVariable Integer categoryId) {
        return categoryService.getCategoryById(categoryId);
    }

    /**
     * This method returns a List of all the categories in the database
     * @return a list of all categories
     */
    @GetMapping("/all")
    List<Category> getAll() {
        return categoryService.getAll();
    }

    /**
     * This method creates a category from JSON and persists it
     * @param category the Category object to be persisted
     * @return the category after it has been successfully persisted
     */
    @PostMapping("/add")
    Category createCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);
    }

    /**
     * This method is only to be used for testing and with test data. We only used
     * this method while initially adding test data through PostMan
     * @param categoryList a list of category objects sent as JSON
     * @return the list of categories after they have been successfully persisted
     */
    @PostMapping("/addMultiple")
    List<Category> addMultiple(@RequestBody List<Category> categoryList) {
        return categoryService.addMultiple(categoryList);

    }
}
