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

@Controller
@CrossOrigin(origins = "3000")
public class ImageController {

    @Autowired
    ImageService imageService;

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
