package routers

import (
	"github.com/gin-gonic/gin"

	"HXYS/pkg/setting"
	v1 "HXYS/routers/api/v1"
)

func InitRouter() *gin.Engine {
	r := gin.New()

	r.Use(Cors())

	r.Use(gin.Logger())

	r.Use(gin.Recovery())

	gin.SetMode(setting.RunMode)

	goods := r.Group("/api/v1/goods")
	{
		// 获取商品列表
		goods.GET("/list", v1.GetGoodsList)
		// 获取商品详情
		goods.GET("/:goods_id", v1.GetGoodsDetail)
		//	新增商品
		goods.POST("/add", v1.AddGoods)
		//	修改商品
		goods.PUT("/:id", v1.EditGoods)
		//	删除商品
		goods.DELETE("/:id", v1.DeleteGoods)
	}

	user := r.Group("/api/v1/user")
	{
		// 获取用户信息
		user.GET("/", v1.GetOpenId)
	}

	// https://eddycjy.com/posts/go/gin/2018-02-12-api-02/
	return r
}

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "*")
		c.Header("Access-Control-Allow-Methods", "*")
		c.Header("Access-control-allow-credentials", "true")
	}
}
