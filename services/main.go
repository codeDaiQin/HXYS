package main

import (
	"HXYS/pkg/setting"
	"HXYS/routers"
	"fmt"
	"net/http"

	"HXYS/conf"
)

func main() {
	// 初始化配置
	conf.Init()
	router := routers.InitRouter()

	s := &http.Server{
		Addr:           fmt.Sprintf(":%d", setting.HTTPPort),
		Handler:        router,
		ReadTimeout:    setting.ReadTimeout,
		WriteTimeout:   setting.WriteTimeout,
		MaxHeaderBytes: 1 << 20,
	}

	s.ListenAndServe()
}
