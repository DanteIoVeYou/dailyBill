package com.chemdim.dailybill.controller;

import com.chemdim.dailybill.entity.Bill;
import com.chemdim.dailybill.service.BillService;
import com.chemdim.dailybill.uitls.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/bill")
@CrossOrigin
public class BillController {
    @Autowired
    private BillService billService;
    @GetMapping("/billlist")
    ResponseBody<List<Bill>> billlist(@RequestParam String item, @RequestParam String category, @RequestParam String paymentMethod, @RequestParam String incomeExpense) {
        int status = 0;
        String message = "";
        List<Bill> billList = billService.getBillList(item, category, paymentMethod);
        return new ResponseBody<>(status, message, billList);
    }
    @PostMapping("/add/bill")
    ResponseBody<?> addBill(@RequestBody Bill newBill) {
        int status = 0;
        String message = "";
        int ret = billService.addBill(newBill);
        return new ResponseBody<>(status, message, ret );
    }
}
