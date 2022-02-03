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
    private ItemService itemService;

    @GetMapping("/{itemId}")
    Item getById(@PathVariable Integer itemId) {
        return itemService.getItemById(itemId);
    }

    @GetMapping("/all")
    List<Item> getAll() {
        return itemService.getAll();
    }

    @PostMapping
    Item createItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }
}
