-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        8.0.19 - MySQL Community Server - GPL
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 eorder 的数据库结构
CREATE DATABASE IF NOT EXISTS `eorder` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `eorder`;

-- 导出  表 eorder.announcement 结构
CREATE TABLE IF NOT EXISTS `announcement` (
  `announcement_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '公告id',
  `url` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '0',
  `content` varchar(512) COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告内容',
  `start_time` datetime NOT NULL COMMENT '公告开始时间',
  `end_time` datetime NOT NULL COMMENT '公告结束时间',
  `announcement_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '公告状态，true显示，false不显示',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `title` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `store_id` int DEFAULT NULL,
  PRIMARY KEY (`announcement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='网站公告表';

-- 数据导出被取消选择。

-- 导出  表 eorder.food_category 结构
CREATE TABLE IF NOT EXISTS `food_category` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '菜品类别id',
  `store_id` int unsigned NOT NULL COMMENT '店铺id',
  `category_name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '类别名',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`category_id`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='菜品类别表';

-- 数据导出被取消选择。

-- 导出  表 eorder.food_info 结构
CREATE TABLE IF NOT EXISTS `food_info` (
  `food_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '菜品id',
  `store_id` int unsigned NOT NULL COMMENT '店铺id',
  `food_name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜品名称',
  `food_price` decimal(8,2) NOT NULL COMMENT '菜品单价',
  `food_description` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '菜品描述',
  `food_icon` varchar(512) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '菜品图标',
  `category_type` int unsigned NOT NULL COMMENT '菜品类别',
  `food_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '菜品状态:true正常，false下架',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`food_id`),
  KEY `store_id` (`store_id`),
  KEY `category_type` (`category_type`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='菜品信息表';

-- 数据导出被取消选择。

-- 导出  表 eorder.order_detail 结构
CREATE TABLE IF NOT EXISTS `order_detail` (
  `detail_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '订单详情id',
  `order_id` char(32) COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单id(order_master表中的主键)',
  `store_id` int unsigned NOT NULL COMMENT '食堂店铺id',
  `food_id` int unsigned NOT NULL COMMENT '菜品id',
  `food_name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜品名称',
  `food_price` decimal(8,2) NOT NULL COMMENT '菜品单价',
  `food_quantity` int NOT NULL COMMENT '订购的菜品数量',
  `food_icon` varchar(512) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '菜品图标',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`detail_id`),
  KEY `order_id` (`order_id`),
  KEY `store_id` (`store_id`),
  KEY `food_id` (`food_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='订单从表';

-- 数据导出被取消选择。

-- 导出  表 eorder.order_master 结构
CREATE TABLE IF NOT EXISTS `order_master` (
  `order_id` int NOT NULL AUTO_INCREMENT COMMENT '订单id(32位uuid)',
  `buyer_id` int unsigned NOT NULL COMMENT '买家id',
  `store_id` int unsigned NOT NULL COMMENT '店铺id',
  `runner_id` int unsigned DEFAULT NULL COMMENT '配送员id',
  `runner_name` varchar(11) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '配送员姓名',
  `runner_phone` varchar(11) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '配送员手机号',
  `buyer_name` varchar(11) COLLATE utf8mb4_general_ci NOT NULL COMMENT '买家姓名',
  `buyer_phone` varchar(11) COLLATE utf8mb4_general_ci NOT NULL COMMENT '买家手机号',
  `buyer_address` varchar(128) COLLATE utf8mb4_general_ci NOT NULL COMMENT '买家配送地址',
  `buyer_remark` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '买家备注',
  `order_amount` decimal(10,2) NOT NULL COMMENT '订单总价金额(一次购买中，在同一店铺里买的所有菜品应该算入一个订单中)',
  `order_status` tinyint NOT NULL DEFAULT '0' COMMENT '订单状态,默认0已下单，1商家确认订单，2配送员接单配送中，3完成，4取消',
  `pay_status` tinyint NOT NULL DEFAULT '0' COMMENT '支付状态，默认0未支付，1已支付(支付完成后不能取消订单)',
  `buyer_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '用户是否删除了订单:true删除，false没有',
  `seller_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '卖家是否删除了订单:true删除，false没有',
  `runner_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '配送员是否删除了订单:true删除，false没有',
  `admin_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '管理员是否删除了订单:true删除，false没有',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `post_price` decimal(10,2) DEFAULT NULL,
  `store_user_id` int DEFAULT NULL,
  `store_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `buyer_id` (`buyer_id`),
  KEY `store_id` (`store_id`),
  KEY `runner_id` (`runner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='订单主表';

-- 数据导出被取消选择。

-- 导出  表 eorder.review 结构
CREATE TABLE IF NOT EXISTS `review` (
  `review_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `user_id` int unsigned NOT NULL COMMENT '发布此评论的用户id',
  `store_id` int unsigned NOT NULL COMMENT '被评论的商家id',
  `start_num` tinyint NOT NULL DEFAULT '5' COMMENT '星数，5星好评',
  `content` varchar(300) COLLATE utf8mb4_general_ci NOT NULL COMMENT '评论的内容',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `store_content` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rider_content` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `store_id` (`store_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户评论表';

-- 数据导出被取消选择。

-- 导出  表 eorder.role_audit 结构
CREATE TABLE IF NOT EXISTS `role_audit` (
  `audit_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '审核id',
  `user_id` int unsigned NOT NULL COMMENT '进行身份认证的用户id',
  `real_name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '进行身份认证用户的真实姓名',
  `id_card_front` varchar(512) COLLATE utf8mb4_general_ci NOT NULL COMMENT '身份证正面图片',
  `id_card_back` varchar(512) COLLATE utf8mb4_general_ci NOT NULL COMMENT '身份证反面图片',
  `business_license` varchar(512) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'runner可以不上传，seller上传营业执照图片',
  `remark` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注留言(可不填)',
  `account_type` char(6) COLLATE utf8mb4_general_ci NOT NULL COMMENT '申请的账户类型:seller/runner',
  `audit_status` tinyint NOT NULL DEFAULT '0' COMMENT '审核状态,默认0待审核，1审核通过，2审核不通过',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`audit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='身份认证审核表';

-- 数据导出被取消选择。

-- 导出  表 eorder.store_info 结构
CREATE TABLE IF NOT EXISTS `store_info` (
  `store_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '食堂店铺id',
  `seller_id` int unsigned NOT NULL COMMENT '店主id(用户表中的user_id)',
  `store_name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '店铺名',
  `store_phone` varchar(11) COLLATE utf8mb4_general_ci NOT NULL COMMENT '商家电话',
  `store_address` varchar(128) COLLATE utf8mb4_general_ci NOT NULL COMMENT '商家地址',
  `store_icon` varchar(512) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '商家店铺图标',
  `store_open_time` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '营业时间',
  `store_notice` varchar(128) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '店铺公告',
  `store_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '店铺是否营业',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `store_desc` varchar(128) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `store_score` double(5,1) DEFAULT '5.0',
  `min_price` decimal(8,2) NOT NULL DEFAULT '0.00',
  `post_price` decimal(8,2) NOT NULL DEFAULT '0.00',
  `order_quantity` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`store_id`),
  KEY `seller_id` (`seller_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='餐厅商店信息表';

-- 数据导出被取消选择。

-- 导出  表 eorder.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(20) COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` char(32) COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码:MD5加密存储',
  `nickname` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '昵称',
  `phone` varchar(11) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '手机号码',
  `salt` char(8) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'MD5随机盐',
  `role` varchar(30) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user' COMMENT '用户角色:user,runner,seller,admin',
  `score` int NOT NULL DEFAULT '0' COMMENT '积分',
  `iconUrl` varchar(512) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户头像',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '钱包余额',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `unique_username` (`username`),
  UNIQUE KEY `unique_mobile` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户表';

-- 数据导出被取消选择。

-- 导出  表 eorder.user_address 结构
CREATE TABLE IF NOT EXISTS `user_address` (
  `address_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '配送地址id',
  `user_id` int unsigned NOT NULL COMMENT '用户id',
  `name` varchar(11) COLLATE utf8mb4_general_ci NOT NULL COMMENT '收货人姓名',
  `phone` varchar(11) COLLATE utf8mb4_general_ci NOT NULL COMMENT '收货人手机号',
  `address` varchar(128) COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户的配送地址',
  `default_address` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否为默认地址',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户地址表';

-- 数据导出被取消选择。

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
