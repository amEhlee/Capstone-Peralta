package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.services.CategoryService;
import com.capstone.peralta.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
@CrossOrigin(origins = "3000")
public class ItemController {

    @Autowired
    private final ItemService itemService;

    @Autowired
    private final CategoryService categoryService;

    public ItemController(ItemService itemService, CategoryService categoryService) {
        this.itemService = itemService;
        this.categoryService = categoryService;
    }

    @GetMapping("/get/{itemId}")
    Item getById(@PathVariable Integer itemId) {
        return itemService.getItemById(itemId);
    }

    @GetMapping("/get/all")
    List<Item> getAll() {
        return itemService.getAll();
    }

    @PostMapping("/add/{categoryId}")
    Item createItem(@RequestBody Item item, @PathVariable Integer categoryId) {
        return itemService.addItem(item, categoryId);
    }

    @PostMapping("/addMultiple")
    List<Item> addMultiple(@RequestBody List<Item> itemList) {
        return itemService.addMultiple(itemList);
    }

    @PutMapping("/update")
    Item updateItem(@RequestBody Item item) {
        return itemService.updateItem(item);
    }

    @GetMapping("/search/{name}")
    List<Item> searchItem(@PathVariable String name) {
        return itemService.searchItems(name);
    }

//    @DeleteMapping("/delete")
//    void deleteItem(@RequestBody Item item) {
//        itemService.deleteItem(item);
//    }
}
