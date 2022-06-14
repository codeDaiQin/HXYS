package wechat

import (
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

func GetOpenID(appId, appSecret, code string) (string, error) {
	seesion, err := codeToSession(appId, appSecret, code)

	if err != nil {
		return "", fmt.Errorf("error: %s", err)
	}

	return seesion.Openid, nil
}

func codeToSession(appId, appSecret, code string) (*session, error) {
	url := fmt.Sprintf("https://api.weixin.qq.com/sns/jscode2session?"+
		"appid=%s&secret=%s&js_code=%s&grant_type=authorization_code", appId, appSecret, code)

	resp, err := http.NewRequest("GET", url, nil)

	if err != nil {
		return nil, fmt.Errorf("code: %s to session is err", code)
	}

	result := &session{}

	if err := json.NewDecoder(resp.Body).Decode(result); err != nil {
		return nil, fmt.Errorf("unmarshal error(%v)", err)
	}

	return result, nil
}
