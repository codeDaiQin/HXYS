-- 用户表
CREATE TABLE `HXYS_user` (
`id` INT (10) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'id',
`open_id` CHAR (28) NOT NULL COMMENT '微信openid',
`default_address_id` INT ( 10 ) NOT NULL COMMENT '默认地址id',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT '用户表';