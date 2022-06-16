package main

import (
	"HXYS/pkg/setting"
	"HXYS/routers"
	"fmt"
	"net/http"

	"HXYS/conf"

	"github.com/gin-gonic/gin"
)

func main() {
	// 初始化配置
	conf.Init()
	router := routers.InitRouter()
	router.Use(Cors())

	s := &http.Server{
		Addr:           fmt.Sprintf(":%d", setting.HTTPPort),
		Handler:        router,
		ReadTimeout:    setting.ReadTimeout,
		WriteTimeout:   setting.WriteTimeout,
		MaxHeaderBytes: 1 << 20,
	}

	s.ListenAndServe()
}

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "*")
		c.Header("Access-Control-Allow-Methods", "*")
		c.Header("Access-control-allow-credentials", "true")
	}
}
