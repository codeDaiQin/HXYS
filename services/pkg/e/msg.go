package e

var MsgFlags = map[int]string{
	SUCCESS:        "ok",
	ERROR:          "fail",
	INVALID_PARAMS: "请求参数错误",

	ERROR_NOT_EXIST_USER:   "用户不存在",
	ERROR_ADD_USER_FAIL:    "新建用户失败",
	ERROR_NOT_EXIST_OPENID: "openid不存在",
	ERROR_NOT_EXIST_ORDER:  "订单不存在",
	ERROR_NOT_EXIST_GOODS:  "商品不存在",

	ERROR_AUTH_CHECK_TOKEN_FAIL:    "Token鉴权失败",
	ERROR_AUTH_CHECK_TOKEN_TIMEOUT: "Token鉴权超时",
	ERROR_AUTH_TOKEN:               "Token生成失败",
	ERROR_NOT_EXIST_AUTH:           "Token不存在",
}

func GetMsg(code int) string {

	msg, ok := MsgFlags[code]
	if ok {
		return msg
	}

	return MsgFlags[ERROR]
}
