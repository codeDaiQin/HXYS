package auth

import (
	"HXYS/pkg/setting"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"time"
)

type Claims struct {
	UserId  string `json:"user_id"`
	Expires time.Time
	jwt.MapClaims
}

// TokenExpireDuration token 过期时间 默认为 3 天
const TokenExpireDuration = time.Hour * 24 * 3

// jwtSecret jwt 密钥
var jwtSecret = []byte(setting.JwtSecret)

// CreateToken 创建 token
func CreateToken(userId string) (string, error) {
	// token 过期时间
	expires := time.Now().Add(TokenExpireDuration)

	// 声明 token
	claims := Claims{
		userId,
		expires,
		jwt.MapClaims{
			"user_id": userId,
		},
	}

	// 生成 token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// 编码 token
	enToken, err := token.SignedString(jwtSecret)

	return enToken, err
}

// ParseToken 解析 token
func ParseToken(token string) (*Claims, error) {
	tokenClaims, err := jwt.ParseWithClaims(token, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if tokenClaims != nil {
		if claims, ok := tokenClaims.Claims.(*Claims); ok && tokenClaims.Valid {
			return claims, nil
		}
	}

	return nil, err
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
