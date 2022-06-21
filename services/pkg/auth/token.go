package auth

import (
	"HXYS/pkg/setting"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"time"
)

// TokenExpireDuration token 过期时间 默认为 3 天
const TokenExpireDuration = time.Hour * 24 * 3

// CreateToken 创建 token
func CreateToken(userId string) (string, error) {
	// token 过期时间
	expires := time.Now().Add(TokenExpireDuration).Unix()

	// 声明 token
	claims := jwt.MapClaims{
		"user_id": userId,
		"expires": expires,
	}
	// 生成 token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// 编码 token
	enToken, err := token.SignedString([]byte(setting.JwtSecret))

	return enToken, err
}

// DeleteToken 删除 token
func DeleteToken(c *gin.Context) {

}

// ClearToken 清除所有 token
func ClearToken(c *gin.Context) {
}

// GetTokenList 获取 token 列表
func GetTokenList(c *gin.Context) {

}
