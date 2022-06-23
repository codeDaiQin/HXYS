package v1

import (
	"HXYS/models/user"
	"HXYS/pkg/auth"
	"HXYS/pkg/e"
	"github.com/gin-gonic/gin"
)

// WechatLogin 微信登录
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

	session, err := user.CodeToSession(appId, appSecret, code)
	// 获取openid失败
	if err != nil || session.Openid == "" {
		c.JSON(400, gin.H{
			"code": session.Errcode,
			"msg":  session.Errmsg,
		})
		return
	}

	// 设置cookie
	c.SetCookie("session_id", session.Openid, 3600, "/", "localhost", false, false)

	c.JSON(200, gin.H{
		"data": session.Openid,
		"code": e.SUCCESS,
		"msg":  e.GetMsg(e.SUCCESS),
	})

}

// GetUserInfo 获取用户信息
func GetUserInfo(c *gin.Context) {
	userId := c.Query("user_id")

	// userId 长度固定为28
	if len(userId) != 28 {
		c.JSON(400, gin.H{
			"code": e.INVALID_PARAMS,
			"msg":  e.GetMsg(e.INVALID_PARAMS),
		})
		return
	}

	userInfo, err := user.GetUserInfo(userId)

	// 如果用户不存在，则新建用户
	if err != nil {
		c.JSON(200, gin.H{
			"data": userInfo,
			"code": e.SUCCESS,
			"msg":  e.GetMsg(e.SUCCESS),
		})
	}
}

// AutoLogin 自动登录
func AutoLogin(c *gin.Context) {
	// 获取 token
	token := c.GetHeader("Authorization")
	// 获取 userId
	tokenClaims, err := auth.ParseToken(token)
	if err != nil {
		c.JSON(401, gin.H{
			"code": e.ERROR_AUTH_CHECK_TOKEN_FAIL,
			"msg":  e.GetMsg(e.ERROR_AUTH_CHECK_TOKEN_FAIL),
		})
		return
	}

	// 获取用户信息
	userInfo, err := user.GetUserInfo(tokenClaims.UserId)
	if err != nil {
		c.JSON(401, gin.H{
			"code": e.ERROR_AUTH_CHECK_TOKEN_FAIL,
			"msg":  e.GetMsg(e.ERROR_AUTH_CHECK_TOKEN_FAIL),
		})
		return
	}

	c.JSON(200, gin.H{
		"data": userInfo,
		"code": e.SUCCESS,
		"msg":  e.GetMsg(e.SUCCESS),
	})
}
