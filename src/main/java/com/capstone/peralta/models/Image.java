package com.capstone.peralta.models;

/**
 * This is the model for images
 *
 * @author Jared Smith
 */
public class Image {
    private String name;
    private String url;

    /**
     * Instantiates a new Image.
     *
     * @param name the image name
     * @param url  the url
     */
    public Image(String name, String url) {
        this.name = name;
        this.url = url;
    }

    /**
     * Gets the image name.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the image name.
     *
     * @param name the name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets url.
     *
     * @return the url
     */
    public String getUrl() {
        return url;
    }

    /**
     * Sets url.
     *
     * @param url the url
     */
    public void setUrl(String url) {
        this.url = url;
    }
}
