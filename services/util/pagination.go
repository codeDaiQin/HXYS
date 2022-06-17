package util

import (
	"github.com/gin-gonic/gin"
	"github.com/unknwon/com"

	"HXYS/pkg/setting"
)

// GetPage 分页
func GetPage(c *gin.Context) int {
	result := 0
	page, _ := com.StrTo(c.Query("pageSize")).Int()
	if page > 0 {
		result = (page - 1) * setting.PageSize
	}

	return result
}
