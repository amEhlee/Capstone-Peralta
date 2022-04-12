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
 * @author Jared Smith
 * @author Nicholas Tan
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

    /**
     * Class constructor for the ItemController
     * @param itemService the itemService is used for all business logic,
     *                    auto-injected byt Spring when calling the constructor
     * @param categoryService the categoryService is used for all business logic,
     *                        auto-injected byt Spring when calling the constructor
     */
    public ItemController(ItemService itemService, CategoryService categoryService) {
        this.itemService = itemService;
        this.categoryService = categoryService;
    }


    /**
     * This method is used to retrieve a specific item from the database
     * using the items id
     * @param itemId the id of the item to be retrieved, specified in the path
     *               of the endpoint
     * @return the item with the specified id
     */
    @GetMapping("/get/{itemId}")
    Item getById(@PathVariable Integer itemId) {
        return itemService.getItemById(itemId);
    }


    /**
     * This method returns a List of all items in the database
     * @return a list of all items
     */
    @GetMapping("/get/all")
    List<Item> getAll() {
        return itemService.getAll();
    }

//    Takes an Item object in the body of the request, and a categoryId as a path variable at /item/add/{categoryId}
//    Saves the item to the database

    /**
     * This method creates an item from JSON and persists it
     * @param item the item object to be persisted
     * @param categoryId the id of the category for the item
     * @return the item after it has been successfully persisted
     */
    @RolesAllowed({"ROLE_ADMIN", "ROLE_OWNER"})
    @PostMapping("/add/{categoryId}")
    Item createItem(@RequestBody Item item, @PathVariable Integer categoryId) {
        return itemService.addItem(item, categoryId);
    }

    /**
     * This method is only to be used for testing and with test data. We only used
     * this method while initially adding test data through PostMan
     * @param itemList a list of item objects sent as JSON
     * @return the list of items after they have been successfully persisted
     */
    @RolesAllowed({"ROLE_ADMIN", "ROLE_OWNER"})
    @PostMapping("/addMultiple")
    List<Item> addMultiple(@RequestBody List<Item> itemList) {
        return itemService.addMultiple(itemList);
    }

    /**
     * This method takes an updated item object and persists the changes
     * to the database
     * @param item the updated item
     * @param categoryId the id of the category the item is attached to
     * @return the item after it has been successfully updated in the database
     */
    @RolesAllowed({"ROLE_ADMIN", "ROLE_OWNER"})
    @PutMapping("/update/{categoryId}")
    Item updateItem(@RequestBody Item item, @PathVariable Integer categoryId) {
        return itemService.updateItem(item, categoryId);
    }

//     returns a list of items that match the search query

    /**
     * This method searches through items in the database and returns them
     * if the name of the item matches a certain string
     * @param query the string query used to find items
     * @return a list of items which have names matching the query
     */
    @GetMapping("/search/{query}")
    List<Item> searchItems(@PathVariable String query) {
        List<Item> listOne = itemService.searchItems(query);

//        return listOne;


        List<Item> listTwo = itemService.searchItemsByCategoryName(query);

        List<Item> result = Stream.concat(listOne.stream(), listTwo.stream())
                .collect(Collectors.toList());


        return result;
    }

    /**
     * This method deletes an item from the database
     * @param id the id of the item to be deleted.
     */
    @DeleteMapping("/delete/{id}")
    void deleteItem(@PathVariable int id) {
        itemService.deleteItem(id);
    }
}
