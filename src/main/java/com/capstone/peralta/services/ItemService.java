package com.capstone.peralta.services;

import com.capstone.peralta.models.Item;
import com.capstone.peralta.repos.ItemRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private ItemRepo itemRepo;

    public Item getItemById(int id) {
        return itemRepo.getById(id);
    }

    public List<Item> getAll() {
        return itemRepo.findAll();
    }

    public Item addItem(Item item) {
        return itemRepo.save(item);
    }
}
