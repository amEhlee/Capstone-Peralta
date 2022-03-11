package com.capstone.peralta.services;

import com.capstone.peralta.models.Category;
import com.capstone.peralta.models.Item;
import com.capstone.peralta.repos.CategoryRepo;
import com.capstone.peralta.repos.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ItemService {

    @Autowired
    private final ItemRepo itemRepo;

    @Autowired
    private final CategoryRepo categoryRepo;

    public ItemService(ItemRepo itemRepo, CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
        this.itemRepo = itemRepo;
    }

    public Item getItemById(Integer itemId) {
        return itemRepo.findById(itemId).get();
    }

    public List<Item> getAll() {
        return itemRepo.findAll();
    }

    public Item addItem(Item item, Integer categoryId) {
        Category category = categoryRepo.findById(categoryId).orElse(null);
        if (category != null) {
            item.setCategory(category);
        }
        return itemRepo.save(item);
    }

    public List<Item> addMultiple(List<Item> itemList) {
        return itemRepo.saveAll(itemList);
    }

    public Item updateItem(Item item) {
        return itemRepo.save(item);
    }

    public List<Item> searchItems(String searchString) {
        return itemRepo.findItemsByItemNameContaining(searchString);
    }

//    public void deleteItem(Item item) {
//        itemRepo.delete(item);
//    }
}
