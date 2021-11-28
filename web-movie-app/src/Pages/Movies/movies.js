import React from "react";
import { CardMovie } from '../../Components/CadMovie/cardmovie';
import useMovie from "../../Hooks/useMovie"
import css from "./movies.module.css";

// movies page
export const Movies = () => {
    const { movies } = useMovie()

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
