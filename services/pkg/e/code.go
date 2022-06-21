package e

const (
	SUCCESS        = 200 // 成功
	ERROR          = 500 // 错误
	INVALID_PARAMS = 400 // 参数错误

	ERROR_NOT_EXIST_USER   = 10001 // 用户不存在
	ERROR_ADD_USER_FAIL    = 10002 // 新建用户失败
	ERROR_NOT_EXIST_OPENID = 10003 // openid不存在

	ERROR_NOT_EXIST_ORDER = 11001 // 订单不存在
	ERROR_NOT_EXIST_GOODS = 12001 // 商品不存在

	ERROR_AUTH_CHECK_TOKEN_FAIL    = 20001 // token鉴权失败
	ERROR_AUTH_CHECK_TOKEN_TIMEOUT = 20002 // token鉴权超时
	ERROR_AUTH_TOKEN               = 20003 // token生成失败
	ERROR_AUTH                     = 20004 // token错误
)
