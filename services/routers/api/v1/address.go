package v1

import (
	"HXYS/models/address"
	"HXYS/models/user"
	"HXYS/pkg/auth"
	"HXYS/pkg/e"
	"net/http"
	"strconv"

	"github.com/astaxie/beego/validation"
	"github.com/gin-gonic/gin"
)

// GetAddressList 获取地址列表
func GetAddressList(c *gin.Context) {
	// 生成uuid
	//uuid, err := util.GeneratorUUID()
	//if err != nil {
	//	c.JSON(400, gin.H{
	//		"code": e.ERROR,
	//		"msg":  e.GetMsg(e.ERROR),
	//	})
	//	return
	//}
	// 获取 token
	token := c.GetHeader("Authorization")
	// 获取 userId
	tokenClaims, err := auth.ParseToken(token)
	if err != nil {
		c.JSON(401, gin.H{
			"code": e.ERROR_AUTH_CHECK_TOKEN_FAIL,
			"msg":  e.GetMsg(e.ERROR_AUTH_CHECK_TOKEN_FAIL),
		})
		return
	}

	// 获取用户信息
	userInfo, err := user.GetUserInfoByOpenId(tokenClaims.OpenId)
	if err != nil {
		c.JSON(400, gin.H{
			"code": e.ERROR_NOT_EXIST_USER,
			"msg":  e.GetMsg(e.ERROR_NOT_EXIST_USER),
		})
		return
	}

	// 获取地址列表
	maps := make(map[string]interface{})
	maps["user_id"] = userInfo.Id
	list, err := address.GetAddressList(maps)
	if err != nil {
		c.JSON(400, gin.H{
			"code": e.ERROR,
			"msg":  e.GetMsg(e.ERROR),
		})
		return
	}

	for i := range list {
		// 判断是否是当前用户的默认地址
		if userInfo.DefaultAddressId == list[i].AddressId {
			list[i].IsDefault = true
		}
	}

	data := make(map[string]interface{})
	data["list"] = list
	data["total"] = address.GetAddressTotal(maps)

	c.JSON(http.StatusOK, gin.H{
		"code": e.SUCCESS,
		"msg":  e.GetMsg(e.SUCCESS),
		"data": data,
	})
}

// EditAddress 更新地址
func EditAddress(c *gin.Context) {
	var requestData address.Address
	c.BindJSON(&requestData)
	// 获取参数
	consignee := requestData.Consignee
	detailed := requestData.Detailed
	phone := requestData.Phone
	isDefault := requestData.IsDefault
	addressId, err := strconv.Atoi(c.Param("address_id"))
	if err != nil {
		c.JSON(400, gin.H{
			"code": e.INVALID_PARAMS,
			"msg":  e.GetMsg(e.INVALID_PARAMS),
		})
		return
	}
	valid := validation.Validation{}

	valid.Required(addressId, "address_id").Message("address_id不能为空")
	valid.Required(consignee, "consignee").Message("收货人不能为空")
	valid.Required(detailed, "detailed").Message("地址不能为空")
	valid.MaxSize(detailed, 100, "detailed").Message("地址最长为100字符")
	valid.Length(phone, 11, "phone").Message("手机号长度为11字符")

	// 验证参数
	if valid.HasErrors() {
		c.JSON(400, gin.H{
			"code": e.INVALID_PARAMS,
			"msg":  e.GetMsg(e.INVALID_PARAMS),
		})
		return
	}

	// 获取 token
	token := c.GetHeader("Authorization")
	// 获取 userId
	tokenClaims, err := auth.ParseToken(token)
	if err != nil {
		c.JSON(401, gin.H{
			"code": e.ERROR_AUTH_CHECK_TOKEN_FAIL,
			"msg":  e.GetMsg(e.ERROR_AUTH_CHECK_TOKEN_FAIL),
		})
		return
	}
	userInfo, err := user.GetUserInfoByOpenId(tokenClaims.OpenId)
	if err != nil {
		c.JSON(400, gin.H{
			"code": e.ERROR_NOT_EXIST_USER,
			"msg":  e.GetMsg(e.ERROR_NOT_EXIST_USER),
		})
		return
	}

	// 更新default_address_id
	maps := make(map[string]interface{})
	maps["is_default"] = isDefault
	// 相同则不更新
	if addressId != userInfo.DefaultAddressId {
		if err := user.UpdateUserInfo(userInfo.Id, maps); err != nil {
			c.JSON(400, gin.H{
				"code": e.UPDATE_ADDRESS_FAIL,
				"msg":  e.GetMsg(e.UPDATE_ADDRESS_FAIL),
			})
			return
		}
	}

	maps["consignee"] = consignee
	maps["detailed"] = detailed
	maps["phone"] = phone

	// 更新地址
	if err := address.EditAddress(addressId, maps); err != nil {
		c.JSON(400, gin.H{
			"code": e.INVALID_PARAMS,
			"msg":  e.GetMsg(e.INVALID_PARAMS),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": e.SUCCESS,
		"msg":  e.GetMsg(e.SUCCESS),
	})
}

// AddAddress 新增地址
func AddAddress(c *gin.Context) {
	var requestData address.Address
	c.BindJSON(&requestData)
	// 获取参数
	consignee := requestData.Consignee
	detailed := requestData.Detailed
	phone := requestData.Phone
	// 验证参数
	valid := validation.Validation{}
	valid.Required(detailed, "detailed").Message("地址不能为空")
	valid.MaxSize(detailed, 100, "detailed").Message("地址最长为100字符")
	valid.Required(consignee, "consignee").Message("收货人不能为空")
	valid.MaxSize(consignee, 64, "consignee").Message("创建人最长为100字符")
	valid.Required(phone, "phone").Message("手机号不能为空")
	valid.Length(phone, 11, "phone").Message("手机号长度为11字符")
	if valid.HasErrors() {
		c.JSON(400, gin.H{
			"code": e.INVALID_PARAMS,
			"msg":  e.GetMsg(e.INVALID_PARAMS),
		})
		return
	}

	if err := address.AddAddress(detailed, consignee, phone); err != nil {
		c.JSON(400, gin.H{
			"code": e.ADD_GOODS_FAIL,
			"msg":  e.GetMsg(e.ADD_GOODS_FAIL),
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
	addressId, _ := strconv.Atoi(c.Param("address_id"))
	valid := validation.Validation{}
	valid.Required(addressId, "address_id").Message("address_id不能为空")
	valid.MaxSize(addressId, 10, "address_id").Message("address_id最长为10字符")
	if valid.HasErrors() {
		c.JSON(400, gin.H{
			"code": e.INVALID_PARAMS,
			"msg":  e.GetMsg(e.INVALID_PARAMS),
		})
		return
	}

	if err := address.DeleteAddress(addressId); err != nil {
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
