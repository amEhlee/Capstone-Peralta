package com.capstone.peralta.services;

import com.capstone.peralta.models.Category;
import com.capstone.peralta.repos.CategoryRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private CategoryRepo categoryRepo;

    public Category getCategoryById(int id) {
        return categoryRepo.getById(id);
    }

    public List<Category> getAll() {
        return categoryRepo.findAll();
    }

    public Category addCategory(Category category) {
        return categoryRepo.save(category);
    }
}
