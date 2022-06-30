package auth

import (
	"HXYS/pkg/e"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

// Auth 用户认证 中间件
func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 获取 token
		token := c.GetHeader("Authorization")

		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"code": e.ERROR_NOT_EXIST_AUTH,
				"msg":  e.GetMsg(e.ERROR_NOT_EXIST_AUTH),
			})
			c.Abort()
			return
		} else {
			claims, err := ParseToken(token)
			println(token, claims, err != nil)
			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{
					"code": e.ERROR_AUTH_CHECK_TOKEN_FAIL,
					"msg":  e.GetMsg(e.ERROR_AUTH_CHECK_TOKEN_FAIL),
				})
				c.Abort()
				return
			}
			if time.Now().Unix() > claims.Expires.Unix() {
				c.JSON(http.StatusUnauthorized, gin.H{
					"code": e.ERROR_AUTH_CHECK_TOKEN_TIMEOUT,
					"msg":  e.GetMsg(e.ERROR_AUTH_CHECK_TOKEN_TIMEOUT),
				})
				c.Abort()
				return
			}
		}

		c.Next()
	}
}
