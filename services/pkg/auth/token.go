package auth

import (
	"HXYS/libs"
	"HXYS/models/user"
	"HXYS/pkg/setting"
	"context"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"time"
)

type Claims struct {
	OpenId  string `json:"open_id"`
	Expires time.Time
	jwt.MapClaims
}

// TokenExpireDuration token 过期时间 默认为 30 天
const TokenExpireDuration = time.Hour * 24 * 30

// ctx context.Background()
var ctx = context.Background()

// jwtSecret jwt 密钥
var jwtSecret = []byte(setting.JwtSecret)

// CreateToken 创建 token
func CreateToken(openId string) (string, error) {
	// token 过期时间
	expires := time.Now().Add(TokenExpireDuration)

	// 声明 token
	claims := Claims{
		openId,
		expires,
		jwt.MapClaims{
			"open_id": openId,
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

// SaveToken 保存 token
func SaveToken(token string, userInfo *user.User) (err error) {
	// 存储到 redis
	err = libs.RedisClient.Set(ctx, token, userInfo, TokenExpireDuration).Err()
	if err != nil {
		print(err)
	}
	return err
}
