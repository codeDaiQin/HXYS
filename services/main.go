package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()
	r.Use(Cors())

	r.GET("/ping", func(c *gin.Context) {
		code := c.Query("code")
		c.JSON(200, gin.H{
			"message": code,
		})
	})
	r.Run()
}

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "*")
		c.Header("Access-Control-Allow-Methods", "*")
		c.Header("Access-control-allow-credentials", "true")
	}
}
