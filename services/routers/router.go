package routers

import (
	"HXYS/pkg/auth"
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

	r.GET("/auth", GetAuth)

	goods := r.Group("/api/v1/goods")
	{
		// 获取商品列表
		goods.GET("/list", v1.GetGoodsList)
		// 获取商品详情
		goods.GET("/:goods_id", v1.GetGoodsDetail)
		//	新增商品
		goods.POST("/add", v1.AddGoods)
		//	修改商品
		goods.PUT("/:goods_id", v1.EditGoods)
		//	删除商品
		goods.DELETE("/:goods_id", v1.DeleteGoods)
	}

	user := r.Group("/api/v1/user")
	{
		// 微信登录
		user.GET("/wechatLogin", v1.WechatLogin)
		//	获取用户信息
		user.GET("/info", v1.GetUserInfo)
		//	autoLogin
		user.GET("/autoLogin", v1.AutoLogin)
	}

	address := r.Group("/api/v1/address")
	address.Use(auth.Auth())
	{
		// 获取地址列表
		address.GET("/list", v1.GetAddressList)
		// 新增地址
		address.POST("/add", v1.AddAddress)
		// 删除地址
		address.DELETE("/:address_id", v1.DeleteAddress)
		// 修改地址
		address.PUT("/:address_id", v1.EditAddress)
	}

	// https://eddycjy.com/posts/go/gin/2018-02-12-api-02/
	return r
}

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "*")
		c.Header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
		c.Header("Access-control-allow-credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
		}
		c.Next()

	}
}
