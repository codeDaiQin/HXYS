package auth

import (
	"HXYS/pkg/e"
	"github.com/gin-gonic/gin"
	"net/http"
)

// Auth 用户认证 中间件
func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 获取 token
		token := c.GetHeader("Authorization")
		var code int
		var data interface{}

		code = e.SUCCESS
		if token == "" {
			code = e.ERROR_NOT_EXIST_AUTH
		} else {
			claims, err := ParseToken(token)
			if err != nil {
				code = e.ERROR_AUTH_CHECK_TOKEN_FAIL
			}
			println(claims.UserId)
			//else if time.Now().Unix() > claims.Expires.Unix() {
			//	code = e.ERROR_AUTH_CHECK_TOKEN_TIMEOUT
			//}
			//println(claims.UserId)
			//println(time.Now().Unix(), claims.Expires.Unix())
		}

		if code != e.SUCCESS {
			c.JSON(http.StatusUnauthorized, gin.H{
				"code": code,
				"msg":  e.GetMsg(code),
				"data": data,
			})

			c.Abort()
			return
		}

		c.Next()
	}
}
