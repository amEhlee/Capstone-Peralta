package com.capstone.peralta.controllers;

import com.capstone.peralta.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;

@RestController
@RequestMapping("/report")
@CrossOrigin(origins = "3000")
public class ReportController {

    @Autowired
    private ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/generate")
    void generateReport() {
        try {
            reportService.generateReport();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
