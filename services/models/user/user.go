package user

import (
	"HXYS/libs"
	"encoding/json"
	"fmt"
	"net/http"
)

type session struct {
	Openid     string `json:"openid"`      // 用户唯一标识
	SessionKey string `json:"session_key"` // 回话密钥
	Unionid    string `json:"unionid"`     // 在开放平台的唯一标识
	Errcode    int    `json:"errcode"`     // 错误码
	Errmsg     string `json:"errmsg"`      // 错误信息
}

type User struct {
	UserId string `json:"user_id"`
}

// CodeToSession 获取session
func CodeToSession(appId, appSecret, code string) (*session, error) {
	//生成client
	client := &http.Client{}

	url := fmt.Sprintf("https://api.weixin.qq.com/sns/jscode2session?"+
		"appid=%s&secret=%s&js_code=%s&grant_type=authorization_code", appId, appSecret, code)

	// 创建请求
	req, err := http.NewRequest("GET", url, nil)

	if err != nil {
		return nil, fmt.Errorf("code: %s to session is err", code)
	}

	// 发送请求 并 处理返回结果
	response, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("app(%s) code(%s) to session error(%v)", appId, code, err)
	}

	// 关闭连接
	defer response.Body.Close()

	result := &session{}

	// 解析返回结果
	if err := json.NewDecoder(response.Body).Decode(result); err != nil {
		return nil, fmt.Errorf("unmarshal error(%v)", err)
	}

	return result, nil
}

// GetUserInfo 获取用户信息
func GetUserInfo(openid string) (userinfo *User, err error) {
	err = libs.Db.Where("user_id = ?", openid).First(&userinfo).Error
	return
}

// AddUser 注册用户
func AddUser(openid string) (err error) {
	err = libs.Db.Create(&User{UserId: openid}).Error
	return
}
