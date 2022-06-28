// Package util 包含一些工具函数
// 与用户唯一标识符(uuid)相关的信息处理， 上线与离线的处理等
// 数据表：data(uuid varchar(32) primary key, registertime timestamp), registertime为uuid的注册时间
// 所有uuid信息保存在内存中, 更新时实时写入数据库
//
package util

import (
	"github.com/google/uuid"
	"log"
)

// GeneratorUUID UUID 唯一标识符
func GeneratorUUID() (string, error) {
	// 生成uuid
	u, err := uuid.NewUUID()
	if err != nil {
		log.Fatalln(err)
		return "", err
	}
	return u.String(), nil
}
