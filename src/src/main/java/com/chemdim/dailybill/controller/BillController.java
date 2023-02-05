package com.chemdim.dailybill.controller;

import com.chemdim.dailybill.entity.Bill;
import com.chemdim.dailybill.service.BillService;
import com.chemdim.dailybill.uitls.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bill")
@CrossOrigin
public class BillController {
    @Autowired
    private BillService billService;
    @GetMapping("/billlist")
    ResponseBody<List<Bill>> billlist(@RequestParam String item, @RequestParam String category, @RequestParam String paymentMethod, @RequestParam String incomeExpense, @RequestParam String startDate, @RequestParam String endDate) {
        int status = 0;
        String message = "";
        List<Bill> billList = billService.getBillList(item, category, paymentMethod, incomeExpense, startDate, endDate);
        return new ResponseBody<>(status, message, billList);
    }
    @PostMapping("/add/bill")
    ResponseBody<?> addBill(@RequestBody Bill newBill) {
        int status = 0;
        String message = "";
        int ret = billService.addBill(newBill);
        return new ResponseBody<>(status, message, ret);
    }
    @PostMapping("/delete/bill")
    ResponseBody<?> deleteBill(@RequestBody Bill deletedBill) {
        int status = 0;
        String message = "";
        int ret = billService.deleteBill(deletedBill);
        return new ResponseBody<>(status, message, ret);
    }
    @PostMapping("/modify/bill")
    ResponseBody<Integer> modifyBill(@RequestBody Bill newBill) {
        int status = 0;
        String message = "";
        int ret = billService.modifyBill(newBill);
        return new ResponseBody<>(status, message, ret);
    }
}
