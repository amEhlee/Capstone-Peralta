package com.capstone.peralta.controllers;

import com.capstone.peralta.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;

/**
 * Controller class for generating reports. Contains all the REST endpoints
 * @author Jared Smith
 */
@RestController
@RequestMapping("/report")
@CrossOrigin(origins = "3000")
public class ReportController {

    @Autowired
    private ReportService reportService;

    /**
     * Class constructor for the ReportController
     * @param reportService the ReportService is used for all business logic,
     *                      auto-injected by Spring when calling the constructor.
     */
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    /**
     * This method calls for the ReportService to generate a report of all
     * persisted orders
     */
    @GetMapping("/generate")
    void generateReport() {
        try {
            reportService.generateReport();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
