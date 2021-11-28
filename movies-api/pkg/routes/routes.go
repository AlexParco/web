package routes

import (
	"net/http"

	"github.com/AlexParco/movie-Api/pkg/api/movie"
	"github.com/AlexParco/movie-Api/pkg/api/user"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth/v5"
)

func SetUserRoutes(r *chi.Mux) *chi.Mux {
	// public routes
	r.Post("/login", user.Login)
	r.Post("/register", user.CreateUser)

	r.Route("/user", func(r chi.Router) {

		// JWT middleware
		r.Use(jwtauth.Verifier(jwtauth.New("HS256", []byte("secret"), nil)))
		r.Use(jwtauth.Authenticator)

		// private routes
		r.Route("/config", func(r chi.Router) {
			r.Delete("/", user.DeleteUser)
			r.Put("/", user.UpdateUser)
		})
	})

	return r
}

func Routes() http.Handler {
	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:3001"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "DELETE", "PUT"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		MaxAge:           300,
	}))

    r.Post("/img", user.FileUpload)

	r.Route("/movie", func(r chi.Router) {
		r.Get("/", movie.GetAllMovies)
        r.Post("/", movie.SaveMovie)
        r.Delete("/{id}", movie.DeleteMovie)
		r.Get("/{title}", movie.GetOneMovie)

		r.Route("/fav", func(r chi.Router) {
			r.Use(jwtauth.Verifier(jwtauth.New("HS256", []byte("secret"), nil)))
			r.Use(jwtauth.Authenticator)

			r.Post("/", movie.SaveFavMovie)
			r.Put("/", movie.UpdateComment)
			r.Get("/", movie.GetFavsMovies)
		})
	})

	r = SetUserRoutes(r)

	return r
}
