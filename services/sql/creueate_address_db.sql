-- 地址表
CREATE TABLE `HXYS_address` (
`id` INT (10) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'id',
`user_id` INT (10) NOT NULL COMMENT 'userId',
`detailed` VARCHAR (256) NOT NULL COMMENT '详细地址',
`consignee` VARCHAR (64) NOT NULL COMMENT '收货人',
`phone` CHAR (11) NOT NULL COMMENT '手机号',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT '地址表';