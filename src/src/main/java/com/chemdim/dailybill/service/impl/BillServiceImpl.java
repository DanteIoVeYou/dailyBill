package com.chemdim.dailybill.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.chemdim.dailybill.entity.Bill;
import com.chemdim.dailybill.entity.BillChartInfo;
import com.chemdim.dailybill.mapper.BillMapper;
import com.chemdim.dailybill.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class BillServiceImpl implements BillService {
    @Autowired
    private BillMapper billMapper;

    @Override
    public List<Bill> getBillList(Integer userid, String item, String category, String paymentMethod, String incomeExpense, String startDate, String endDate) {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("userid", userid);
        queryWrapper.like(StringUtils.isNotBlank(item), "item", item);
        queryWrapper.eq(StringUtils.isNotBlank(paymentMethod), "paymentMethod", paymentMethod);
        queryWrapper.eq(StringUtils.isNotBlank(category), "category", category);
        queryWrapper.ge(StringUtils.isNotBlank(startDate), "payDate", startDate).le(StringUtils.isNotBlank(endDate), "payDate", endDate);
        if(!incomeExpense.equals("all")) {
            queryWrapper.eq("incomeExpense", incomeExpense);
        }
        return billMapper.selectList(queryWrapper);
    }

    @Override
    public List<Bill> getBillList(String item, String category, String paymentMethod, String incomeExpense, String startDate, String endDate) {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.like(StringUtils.isNotBlank(item), "item", item);
        queryWrapper.eq(StringUtils.isNotBlank(paymentMethod), "paymentMethod", paymentMethod);
        queryWrapper.eq(StringUtils.isNotBlank(category), "category", category);
        queryWrapper.ge(StringUtils.isNotBlank(startDate), "payDate", startDate).le(StringUtils.isNotBlank(endDate), "payDate", endDate);
        if(!incomeExpense.equals("all")) {
            queryWrapper.eq("incomeExpense", incomeExpense);
        }
        return billMapper.selectList(queryWrapper);
    }

    @Override
    public int addBill(Bill newBill) {
        newBill.setPayDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        System.out.println(newBill);
        return billMapper.insert(newBill);
    }

    @Override
    public int deleteBill(Bill deletedBill) {
        return billMapper.deleteById(deletedBill);
    }

    @Override
    public int modifyBill(Bill newBill) {
        return billMapper.updateById(newBill);
    }

    @Override
    public List<BillChartInfo> monthbill(String year, String month) {
        QueryWrapper queryWrapper = new QueryWrapper();
        String time = year + "-" + month;
        queryWrapper.like(StringUtils.isNotBlank(time), "payDate", time);
        System.out.println(time);
        List<Bill> billList = billMapper.selectList(queryWrapper);
        System.out.println(billList);
        List<BillChartInfo> billChartInfoList = new ArrayList<>();

        HashMap<String, Float> categoryMap = new HashMap<>();
        for(Bill bill: billList) {
            String category = bill.getCategory();
            if(categoryMap.containsKey(category)) {
                float amount = categoryMap.get(category) + bill.getAmount();
                categoryMap.put(category, amount);
            } else {
                float amount = bill.getAmount();
                categoryMap.put(category, amount);
            }
        }
        for(Map.Entry<String, Float> entry: categoryMap.entrySet()) {
            BillChartInfo billChartInfo = new BillChartInfo(entry.getKey(), entry.getValue());
            billChartInfoList.add(billChartInfo);
        }
        System.out.println(billChartInfoList);

        return billChartInfoList;
    }


}
