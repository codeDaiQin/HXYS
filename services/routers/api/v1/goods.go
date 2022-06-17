package v1

import (
	"HXYS/models/goods"
	"HXYS/pkg/e"
	"HXYS/pkg/setting"
	"HXYS/util"
	"github.com/gin-gonic/gin"
	"net/http"
)

// GetGoodsDetail	获取商品详情
func GetGoodsDetail(c *gin.Context) {

}

// AddGoods	新增商品
func AddGoods(c *gin.Context) {
}

// EditGoods 修改商品
func EditGoods(c *gin.Context) {
}

// DeleteGoods	删除商品
func DeleteGoods(c *gin.Context) {
}

// GetGoodsList 获取商品列表
func GetGoodsList(c *gin.Context) {
	//goodsType := c.Param("goodsType")

	maps := make(map[string]interface{})
	data := make(map[string]interface{})

	//if goodsType != "" {
	//	maps["goodsType"] = goodsType
	//}
	//
	//var state int = -1
	//if arg := c.Query("state"); arg != "" {
	//	state = com.StrTo(arg).MustInt()
	//	maps["state"] = state
	//}

	code := e.SUCCESS

	data["lists"] = goods.GetGoodsList(util.GetPage(c), setting.PageSize, maps)
	data["total"] = goods.GetGoodsTotal(maps)

	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": data,
	})
}

//
