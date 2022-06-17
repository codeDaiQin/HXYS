package goods

import (
	"HXYS/libs"
)

type Goods struct {
	GoodsId   string `gorm:"primary_key" json:"goods_id"`
	GoodsName string `json:"goods_name"`
	GoodsType string `json:"goods_type"`
}

// GetGoodsList	获取商品列表
func GetGoodsList(pageNum int, pageSize int, maps interface{}) (goods []Goods, err error) {
	err = libs.Db.Where(maps).Offset(pageNum).Limit(pageSize).Find(&goods).Error
	return
}

// GetGoodsTotal 获取商品总数
func GetGoodsTotal(maps interface{}) (count int64) {
	libs.Db.Model(&Goods{}).Where(maps).Count(&count)
	return
}

// GetGoodsDetail 获取商品详情
func GetGoodsDetail(maps interface{}) (goods Goods, err error) {
	err = libs.Db.Where(maps).First(&goods).Error
	return
}
