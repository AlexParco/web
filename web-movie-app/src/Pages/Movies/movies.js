import React, { useEffect, useState } from "react";
import { CardMovie } from '../../Components/CadMovie/cardmovie';
import { GetMovies } from "../../Services/MovieServices"
import css from "./movies.module.css";

// movies page
export const Movies = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        GetMovies()
        .then(res => setMovies(res))
    },[setMovies])

    return (
        <div className={css["movie-grid"]}>
            {
                movies.map(movie =>
                    <CardMovie
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        date={movie.release_date}
                        url={movie.imagen}
                    />
                )
            }
        </div>
    )
}
