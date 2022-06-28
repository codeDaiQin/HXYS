package routers

import (
	"HXYS/models/user"
	"HXYS/pkg/auth"
	"HXYS/pkg/e"
	"github.com/astaxie/beego/validation"
	"github.com/gin-gonic/gin"
	"log"
)

func GetAuth(c *gin.Context) {
	openId := c.Query("open_id")
	valid := validation.Validation{}
	valid.Required(openId, "open_id").Message("open_id不能为空")
	valid.Length(openId, 28, "open_id").Message("open_id最长为28字符")

	data := make(map[string]interface{})
	code := e.INVALID_PARAMS
	if valid.HasErrors() {
		for _, err := range valid.Errors {
			log.Println(err.Key, err.Message)
		}
	} else {
		_, err := user.GetUserInfoByOpenId(openId) // 检查用户是否存在
		if err != nil {                            // 如果用户存在
			token, err := auth.CreateToken(openId)
			if err != nil {
				code = e.ERROR_AUTH_TOKEN
			} else {
				data["data"] = token // 返回 token
				code = e.SUCCESS
			}
		} else {
			code = e.ERROR_NOT_EXIST_USER // 用户不存在
		}
	}

	c.JSON(code, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": data,
	})
}
