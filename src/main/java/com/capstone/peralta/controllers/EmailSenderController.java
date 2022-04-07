package com.capstone.peralta.controllers;

import com.capstone.peralta.services.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
@CrossOrigin(origins = "3000")
public class EmailSenderController {

    @Autowired
    private EmailSenderService senderService;

    public EmailSenderController (EmailSenderService service){
        this.senderService = service;
    }

    @PostMapping("/send")
    void sendEmail(){
        senderService.sendEmail("javaemailtest35@gmail.com",
                "This is subject",
                "This is the body of email");
    }

}