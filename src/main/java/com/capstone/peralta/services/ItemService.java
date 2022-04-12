package com.capstone.peralta.services;

import com.capstone.peralta.models.Category;
import com.capstone.peralta.models.Item;
import com.capstone.peralta.repos.CategoryRepo;
import com.capstone.peralta.repos.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The Item service. Contains all business logic for the Item model.
 *
 * @author Jared Smith
 */
@Service
public class ItemService {

    @Autowired
    private final ItemRepo itemRepo;

    @Autowired
    private final CategoryRepo categoryRepo;

    /**
     * Instantiates a new Item service.
     *
     * @param itemRepo     the item repo auto-injected by Spring
     * @param categoryRepo the category repo auto-injected by Spring
     */
    public ItemService(ItemRepo itemRepo, CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
        this.itemRepo = itemRepo;
    }

    /**
     * Gets item by id.
     *
     * @param itemId the item id
     * @return the item found by id
     */
    public Item getItemById(Integer itemId) {
        return itemRepo.findById(itemId).get();
    }

    /**
     * Gets all items persisted
     *
     * @return a list of all images in the database
     */
    public List<Item> getAll() {
        return itemRepo.findAll();
    }

    /**
     * Persists an item, and attaches a category to the item.
     *
     * @param item       the item
     * @param categoryId the category id
     * @return the item after it has been successfully persisted
     */
    public Item addItem(Item item, Integer categoryId) {
        Category category = categoryRepo.findById(categoryId).orElse(null);
        if (category != null) {
            item.setCategory(category);
        }
        return itemRepo.save(item);
    }

    /**
     * This method is only to be used for testing and with test data. We only used
     * this method while initially adding test data through PostMan
     *
     * @param itemList the item list
     * @return the list
     */
    public List<Item> addMultiple(List<Item> itemList) {
        return itemRepo.saveAll(itemList);
    }

    /**
     * This method takes an updated item object and persists the changes
     * to the database
     * @param item       the item
     * @param categoryId the category id
     * @return the item after it has been successfully updated in the database
     */
    public Item updateItem(Item item, Integer categoryId) {
        Category category = categoryRepo.findById(categoryId).orElse(null);
        if (category != null) {
            item.setCategory(category);
        }
        return itemRepo.save(item);
    }

    /**
     * This method searches through items in the database and returns them
     * if the name of the item matches a certain string
     * @param searchString the search string
     * @return a list of items which have names matching the string
     */
    public List<Item> searchItems(String searchString) {
        return itemRepo.findItemsByItemNameContaining(searchString);
    }

    /**
     * Search items by category name.
     *
     * @param searchString the search string
     * @return a list of items which have categories matching the string
     */
    public List<Item> searchItemsByCategoryName(String searchString) {

        return itemRepo.findItemsByCategory(categoryRepo.findByCategoryNameContaining(searchString));
    }

    /**
     * Deletes an item in the database.
     *
     * @param id the id of the item to be deleted
     */
    public void deleteItem(int id) {
        Item item = getItemById(id);
        itemRepo.delete(item);
    }
}
