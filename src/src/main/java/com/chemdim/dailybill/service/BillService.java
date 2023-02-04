package com.chemdim.dailybill.service;

import com.chemdim.dailybill.entity.Bill;

import java.util.List;

public interface BillService {
    List<Bill> getBillList(String item, String category, String paymentMethod, String incomeExpense);

    int addBill(Bill newBill);

    int deleteBill(Bill deletedBill);

    int modifyBill(Bill newBill);
}
