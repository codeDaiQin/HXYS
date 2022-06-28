package v1

import (
	"HXYS/models/user"
	"HXYS/pkg/auth"
	"HXYS/pkg/e"
	"github.com/gin-gonic/gin"
)

type User struct {
	OpenId string `json:"open_id"`
}

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

	// 生成token
	token, err := auth.CreateToken(session.Openid)
	if err != nil {
		c.JSON(400, gin.H{
			"code": e.ERROR,
			"msg":  e.GetMsg(e.ERROR),
		})
		return
	}

	c.JSON(200, gin.H{
		"data": token,
		"code": e.SUCCESS,
		"msg":  e.GetMsg(e.SUCCESS),
	})
}

// GetUserInfo 获取用户信息
func GetUserInfo(c *gin.Context) {
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
	userInfo, err := user.GetUserInfoByOpenId(tokenClaims.OpenId)
	if err != nil {
		c.JSON(400, gin.H{
			"code": e.ERROR_NOT_EXIST_USER,
			"msg":  e.GetMsg(e.ERROR_NOT_EXIST_USER),
		})
		return
	}

	if err != nil {
		c.JSON(401, gin.H{
			"code": e.ERROR_AUTH_CHECK_TOKEN_FAIL,
			"msg":  e.GetMsg(e.ERROR_AUTH_CHECK_TOKEN_FAIL),
		})
		return
	}

	c.JSON(200, gin.H{
		"data": User{
			OpenId: userInfo.OpenId,
		},
		"code": e.SUCCESS,
		"msg":  e.GetMsg(e.SUCCESS),
	})
}
