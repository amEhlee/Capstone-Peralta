package com.capstone.peralta.controllers;

import com.capstone.peralta.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/*
 * Controller class for the Image model. Contains one REST endpoint to save the image locally
 */
@Controller
@CrossOrigin(origins = "3000")
public class ImageController {

//    Autowired tells Spring to inject an ImageService object when the constructor is called
    @Autowired
    private final ImageService imageService;

//    Constructor that is automatically with an ImageService object
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

//    Takes in an Image object in the request body, and an itemId as a path variable.
//    Saves the image to the database, renaming it to connect it to an item.
    @PostMapping("/upload/{itemId}")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image, @PathVariable("itemId") String itemId) {
        ResponseEntity<String> res = ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Could not save file");
        try {
            imageService.save(image, Integer.parseInt(itemId));
            res = ResponseEntity.status(HttpStatus.OK).body("File Saved");
        } catch (Exception e) {
            return res;
        }

        return res;
    }
}
