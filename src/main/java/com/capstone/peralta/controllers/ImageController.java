package com.capstone.peralta.controllers;

import com.capstone.peralta.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;

/**
 * Controller class for the Image model. Contains all the REST endpoints
 * @author Jared Smith
 */
@Controller
@RequestMapping("/image")
@CrossOrigin(origins = "3000")
@RolesAllowed({"ROLE_ADMIN", "ROLE_OWNER"})
public class ImageController {

//    Autowired tells Spring to inject an ImageService object when the constructor is called
    @Autowired
    private final ImageService imageService;

    /**
     * Class constructor for the ImageController
     * @param imageService the ImageService is used for all business logic,
     *                     auto-injected by Spring when calling the constructor.
     */
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    /**
     * This method takes in an Image object through the body of the request, and
     * saves the image to the database. It also renames the image in the format of
     * (itemId)_(imageNumber).*
     * @param image the image to be persisted
     * @param itemId the id of the item the image is attached to
     * @return a ResponseEntity object, declaring whether or not the persistence
     * was successful
     */
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
