package com.capstone.peralta.controllers;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.services.CategoryService;
import com.capstone.peralta.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Controller class for the Item mode. Contains all the REST endpoints
 */
@RestController
@RequestMapping("/item")
@CrossOrigin(origins = "3000")
public class ItemController {

//    Autowired tells Spring to inject an ItemService object when the constructor is called
    @Autowired
    private final ItemService itemService;

//    Tells spring to inject a CategoryService object when the constructor is called.
    @Autowired
    private final CategoryService categoryService;

//    Constructor that is automatically injected with an ImageService and a CategoryService object
    public ItemController(ItemService itemService, CategoryService categoryService) {
        this.itemService = itemService;
        this.categoryService = categoryService;
    }

//    Returns an item, takes in an item id as the path variable at /item/get/{itemId}
    @GetMapping("/get/{itemId}")
    Item getById(@PathVariable Integer itemId) {
        return itemService.getItemById(itemId);
    }

//    Returns a list of all items at path /item/get/all
    @GetMapping("/get/all")
    List<Item> getAll() {
        return itemService.getAll();
    }

//    Takes an Item object in the body of the request, and a categoryId as a path variable at /item/add/{categoryId}
//    Saves the item to the database
    @RolesAllowed({"ROLE_ADMIN", "ROLE_OWNER"})
    @PostMapping("/add/{categoryId}")
    Item createItem(@RequestBody Item item, @PathVariable Integer categoryId) {
        return itemService.addItem(item, categoryId);
    }

//    Adds multiple Item objects to the database from the body of the request
    @RolesAllowed({"ROLE_ADMIN", "ROLE_OWNER"})
    @PostMapping("/addMultiple")
    List<Item> addMultiple(@RequestBody List<Item> itemList) {
        return itemService.addMultiple(itemList);
    }

//    Takes an already existing item in the database in the body of the request body and updates
//    its values in the database
    @RolesAllowed({"ROLE_ADMIN", "ROLE_OWNER"})
    @PutMapping("/update/{categoryId}")
    Item updateItem(@RequestBody Item item, @PathVariable Integer categoryId) {
        return itemService.updateItem(item, categoryId);
    }

//     returns a list of items that match the search query
    @GetMapping("/search/{query}")
    List<Item> searchItems(@PathVariable String query) {
        List<Item> listOne = itemService.searchItems(query);

//        return listOne;


        List<Item> listTwo = itemService.searchItemsByCategoryName(query);

        List<Item> result = Stream.concat(listOne.stream(), listTwo.stream())
                .collect(Collectors.toList());


        return result;
    }



    @DeleteMapping("/delete/{id}")
    void deleteItem(@PathVariable int id) {
        itemService.deleteItem(id);
    }
}
