package com.capstone.peralta.models;


import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "ITEMS")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_Id", nullable = false)
    private Integer itemId;
    private String itemName;
    private Double itemPrice;
    private Double itemWeight;
    private Double itemVolume;
    private Integer itemQuantity;
    private Boolean itemAvailable;


    @ManyToMany(mappedBy = "itemList")
    private List<Order> orders;

    @ManyToMany
    @JoinTable(
            name = "category_item",
            joinColumns = @JoinColumn(name = "item_Id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categoryList;

    public Item() {
    }

    public Item(String itemName, Double itemPrice, Double itemWeight, Double itemVolume, Integer itemQuantity, Boolean itemAvailable) {
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemWeight = itemWeight;
        this.itemVolume = itemVolume;
        this.itemQuantity = itemQuantity;
        this.itemAvailable = itemAvailable;

    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Double getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(Double itemPrice) {
        this.itemPrice = itemPrice;
    }

    public Double getItemWeight() {
        return itemWeight;
    }

    public void setItemWeight(Double itemWeight) {
        this.itemWeight = itemWeight;
    }

    public Double getItemVolume() {
        return itemVolume;
    }

    public void setItemVolume(Double itemVolume) {
        this.itemVolume = itemVolume;
    }

    public Integer getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(Integer itemQuantity) {
        this.itemQuantity = itemQuantity;
    }

    public Boolean getItemAvailable() {
        return itemAvailable;
    }

    public void setItemAvailable(Boolean itemAvailable) {
        this.itemAvailable = itemAvailable;
    }

    public List<Order> getOrders() {
        return orders;
    }
}