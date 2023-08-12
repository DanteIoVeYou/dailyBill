package com.chemdim.dailybill.service;

import com.chemdim.dailybill.entity.Bill;
import com.chemdim.dailybill.entity.BillChartInfo;

import java.util.List;

public interface BillService {
    List<Bill> getBillList(Integer userid, String item, String category, String paymentMethod, String incomeExpense, String startDate, String endDate);

    int addBill(Bill newBill);

    int deleteBill(Bill deletedBill);

    int modifyBill(Bill newBill);

    List<BillChartInfo> monthbill(String year, String month);

    List<BillChartInfo> monthbill(Integer userid, String year, String month);

    List<Bill> getBillList(String item, String category, String paymentMethod, String incomeExpense, String startDate, String endDate);

}
