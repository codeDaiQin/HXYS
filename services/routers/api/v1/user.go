package v1

import (
	"HXYS/models/wechat"

	"github.com/gin-gonic/gin"
)

func GetOpenId(c *gin.Context) {
	code := c.Query("code")
	appId := c.Query("appId")
	appSecret := c.Query("appSecret")
	openid, err := wechat.GetOpenID(appId, appSecret, code)

	if err != nil {
		c.JSON(500, gin.H{
			"message": "err",
		})
		return
	}

	c.JSON(200, gin.H{
		"openid": openid,
	})
}
