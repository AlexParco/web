package user

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/AlexParco/movie-Api/internal/conection"
	"github.com/AlexParco/movie-Api/internal/services"
	log "github.com/AlexParco/movie-Api/pkg/log"
	"github.com/go-chi/jwtauth/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var db = &UserService{conection.GetConection()}

func CreateUser(w http.ResponseWriter, r *http.Request){
    var user UserCmd

    user.Id = uuid.New().String()

    json.NewDecoder(r.Body).Decode(&user)

    pswd, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.MinCost)

    user.Password = string(pswd)

    if err := db.Create(&user); err != nil {
        log.RespondWithError(w, http.StatusInternalServerError,"error creating user")
        return 
    }

    log.RespondwithJSON(w, http.StatusCreated ,map[string]string{"message": "successfully created"})
}

func UpdateUser(w http.ResponseWriter, r *http.Request){
    var user UserCmd

    _, claims ,_ := jwtauth.FromContext(r.Context())
    user.Id = claims["user_id"].(string)

    json.NewDecoder(r.Body).Decode(&user)
    
    if user.Username == ""{
        if err := db.Update("profile_img", user.ProfileImg, user.Id);err != nil {
            log.RespondWithError(w, http.StatusInternalServerError,"error updating user")
            return 
        }
    }else{
        if err := db.Update("username", user.Username, user.Id);err != nil {
            log.RespondWithError(w, http.StatusInternalServerError,"error updating user")
            return  
        }
    }
    log.RespondwithJSON(w, http.StatusOK ,map[string]string{"message": "update successful"})
}


func DeleteUser(w http.ResponseWriter, r *http.Request){
    _, claims ,_ := jwtauth.FromContext(r.Context())
    userID := claims["user_id"].(string)

    if userID == ""{
        log.RespondWithError(w, http.StatusBadRequest,"error deleting user")
        return 
    }

    if err := db.Delete(userID); err != nil {
        log.RespondWithError(w, http.StatusInternalServerError,"error deleting user")
        return
    }
    log.RespondwithJSON(w, http.StatusOK ,map[string]string{"message": "user delete"})
}

func Login(w http.ResponseWriter, r *http.Request){
    var userParse UserCmd
    json.NewDecoder(r.Body).Decode(&userParse)
    // get user with password encypt
    user, _ := db.Get("email=?", userParse.Email)
    fmt.Println(userParse)

    token, _ := services.CreateToken("secret", user.Id)
    // compare userPassword with encrypted Password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userParse.Password)); err != nil {
        log.RespondWithError(w, http.StatusBadRequest,"incorrect password")
        return
	}

    log.RespondwithJSON(w, http.StatusOK ,map[string]interface{}{"user": user, "JWT": token})
}

// value and value elements in struc literal
