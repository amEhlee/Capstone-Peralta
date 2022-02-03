package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Category;
import com.capstone.peralta.models.Item;
import com.capstone.peralta.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "3000")
public class CategoryController {

    @Autowired
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/{categoryId}")
    Category getById(@PathVariable Integer categoryId) {
        return categoryService.getCategoryById(categoryId);
    }

    @GetMapping("/all")
    List<Category> getAll() {
        return categoryService.getAll();
    }

    @PostMapping("/add")
    Category createCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);
    }

    @PostMapping("/addMultiple")
    List<Category> addMultiple(@RequestBody List<Category> categoryList) {
        return categoryService.addMultiple(categoryList);

    }
}
