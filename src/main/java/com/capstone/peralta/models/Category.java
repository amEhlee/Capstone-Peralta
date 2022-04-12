package com.capstone.peralta.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

/**
 * This is the model for categories
 *
 * @author Jared Smith
 */
@Entity
@Table(name = "CATEGORIES")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Integer categoryId;
    private String categoryName;
    private Boolean active;

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Item> categoryItems;


    /**
     * Gets category id.
     *
     * @return the category id
     */
    public Integer getCategoryId() {
        return categoryId;
    }


    /**
     * Sets category id.
     *
     * @param categoryId the category id
     */
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }


    /**
     * Gets category name.
     *
     * @return the category name
     */
    public String getCategoryName() {
        return categoryName;
    }


    /**
     * Sets category name.
     *
     * @param categoryName the category name
     */
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    /**
     * Gets active.
     *
     * @return the active
     */
    public Boolean getActive() {
        return active;
    }

    /**
     * Sets active.
     *
     * @param active the active
     */
    public void setActive(Boolean active) {
        this.active = active;
    }

    /**
     * Gets category items.
     *
     * @return the category items
     */
    public List<Item> getCategoryItems() {
        return categoryItems;
    }
}