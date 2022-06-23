package routers

import (
	"HXYS/models/user"
	"HXYS/pkg/auth"
	"HXYS/pkg/e"
	"github.com/astaxie/beego/validation"
	"github.com/gin-gonic/gin"
	"log"
)

type Auth struct {
	UserId string `valid:"Required; MaxSize(50)"`
}

func GetAuth(c *gin.Context) {
	userId := c.Query("user_id")
	valid := validation.Validation{}
	ok, _ := valid.Valid(Auth{UserId: userId})

	data := make(map[string]interface{})
	code := e.INVALID_PARAMS
	if ok {
		isExist := user.CheckUser(userId) // 检查用户是否存在
		if isExist {                      // 如果用户存在
			token, err := auth.CreateToken(userId)
			if err != nil {
				code = e.ERROR_AUTH_TOKEN
			} else {
				data["data"] = token // 返回 token
				code = e.SUCCESS
			}
		} else {
			code = e.ERROR_NOT_EXIST_USER // 用户不存在
		}
	} else {
		for _, err := range valid.Errors {
			log.Println(err.Key, err.Message)
		}
	}

	c.JSON(code, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": data,
	})
}
