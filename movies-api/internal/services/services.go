package services

import (
	"time"

	"github.com/go-chi/jwtauth/v5"
)

func CreateToken(key,id string) (string, *jwtauth.JWTAuth) {
    tokenAuth := jwtauth.New("HS256",[]byte(key), nil)

    _, token, _ := tokenAuth.Encode(map[string]interface{}{"user_id": id, "exp": time.Now().Add(time.Minute * 24).Unix()}) 

    return token, tokenAuth
}
