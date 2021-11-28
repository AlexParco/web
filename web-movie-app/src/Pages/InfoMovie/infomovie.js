import { useEffect, useState } from 'react';
import { useOneMovie } from '../../Hooks/useOneMovie'
import { useHistory } from "react-router-dom";
import { Fav } from '../../Components/BtnFav/btnfav';
import { BtnComment } from '../../Components/BtnComment/btncomment';
import swal from 'sweetalert'
import css from "./infomovie.module.css";
import useUser from '../../Hooks/useUser';


export const InfoMovie = (props) => {
    const {movie, isError} = useOneMovie(props.match.params.title) 
    const [comment, setComment] = useState("")
    const { favs, isLogged } = useUser()

    let history = useHistory();

    useEffect(() => {
        favs.filter((fav) => fav.title === movie.title && setComment(fav.comment));
    },[favs,movie.title]);

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
        <>
        <div className={css["movie-page"]}>
            <div className={css["movie-page-img"]}>
                <img
                    className={css["movie-page-img"]}
                    width="100%"
                    src={"/img/"+movie.imagen}
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
            <div className={css["movie-page-interaction"]}>
                <div className={css["movie-page-comment"]}>
                    {comment}
                </div>
                <div className={css["movie-page-btn"]}>
                    {
                        isLogged ? <BtnComment title={movie.title}/> : ""
                    }
                    <Fav id={movie.id} title={movie.title}/>
                </div>
            </div>
        </div>
        </>
    )
}
