package main

import (
	"fmt"
	"net/http"

	"github.com/AlexParco/movie-Api/pkg/routes"
)

func main (){

    r := routes.Routes()


    fmt.Println("Server is live")

    http.ListenAndServe(":8888", r)
}

