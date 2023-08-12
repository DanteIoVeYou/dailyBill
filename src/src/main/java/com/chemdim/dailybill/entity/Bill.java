package com.chemdim.dailybill.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@TableName("bill")
public class Bill {
    @TableId
    private Integer recordid;
    private Integer userid;
    private String username;
    private String item;
    private String category;
    private float amount;
    @TableField("paymentMethod")
    private String paymentMethod;
    @TableField("payDate")
    private String payDate;
    @TableField("incomeExpense")
    private String incomeExpense;
    private String remark;

}
