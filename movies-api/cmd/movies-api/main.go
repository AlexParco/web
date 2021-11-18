package main

import (
	"io"
	"log"
	"net/http"
	"os"

	"github.com/AlexParco/movie-Api/pkg/api/user"
	"github.com/AlexParco/movie-Api/pkg/routes"
)
var us *user.UserService

func main (){

    r := routes.Routes()

    http.ListenAndServe(":8888", r)
}


func FileUpload(w http.ResponseWriter, r *http.Request) {

    if err := r.ParseMultipartForm(32 << 20); err != nil {
        log.Fatalf("memory error: %v", err)
    }

	file, handler, err := r.FormFile("file")

    if err != nil{ 
        log.Fatalf("error: %v", err)
    }
    defer file.Close()


	f, err := os.OpenFile("/home/alex/code/code-go/movies-api/pics/"+handler.Filename, os.O_WRONLY|os.O_CREATE, 0666)

	if err != nil {
        log.Fatalf("error: %v", err)
	}

	defer f.Close()

	io.Copy(f, file)

    w.Write([]byte(handler.Filename))
}

