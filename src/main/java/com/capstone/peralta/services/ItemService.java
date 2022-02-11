package com.capstone.peralta.services;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.repos.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private final ItemRepo itemRepo;

    public ItemService(ItemRepo itemRepo) {
        this.itemRepo = itemRepo;
    }

    public Item getItemById(int id) {
        return itemRepo.getById(id);
    }

    public List<Item> getAll() {
        return itemRepo.findAll();
    }

    public Item addItem(Item item) {
        return itemRepo.save(item);
    }

    public List<Item> addMultiple(List<Item> itemList) {
        return itemRepo.saveAll(itemList);
    }

    public Item updateItem(Item item) {
        return itemRepo.save(item);
    }

//    public void deleteItem(Item item) {
//        itemRepo.delete(item);
//    }
}
