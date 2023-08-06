package com.chemdim.dailybill.controller;

import com.chemdim.dailybill.entity.Bill;
import com.chemdim.dailybill.entity.BillChartInfo;
import com.chemdim.dailybill.entity.User;
import com.chemdim.dailybill.service.BillService;
import com.chemdim.dailybill.service.UserService;
import com.chemdim.dailybill.uitls.ResponseBody;
import com.chemdim.dailybill.uitls.ResponseMessage;
import com.chemdim.dailybill.uitls.ResponseStatus;
import com.chemdim.dailybill.uitls.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bill")
@CrossOrigin
public class BillController {
    @Autowired
    private BillService billService;
    @Autowired
    private UserService userService;
    @GetMapping("/billlist")
    ResponseBody<List<Bill>> billlist(@RequestParam Integer userid, @RequestParam String item, @RequestParam String category, @RequestParam String paymentMethod, @RequestParam String incomeExpense, @RequestParam String startDate, @RequestParam String endDate, HttpServletRequest request) {
        int status = 0;
        String message = "";
        User sessionUser = SessionUtil.getUserBySession(request);
        List<Bill> billList = new ArrayList<>();
        if(sessionUser != null) {
            if(sessionUser.getIsAdmin() == 0) {
                // common user
                billList = billService.getBillList(userid, item, category, paymentMethod, incomeExpense, startDate, endDate);
            } else {
                // root user
                billList = billService.getBillList(item, category, paymentMethod, incomeExpense, startDate, endDate);
            }
            status = ResponseStatus.VALID_GET_RECORD_LIST;
            message = ResponseMessage.VALID_GET_USER_LIST;
        } else {
            status = ResponseStatus.INVALID_SESSION_EXPIRED;
            message = ResponseMessage.INVALID_SESSION_EXPIRED;
        }
        return new ResponseBody<>(status, message, billList);
    }
    @PostMapping("/add/bill")
    ResponseBody<?> addBill(@RequestBody Bill newBill, HttpServletRequest request) {
        int status = 0;
        String message = "";
        int ret = 0;
        User sessionUser = SessionUtil.getUserBySession(request);
        if(sessionUser != null) {
            ret = billService.addBill(newBill);
            if(ret == 0) {
                System.out.println("add bill failed");
                status = ResponseStatus.INVALID_ADD_RECORD;
                message = ResponseMessage.INVALID_ADD_RECORD;
            } else {
                // add record successfully
                int userid = sessionUser.getUserid();
                User userInfo = userService.findUserById(userid);
                userInfo.setRecordCount(userInfo.getRecordCount() + 1);
                userService.updateUserInfo(userInfo);
                status = ResponseStatus.VALID_ADD_RECORD;
                message = ResponseMessage.VALID_ADD_RECORD;
            }
        } else {
            status = ResponseStatus.INVALID_SESSION_EXPIRED;
            message = ResponseMessage.INVALID_SESSION_EXPIRED;
        }
        return new ResponseBody<>(status, message, ret);
    }
    @PostMapping("/delete/bill")
    ResponseBody<?> deleteBill(@RequestBody Bill deletedBill, HttpServletRequest request) {
        int status = 0;
        String message = "";
        int ret = 0;
        User sessionUser = SessionUtil.getUserBySession(request);
        if(sessionUser != null) {
            ret = billService.deleteBill(deletedBill);
            if(ret == 0) {
                System.out.println("delete record failed");
                status = ResponseStatus.INVALID_DELETE_RECORD;
                message = ResponseMessage.INVALID_DELETE_RECORD;
            } else {
                // delete record successfully
                int userid = sessionUser.getUserid();
                User userInfo = userService.findUserById(userid);
                userInfo.setRecordCount(userInfo.getRecordCount() - 1);
                userService.updateUserInfo(userInfo);
                status = ResponseStatus.VALID_DELETE_RECORD;
                message = ResponseMessage.VALID_DELETE_RECORD;
            }
        } else {
            status = ResponseStatus.INVALID_SESSION_EXPIRED;
            message = ResponseMessage.INVALID_SESSION_EXPIRED;
        }
        return new ResponseBody<>(status, message, ret);
    }
    @PostMapping("/modify/bill")
    ResponseBody<Integer> modifyBill(@RequestBody Bill newBill) {
        int status = 0;
        String message = "";
        int ret = billService.modifyBill(newBill);
        return new ResponseBody<>(status, message, ret);
    }
    @GetMapping("/monthbill")
    ResponseBody<List<BillChartInfo>> monthbill(@RequestParam String year, @RequestParam String month) {
        int status = 0;
        String message = "";
        List<BillChartInfo> ret = billService.monthbill(year, month);
        return new ResponseBody<>(status, message, ret);
    }
}
