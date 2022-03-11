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
 */
@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "3000")
public class CategoryController {

//    Autowired tells Spring to inject a CategoryService object when the constructor is called
    @Autowired
    private final CategoryService categoryService;

//    Constructor that is automatically injected with a CategoryService object
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

//    Returns a category, takes in a cart id as the variable at the path /category/{categoryId}
    @GetMapping("/{categoryId}")
    Category getById(@PathVariable Integer categoryId) {
        return categoryService.getCategoryById(categoryId);
    }

//    Returns a list of al carts at path /category/all
    @GetMapping("/all")
    List<Category> getAll() {
        return categoryService.getAll();
    }

//    Takes a Category object sent in the body of a request and adds it to the database
    @PostMapping("/add")
    Category createCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);
    }

//    Adds multiple Category objects to the database from the body of the request
    @PostMapping("/addMultiple")
    List<Category> addMultiple(@RequestBody List<Category> categoryList) {
        return categoryService.addMultiple(categoryList);

    }
}
