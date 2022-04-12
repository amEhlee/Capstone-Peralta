package com.capstone.peralta.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

/**
 * This is the model for items
 *
 * @author Jared Smith
 */
@Entity
@Table(name = "ITEMS")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_Id", nullable = false)
    private Integer itemId;
    private String itemName;
    private String itemDescription;
    private Double itemPrice;
    private Double itemWeight;
    private Double itemVolume;
    private String size;
    private Integer itemQuantity;
    private Boolean itemAvailable;

    @JsonIgnore
    @ManyToMany(mappedBy = "itemList")
    private List<Order> orders;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="category_id", referencedColumnName = "category_id")
    private Category category;

    /**
     * Instantiates a new Item.
     */
    public Item() {
    }


    /**
     * Gets item id.
     *
     * @return the item id
     */
    public Integer getItemId() {
        return itemId;
    }

    /**
     * Sets item id.
     *
     * @param itemId the item id
     */
    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    /**
     * Gets item name.
     *
     * @return the item name
     */
    public String getItemName() {
        return itemName;
    }

    /**
     * Sets item name.
     *
     * @param itemName the item name
     */
    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    /**
     * Gets item price.
     *
     * @return the item price
     */
    public Double getItemPrice() {
        return itemPrice;
    }

    /**
     * Sets item price.
     *
     * @param itemPrice the item price
     */
    public void setItemPrice(Double itemPrice) {
        this.itemPrice = itemPrice;
    }

    /**
     * Gets item weight.
     *
     * @return the item weight
     */
    public Double getItemWeight() {
        return itemWeight;
    }

    /**
     * Sets item weight.
     *
     * @param itemWeight the item weight
     */
    public void setItemWeight(Double itemWeight) {
        this.itemWeight = itemWeight;
    }

    /**
     * Gets item volume.
     *
     * @return the item volume
     */
    public Double getItemVolume() {
        return itemVolume;
    }

    /**
     * Sets item volume.
     *
     * @param itemVolume the item volume
     */
    public void setItemVolume(Double itemVolume) {
        this.itemVolume = itemVolume;
    }

    /**
     * Gets item quantity.
     *
     * @return the item quantity
     */
    public Integer getItemQuantity() {
        return itemQuantity;
    }

    /**
     * Sets item quantity.
     *
     * @param itemQuantity the item quantity
     */
    public void setItemQuantity(Integer itemQuantity) {
        this.itemQuantity = itemQuantity;
    }

    /**
     * Gets item available.
     *
     * @return the item available
     */
    public Boolean getItemAvailable() {
        return itemAvailable;
    }

    /**
     * Sets item available.
     *
     * @param itemAvailable the item available
     */
    public void setItemAvailable(Boolean itemAvailable) {
        this.itemAvailable = itemAvailable;
    }

    /**
     * Gets orders.
     *
     * @return the orders
     */
    public List<Order> getOrders() {
        return orders;
    }

    /**
     * Gets item description.
     *
     * @return the item description
     */
    public String getItemDescription() {
        return itemDescription;
    }

    /**
     * Sets item description.
     *
     * @param itemDescription the item description
     */
    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    /**
     * Gets category.
     *
     * @return the category
     */
    public Category getCategory() {
        return category;
    }

    /**
     * Sets category.
     *
     * @param category the category
     */
    public void setCategory(Category category) {
        this.category = category;
    }

    /**
     * Gets size.
     *
     * @return the size
     */
    public String getSize() {
        return size;
    }

    /**
     * Sets size.
     *
     * @param size the size
     */
    public void setSize(String size) {
        this.size = size;
    }
}