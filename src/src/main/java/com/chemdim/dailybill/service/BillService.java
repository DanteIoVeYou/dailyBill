package com.chemdim.dailybill.service;

import com.chemdim.dailybill.entity.Bill;

import java.util.List;

public interface BillService {
    List<Bill> getBillList(String item, String category, String paymentMethod);

    int addBill(Bill newBill);
}
