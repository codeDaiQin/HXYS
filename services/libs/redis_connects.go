package libs

import (
	"HXYS/pkg/setting"
	"github.com/go-redis/redis/v9"
	"log"
)

var RedisClient *redis.Client

// redis_connects.go

func init() {
	sec, err := setting.Cfg.GetSection("redis")
	if err != nil {
		log.Fatal(2, "Fail to get section 'redis': %v", err)
	}

	host := sec.Key("HOST").String()
	password := sec.Key("PASSWORD").String()

	RedisClient = redis.NewClient(&redis.Options{
		Addr:     host,
		Password: password, // no password set
		DB:       0,        // use default DB
	})
}
