package main

import (
	"HXYS/models/wechat"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(Cors())

	r.GET("/getOpenId", func(c *gin.Context) {
		code := c.Query("code")
		appId := c.Query("appId")
		appSecret := c.Query("appSecret")
		openid, err := wechat.GetOpenID(appId, appSecret, code)

		if err != nil {
			c.JSON(500, gin.H{
				"message": err.Error(),
			})
			return
		}

		c.JSON(200, gin.H{
			"message": openid,
		})
	})
	r.Run()
}

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "*")
		c.Header("Access-Control-Allow-Methods", "*")
		c.Header("Access-control-allow-credentials", "true")
	}
}
