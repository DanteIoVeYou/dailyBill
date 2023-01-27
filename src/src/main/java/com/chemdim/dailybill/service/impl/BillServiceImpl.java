package com.chemdim.dailybill.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.chemdim.dailybill.entity.Bill;
import com.chemdim.dailybill.mapper.BillMapper;
import com.chemdim.dailybill.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillServiceImpl implements BillService {
    @Autowired
    private BillMapper billMapper;

    @Override
    public List<Bill> getBillList(String item, String category, String paymentMethod) {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq(StringUtils.isNotBlank(item), "item", item);
        queryWrapper.eq(StringUtils.isNotBlank(paymentMethod), "paymentMethod", paymentMethod);
        queryWrapper.eq(StringUtils.isNotBlank(category), "category", category);
//        queryWrapper.like(StringUtils.isNotBlank(username), "username", username);
        return billMapper.selectList(queryWrapper);
    }

    @Override
    public int addBill(Bill newBill) {
        return billMapper.insert(newBill);
    }
}
