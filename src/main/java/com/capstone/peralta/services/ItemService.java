package com.capstone.peralta.services;

import com.capstone.peralta.models.Category;
import com.capstone.peralta.models.Item;
import com.capstone.peralta.repos.CategoryRepo;
import com.capstone.peralta.repos.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
//    Gets an item from the repository, specified by the ID
    public Item getItemById(Integer itemId) {
        return itemRepo.findById(itemId).get();
    }

//    Gets a list of all items in the repository
    public List<Item> getAll() {
        return itemRepo.findAll();
    }

//    Adds an item to the repository, and adds attaches it to the corresponding category
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

    public List<Item> searchItemsByCategoryName(String searchString) {

        return itemRepo.findItemsByCategory(categoryRepo.findByCategoryNameContaining(searchString));
    }

//    public void deleteItem(Item item) {
//        itemRepo.delete(item);
//    }
}
