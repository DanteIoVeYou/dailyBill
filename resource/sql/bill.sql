/*
Navicat MySQL Data Transfer

Source Server         : centos7
Source Server Version : 50739
Source Host           : 192.168.46.201:3306
Source Database       : dailyBillTest1

Target Server Type    : MYSQL
Target Server Version : 50739
File Encoding         : 65001

Date: 2023-02-26 19:45:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill` (
  `recordid` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `item` varchar(128) DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `amount` decimal(32,2) DEFAULT NULL,
  `paymentMethod` varchar(20) DEFAULT NULL,
  `payDate` timestamp NULL DEFAULT NULL,
  `incomeExpense` varchar(20) DEFAULT NULL,
  `remark` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`recordid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
