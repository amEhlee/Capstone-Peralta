package com.capstone.peralta.services;

import com.capstone.peralta.models.Order;
import com.capstone.peralta.repos.OrderRepo;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * The Report service. Contains all business logic for generating reports
 *
 * @author Jared Smith
 */
@Service
public class ReportService {

    @Autowired
    private final OrderRepo orderRepo;

    /**
     * Instantiates a new Report service.
     *
     * @param orderRepo the order repo auto-injected by Spring
     */
    public ReportService(OrderRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

    /**
     * Generates a report as an Excel sheet.
     * The Excel file is named as the date in which the report is generated.
     * The Excel file contains all orders, their id, the date they were placed,
     * the status of the order, the amount of items in the order,
     * the order total price, the customer who placed the order,
     * the customers email, and the customers address. It also sums the total
     * number of items purchased, and the total price of all orders
     *
     * @throws FileNotFoundException the file not found exception
     */
    public void generateReport() throws FileNotFoundException {

        List<Order> orders = orderRepo.findAll();
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("MM dd yyyy");

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet(formatter.format(date));
        sheet.setColumnWidth(0, 3000);
        sheet.setColumnWidth(1, 4000);
        sheet.setColumnWidth(2, 6000);
        sheet.setColumnWidth(3, 2500);
        sheet.setColumnWidth(4, 3500);
        sheet.setColumnWidth(5, 6000);
        sheet.setColumnWidth(6, 30 * 256);
        sheet.setColumnWidth(7, 6000);



        Row header = sheet.createRow(0);
        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFFont font = ((XSSFWorkbook) workbook).createFont();
        font.setFontName("Arial");
        font.setFontHeightInPoints((short) 13);
        font.setBold(true);
        headerStyle.setFont(font);

        Cell headerCell = header.createCell(0);
        headerCell.setCellValue("Order Id");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(1);
        headerCell.setCellValue("Order Date");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(2);
        headerCell.setCellValue("Order Status");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(3);
        headerCell.setCellValue("Amount of Items");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(4);
        headerCell.setCellValue("Order Total");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(5);
        headerCell.setCellValue("Customer");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(6);
        headerCell.setCellValue("Customer Email");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(7);
        headerCell.setCellValue("Customer Address");
        headerCell.setCellStyle(headerStyle);

        CellStyle style = workbook.createCellStyle();

        System.out.println(orders.size());

        for (int i = 0; i < orders.size(); i++) {
            Row row = sheet.createRow(i + 1);
            Cell cell = row.createCell(0);
            cell.setCellValue(orders.get(i).getOrderId());
            cell.setCellStyle(style);

            cell = row.createCell(1);
            cell.setCellValue(formatter.format(orders.get(i).getOrderDate()));
            cell.setCellStyle(style);

            cell = row.createCell(2);
            cell.setCellValue(orders.get(i).getOrderStatus());
            cell.setCellStyle(style);

            cell = row.createCell(3);
            cell.setCellValue(orders.get(i).getItemAmount());
            cell.setCellStyle(style);

            cell = row.createCell(4);
            cell.setCellValue(orders.get(i).getOrderTotal());
            cell.setCellStyle(style);

            cell = row.createCell(5);
            cell.setCellValue(orders.get(i).getUser().getFirstName() + " " + orders.get(i).getUser().getLastName());
            cell.setCellStyle(style);

            cell = row.createCell(6);
            cell.setCellValue(orders.get(i).getUser().getEmail());
            cell.setCellStyle(style);

            cell = row.createCell(7);
            cell.setCellValue(orders.get(i).getUser().getAddress());
            cell.setCellStyle(style);
        }

        Row sumRow = sheet.createRow(orders.size() + 1);
        Cell orderTotalSum = sumRow.createCell(4);
        Cell amountSum = sumRow.createCell(3);

        orderTotalSum.setCellFormula("SUM(E2:E" + (orders.size() + 1) + ")");
        amountSum.setCellFormula("SUM(D2:D" + (orders.size() + 1) + ")");

        formatter = new SimpleDateFormat("MMddyyyy");
        File directory = new File("src/main/react-frontend/src/assets/reports/");
        String path = directory.getAbsolutePath();
        String fileLocation = path + "/" + formatter.format(date) + ".xlsx";
        FileOutputStream outputStream = new FileOutputStream(fileLocation);
        try {
            workbook.write(outputStream);
            workbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
