package routes

import (
	"net/http"

	"github.com/AlexParco/movie-Api/pkg/api/movie"
	"github.com/AlexParco/movie-Api/pkg/api/user"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth/v5"
)


func SetUserRoutes(r *chi.Mux) *chi.Mux{

    // public routes
    r.Post("/login", user.Login)
    r.Post("/register", user.CreateUser)

    r.Route("/user",func(r chi.Router){

        // JWT middleware
        r.Use(jwtauth.Verifier(jwtauth.New("HS256", []byte("secret"), nil)))
        r.Use(jwtauth.Authenticator)

        // private routes
        r.Route("/config", func(r chi.Router){
            r.Delete("/", user.DeleteUser)
            r.Put("/", user.UpdateUser)
        })
    })


    return r
}


func Routes() http.Handler{
    r := chi.NewRouter() 

    r.Use(cors.Handler(cors.Options{
        AllowedOrigins:   []string{"http://localhost:3000"},
        AllowCredentials: true,
        AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
        MaxAge:           300, 
    }))

    r.Route("/movie", func(r chi.Router){
        r.Get("/", movie.GetAllMovies)
        r.Get("/{title}", movie.GetOneMovie)


        r.Route("/fav", func(r chi.Router){
            r.Use(jwtauth.Verifier(jwtauth.New("HS256", []byte("secret"), nil)))
            r.Use(jwtauth.Authenticator)

            r.Get("/admin", func(w http.ResponseWriter, r *http.Request) {
                _, claims, _ := jwtauth.FromContext(r.Context())
                w.Write([]byte(claims["user_id"].(string)))
            })
            r.Get("/", movie.GetFavsMovies)
            r.Post("/", movie.SaveFavMovie)
        })
    })

    r = SetUserRoutes(r)

    return r
}


















// func SetMovieRoute(r *chi.Mux) *chi.Mux{
//     r.Route("/movie", func(r chi.Router){
//         // public routes
//         r.Get("/", movie.GetAllMovies)
//         r.Get("/{title}", movie.GetOneMovie)
// 
// 
//         r.Route("/fav", func(r chi.Router){
//             r.Use(jwtauth.Verifier(jwtauth.New("HS256", []byte("secret"), nil)))
//             r.Use(jwtauth.Authenticator)
// 
//             r.Get("/", movie.GetFavsMovies)
//             r.Post("/", movie.SaveFavMovie)
//         })
//     })
//     return r
// }
