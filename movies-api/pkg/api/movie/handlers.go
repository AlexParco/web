package movie

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/AlexParco/movie-Api/internal/conection"
	"github.com/AlexParco/movie-Api/pkg/log"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)


var db = &MovieServices{conection.GetConection()}

func GetAllMovies(w http.ResponseWriter, r *http.Request){
    movies, err := db.Get()

    if err != nil{
        log.RespondWithError(w, http.StatusInternalServerError,"error getting movies")
        return 
    }
    
    log.RespondwithJSON(w, http.StatusCreated ,movies)
}

func GetOneMovie(w http.ResponseWriter, r *http.Request){
    title := chi.URLParam(r, "title") 
	title = strings.ReplaceAll(title, "%20", " ")
    movie, err := db.GetOne(title)

    if err !=nil {
        log.RespondWithError(w, http.StatusInternalServerError,"error getting movie")
        return 
    }
    log.RespondwithJSON(w, http.StatusCreated ,movie)
}

func GetFavsMovies(w http.ResponseWriter, r *http.Request){
    _, claims ,_ := jwtauth.FromContext(r.Context())

    userID := claims["user_id"].(string)
    fmt.Println(userID)

    movies, err := db.GetFav(userID)

    if err != nil{
        log.RespondWithError(w, http.StatusInternalServerError,"error getting fav movies")
        return 
    }

    log.RespondwithJSON(w, http.StatusOK ,movies)
}

func SaveFavMovie(w http.ResponseWriter, r *http.Request){
    var movie FavList
    _, claims ,_ := jwtauth.FromContext(r.Context())
    userID := claims["user_id"].(string)
    json.NewDecoder(r.Body).Decode(&movie)

    fmt.Println(movie)
    movie.UserId = userID
    if err := db.AddMovie(movie); err != nil{
        log.RespondWithError(w, http.StatusInternalServerError,"error getting fav movies")
        return 
    }
    
    log.RespondwithJSON(w, http.StatusCreated ,map[string]interface{}{"message":"succesful"})
}
