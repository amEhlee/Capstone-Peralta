package com.capstone.peralta.services;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.stream.Stream;

/**
 * The Image service. Contains all business logic for Images.
 *
 * @author Jared Smith
 */
@Service
public class ImageService {

    private final Path root = Paths.get("src/main/react-frontend/src/assets/images");

    /**
     * Init.
     */
    public void init() {
        try {
            Files.createDirectory(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize images folder");
        }
    }

    /**
     * Saves an image locally, and renames the file to the format
     * (itemId)_(imageNumber).*
     *
     * @param image  the image object
     * @param itemId the item id
     */
    public void save(MultipartFile image, int itemId) {

        try {
            Path path = Paths.get("src/main/react-frontend/src/assets/images");
            Files.copy(image.getInputStream(), path.resolve(itemId + "_" +
                    (loadItemPhotos(itemId) + 1) +
                    image.getOriginalFilename().substring(image.getOriginalFilename().indexOf("."))));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Loads a locally saved image
     *
     * @param filename the filename of the image
     * @return the image as a resource object
     */
    public Resource load(String filename) {
        Path image = root.resolve(filename);
        Resource resource;
        try {
            resource = new UrlResource(image.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    /**
     * Counts the amount of images associated with an item
     *
     * @param id the item id
     * @return the amount of images for an item
     */
    public long loadItemPhotos(Integer id) {
        try {
            long count = Files.walk(this.root, 1)
                    .filter(Files::isRegularFile)
                    .filter(str -> str.getFileName().toString()
                            .matches("^" + id + "[_]\\d+[.]\\S+$")).count();
            System.out.println(count);
            return count;
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files");
        }
    }

    /**
     * Loads all images saved locally.
     *
     * @return the stream of images
     */
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files");
        }
    }

}
