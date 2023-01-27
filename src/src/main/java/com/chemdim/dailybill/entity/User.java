package com.chemdim.dailybill.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain = true)
@TableName("user")
public class User {
    /**
     * 用户id
     */
    @TableId
    private Integer userid;
    /**
     * 密码
     */
    private String password;
    /**
     * 邮箱
     */
    private String email;
    /**
     * 用户名
     */
    private String username;
    /**
     * 用户创建时间
     */
    @TableField("createTime")
    private String createTime;
    /**
     * 最近一次登陆时间
     */
    @TableField("lastLoginTime")
    private String lastLoginTime;
    /**
     * 用户状态，0为封禁，1为正常
     */
    private Integer state;
    /**
     * 流水记录数量
     */
    @TableField("recordCount")
    private Integer recordCount;
    /**
     * 是否为管理员，0为否，1为是
     */
    @TableField("isAdmin")
    private Integer isAdmin;
}