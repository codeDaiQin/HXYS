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
	goodsId := c.Param("goods_id")
	if goodsId == "" {
		c.JSON(http.StatusOK, gin.H{
			"code": e.INVALID_PARAMS,
			"msg":  e.GetMsg(e.INVALID_PARAMS),
		})
		return
	}

	// 获取商品详情
	maps := make(map[string]interface{})
	maps["goods_id"] = goodsId
	data, err := goods.GetGoodsDetail(maps)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code": e.ERROR_NOT_EXIST_GOODS,
			"msg":  e.GetMsg(e.ERROR_NOT_EXIST_GOODS),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": e.SUCCESS,
		"msg":  e.GetMsg(e.SUCCESS),
		"data": data,
	})
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
	goodsType := c.Query("goods_type")

	maps := make(map[string]interface{})
	data := make(map[string]interface{})

	if goodsType != "" {
		maps["goods_type"] = goodsType
	}

	code := e.SUCCESS

	list, err := goods.GetGoodsList(util.GetPage(c), setting.PageSize, maps)
	if err != nil {
		code = e.ERROR
	}
	data["total"] = goods.GetGoodsTotal(maps)
	data["list"] = list

	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": data,
	})
}
