package util

import (
	"HXYS/pkg/setting"
	"github.com/gin-gonic/gin"
	"github.com/unknwon/com"
)

// GetPage 分页
func GetPage(c *gin.Context) int {
	page, _ := com.StrTo(c.Query("pageSize")).Int()

	// 如果page为空或小于1，则默认为1
	if page == 0 || page < 1 {
		page = 1
	}

	// 如果page大于最大页数，则默认为最大页数
	if page > setting.PageSize {
		page = setting.PageSize
	}

	return setting.PageSize * (page - 1)
}
