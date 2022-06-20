package v1

import (
	"HXYS/models/user"
	"HXYS/pkg/e"

	"github.com/gin-gonic/gin"
)

func WechatLogin(c *gin.Context) {
	code := c.Query("code")
	appId := c.Query("appId")
	appSecret := c.Query("appSecret")

	if code == "" || appId == "" || appSecret == "" {
		c.JSON(400, gin.H{
			"code": e.INVALID_PARAMS,
			"msg":  e.GetMsg(e.INVALID_PARAMS),
		})
		return
	}

	openid, err := user.GetOpenID(appId, appSecret, code)
	// 获取openid失败
	if err != nil || openid == "" {
		// 未找到直接注册
		// user.AddUser(openid, "")
		c.JSON(400, gin.H{
			"code": e.ERROR_NOT_EXIST_USER,
			"msg":  e.GetMsg(e.ERROR_NOT_EXIST_USER),
		})
		return
	}

	c.JSON(200, gin.H{
		"data": openid,
		"code": e.SUCCESS,
		"msg":  e.GetMsg(e.SUCCESS),
	})
}
