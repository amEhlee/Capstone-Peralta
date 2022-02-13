package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Item;
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

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/get/{itemId}")
    Item getById(@PathVariable Integer itemId) {
        return itemService.getItemById(itemId);
    }

    @GetMapping("/get/all")
    List<Item> getAll() {
        return itemService.getAll();
    }

    @PostMapping("/add")
    Item createItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    @PostMapping("/addMultiple")
    List<Item> addMultiple(@RequestBody List<Item> itemList) {
        return itemService.addMultiple(itemList);
    }

    @PutMapping("/update")
    Item updateItem(@RequestBody Item item) {
        return itemService.updateItem(item);
    }

//    @DeleteMapping("/delete")
//    void deleteItem(@RequestBody Item item) {
//        itemService.deleteItem(item);
//    }
}
