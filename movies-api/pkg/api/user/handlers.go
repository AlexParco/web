package user

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/AlexParco/movie-Api/internal/conection"
	"github.com/AlexParco/movie-Api/internal/services"
	log "github.com/AlexParco/movie-Api/pkg/log"
	"github.com/go-chi/jwtauth/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var db = &UserService{conection.GetConection()}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user UserCmd

	user.Id = uuid.New().String()

	json.NewDecoder(r.Body).Decode(&user)

	pswd, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.MinCost)

	user.Password = string(pswd)

	if err := db.Create(&user); err != nil {
		log.RespondWithError(w, http.StatusInternalServerError, "error creating user")
		return
	}

	log.RespondwithJSON(w, http.StatusCreated, map[string]string{"message": "successfully created"})
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	var user UserCmd

	_, claims, _ := jwtauth.FromContext(r.Context())
	user.Id = claims["user_id"].(string)

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		return
	}

	if user.Username == "" {
		if err := db.Update("profile_img", user.ProfileImg, user.Id); err != nil {
			log.RespondWithError(w, http.StatusInternalServerError, "error updating user")
			return
		}
	} else {
		if err := db.Update("username", user.Username, user.Id); err != nil {
			log.RespondWithError(w, http.StatusInternalServerError, "error updating user")
			return
		}
	}

	user, err := db.Get("id=?", user.Id)
	if err != nil {
		return
	}

	log.RespondwithJSON(w, http.StatusOK, user)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	_, claims, _ := jwtauth.FromContext(r.Context())
	userID := claims["user_id"].(string)

	if userID == "" {
		log.RespondWithError(w, http.StatusBadRequest, "error deleting user")
		return
	}

	if err := db.Delete(userID); err != nil {
		log.RespondWithError(w, http.StatusInternalServerError, "error deleting user")
		return
	}
	log.RespondwithJSON(w, http.StatusOK, map[string]string{"message": "user delete"})
}

func Login(w http.ResponseWriter, r *http.Request) {
	var userParse UserCmd
	json.NewDecoder(r.Body).Decode(&userParse)
	// get user with password encypt
	user, _ := db.Get("email=?", userParse.Email)

	token, _ := services.CreateToken("secret", user.Id)

	// compare userPassword with encrypted Password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userParse.Password)); err != nil {
		log.RespondWithError(w, http.StatusBadRequest, "incorrect password")
		return
	}

	log.RespondwithJSON(w, http.StatusOK, map[string]interface{}{"user": user, "JWT": token})
}

func FileUpload(w http.ResponseWriter, r *http.Request) {

	if err := r.ParseMultipartForm(32 << 20); err != nil {
		fmt.Printf("memory error: %v", err)
	}

	file, handler, err := r.FormFile("file")
	if err != nil {
		fmt.Printf("error: %v", err)
	}
	defer file.Close()

	f, err := os.OpenFile("C:\\code\\web\\web-movie-app\\public\\img\\"+handler.Filename, os.O_WRONLY|os.O_CREATE, 0666)

	if err != nil {
		fmt.Printf("error: %v", err)
	}

	defer f.Close()

	io.Copy(f, file)

	w.Write([]byte(handler.Filename))
}
