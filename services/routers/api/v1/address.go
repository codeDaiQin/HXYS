package v1

import (
	"HXYS/models/address"
	"HXYS/pkg/e"
	"net/http"

	"github.com/astaxie/beego/validation"
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

	valid := validation.Validation{}
	valid.Required(detailed, "detailed").Message("地址不能为空")
	valid.MaxSize(detailed, 100, "detailed").Message("地址最长为100字符")
	valid.Required(consignee, "consignee").Message("收货人不能为空")
	valid.MaxSize(consignee, 64, "consignee").Message("创建人最长为100字符")
	valid.Required(phone, "phone").Message("手机号不能为空")
	valid.MaxSize(phone, 11, "phone").Message("手机号长度为11字符")
	valid.MinSize(phone, 11, "phone").Message("手机号长度为11字符")

	code := e.SUCCESS

	if valid.HasErrors() {
		code = e.INVALID_PARAMS
		c.JSON(400, gin.H{
			"code": code,
			"msg":  e.GetMsg(code),
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
