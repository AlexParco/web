import { useOneMovie } from '../../Hooks/useOneMovie'
import swal from 'sweetalert'
import css from "./infomovie.module.css";
import { useHistory } from "react-router-dom";

export const InfoMovie = (props) => {
    const {movie, isError} = useOneMovie(props.match.params.title) 
    let history = useHistory();

    if(isError){
        swal({
            title: "Error",
            text: "Movie Not Found",
            icon: "error",
            button: "Ok",
            timer: "5000"
        })
        history.push('/movie')
    }

    return (
        <div className={css["movie-page"]}>
            <div className={css["movie-page-img"]}>
                <img
                    className={css["movie-page-img"]}
                    width="100%"
                    src={movie.imagen}
                    alt={movie.title}
                />
            </div>
            <div className={css["movie-page-info"]}>
                <h2 className="fw-bold">{movie.title}</h2>
                <span>{movie.release_date}   {movie.genre}</span>
                <h2 className="fw-bold">Overview</h2>

                <span>{movie.description}</span>

                <h3 className="fw-bold">Cast</h3>
                <span>{movie.cast}</span>
                <h3 className="fw-bold">Director</h3>
                <span>{movie.director}</span>
            </div>
        </div>
    )
}
