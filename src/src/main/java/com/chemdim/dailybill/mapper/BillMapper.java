package com.chemdim.dailybill.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.chemdim.dailybill.entity.Bill;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BillMapper extends BaseMapper<Bill> {}
