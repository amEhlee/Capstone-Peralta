package com.capstone.peralta.services;

import antlr.StringUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.regex.Pattern;
import java.util.stream.Stream;

@Service
public class ImageService {

    private final Path root = Paths.get("src/main/react-frontend/src/images");

    public void init() {
        try {
            Files.createDirectory(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize images folder");
        }
    }

    public void save(MultipartFile image, int itemId) {

        try {
            Path path = Paths.get("src/main/react-frontend/src/images");
            Files.copy(image.getInputStream(), path.resolve(itemId + "_" +
                    (loadItemPhotos(itemId) + 1) +
                    image.getOriginalFilename().substring(image.getOriginalFilename().indexOf("."), image.getOriginalFilename().length())));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Resource load(String filename) {
        Path image = root.resolve(filename);
        Resource resource = null;
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

    public long loadItemPhotos(Integer id) {
        try {
            return  Files.walk(this.root, 1)
                    .filter(path -> !path.equals(this.root))
                    .map(this.root::relativize)
                    .filter(str -> toString()
                            .matches("^" + id.toString() + "[_]\\d+[\\.]")).count();
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files");
        }
    }

    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files");
        }
    }

}
