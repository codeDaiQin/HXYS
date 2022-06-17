package goods

import (
	"HXYS/libs"
)

type Goods struct {
	GoodsId string `gorm:"primary_key" json:"goods_id"`
}

// GetGoodsList	获取商品列表
func GetGoodsList(pageNum int, pageSize int, maps interface{}) (goods []Goods) {
	libs.Db.Where(maps).Offset(pageNum).Limit(pageSize).Find(&goods)

	return
}

func GetGoodsTotal(maps interface{}) (count int64) {
	libs.Db.Model(&Goods{}).Where(maps).Count(&count)

	return
}
