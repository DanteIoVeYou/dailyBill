/*
Navicat MySQL Data Transfer

Source Server         : centos7
Source Server Version : 50739
Source Host           : 192.168.46.201:3306
Source Database       : dailyBillTest1

Target Server Type    : MYSQL
Target Server Version : 50739
File Encoding         : 65001

Date: 2023-02-26 19:45:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `recordCount` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `lastLoginTime` datetime DEFAULT NULL,
  `isAdmin` int(11) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
