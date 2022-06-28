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
	Id               int    `gorm:"primary_key;AUTO_INCREMENT" json:"id"`
	OpenId           string `json:"open_id"`            // 微信openId
	DefaultAddressId int    `json:"default_address_id"` // 默认地址id
	Name             string `json:"name"`               // 用户名
}

const TableName = "HXYS_user"

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

// GetUserInfoByIndex 索引获取用户信息
func GetUserInfoByIndex(userIndex int) (userinfo *User, err error) {
	// 在user表查询用户信息
	err = libs.Db.Table(TableName).Where(User{Id: userIndex}).First(&userinfo).Error
	return userinfo, err
}

// GetUserInfoByOpenId openId获取用户信息
func GetUserInfoByOpenId(openid string) (userinfo *User, err error) {
	// 在user表查询用户信息
	err = libs.Db.Table(TableName).Where(User{OpenId: openid}).First(&userinfo).Error
	return
}

// AddUser 注册用户
func AddUser(openid string) (err error) {
	err = libs.Db.Table(TableName).Create(&User{OpenId: openid}).Error
	return
}

// CheckUser 检查用户是否存在
func CheckUser(openid string) bool {
	var user User
	err := libs.Db.Table(TableName).Select("user_id").Where(User{OpenId: openid}).First(&user).Error
	if err != nil {
		return false
	}
	return true
}

// UpdateUserInfo 更新用户信息
func UpdateUserInfo(userId int, maps interface{}) (err error) {
	err = libs.Db.Table(TableName).Where("id = ?", userId).Updates(maps).Error
	return
}
