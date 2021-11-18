package movie

import (
	"database/sql"
)

type FavList struct{
    UserId      string `json:"user_id"`
    MovieId      string `json:"movie_id"`
    Comment      string `json:"comment"`
}

type FavMovie struct{
	Id          string `json:"id"`
	Title       string `json:"title"`
	ReleaseDate string `json:"release_date"`
	Genre       string `json:"genre"`
	Imagen      string `json:"imagen"`
    Comment     string `json:"comment"`
}

type MovieCMD struct{
	Id          string `json:"id"`
	Title       string `json:"title"`
	Cast        string `json:"cast"`
	ReleaseDate string `json:"release_date"`
	Genre       string `json:"genre"`
	Description string `json:"description"`
	Director    string `json:"director"`
	Imagen      string `json:"imagen"`
}


type MovieServices struct{
    *sql.DB
}

func (m *MovieServices) Get() ([]MovieCMD, error){
    var movies []MovieCMD

    query := `SELECT * FROM movie`

    rows, err := m.Query(query)
    if err != nil{
        return nil, err
    }

    for rows.Next(){
        var m MovieCMD
		if err := rows.Scan(&m.Id, &m.Title, &m.Cast, &m.ReleaseDate, &m.Genre, &m.Description, &m.Director, &m.Imagen); err != nil{
            return nil, err
        }
        movies = append(movies, m)
    }
    return movies, nil
}

func (m *MovieServices) GetOne(movieTitle string) (MovieCMD, error){
    var movie MovieCMD

    query := `SELECT * FROM movie WHERE title=?`
    err := m.QueryRow(query, movieTitle).Scan(&movie.Id, &movie.Title, &movie.Cast, &movie.ReleaseDate, &movie.Genre, &movie.Description, &movie.Director, &movie.Imagen)

    if err != nil {
        return movie, err
    }

    return movie, nil
}

func (m *MovieServices) GetFav(userID string) ([]FavMovie, error){
    var FavMovies []FavMovie

    query := `SELECT * FROM vista_fav_movie WHERE id=?;`

    rows, err := m.Query(query, userID)
    if err != nil {
        return nil, err
    }

	for rows.Next() {
		var movie FavMovie
		if err := rows.Scan(&movie.Id, &movie.Title, &movie.ReleaseDate, &movie.Genre, &movie.Imagen, &movie.Comment); err != nil {
			return nil, err
		}
		FavMovies = append(FavMovies, movie)
	}
    return FavMovies, nil
}

func (m *MovieServices) AddMovie(movie FavList) error {
	query := `INSERT INTO fav_movie (user_id, movie_id, comment) VALUES (?, ?, ?)`
	_, err := m.Exec(query, movie.UserId, movie.MovieId, movie.Comment)

	if err != nil {
		return err
	}
	return nil
}

