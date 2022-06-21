package v1

import (
	"HXYS/models/address"
	"HXYS/pkg/e"
	"net/http"

	"github.com/gin-gonic/gin"
)

type RequestType struct {
}

// GetAddressList 获取地址列表
func GetAddressList(c *gin.Context) {
	list, err := address.GetAddressList()
	if err != nil {
		c.JSON(400, gin.H{
			"code": e.ERROR,
			"msg":  e.GetMsg(e.ERROR),
		})
		return
	}

	data := make(map[string]interface{})
	data["list"] = list
	data["total"] = address.GetAddressTotal()

	c.JSON(http.StatusOK, gin.H{
		"code": e.SUCCESS,
		"msg":  e.GetMsg(e.SUCCESS),
		"data": data,
	})
}

// EditAddress 更新地址
func EditAddress(c *gin.Context) {

}

// AddAddress 新增地址
func AddAddress(c *gin.Context) {
	var requestData address.Address
	c.BindJSON(&requestData)
	// 获取参数
	consignee := requestData.Consignee
	detailed := requestData.Detailed
	phone := requestData.Phone

	// 校验参数
	if detailed == "" || consignee == "" || phone == "" {
		c.JSON(400, gin.H{
			"code": e.INVALID_PARAMS,
			"msg":  e.GetMsg(e.INVALID_PARAMS),
		})
		return
	}

	if err := address.AddAddress(detailed, consignee, phone); err != nil {
		c.JSON(400, gin.H{
			"code": e.ERROR,
			"msg":  e.GetMsg(e.ERROR),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": e.SUCCESS,
		"msg":  e.GetMsg(e.SUCCESS),
	})
}

// DeleteAddress 删除地址
func DeleteAddress(c *gin.Context) {

}
