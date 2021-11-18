import React from 'react'
import { Link } from "react-router-dom";
import css from "./cardmovie.module.css";
import { Fav } from  "../BtnFav/btnfav";


export const CardMovie = (props) => {
    return (
        <div className={css["movie-card"]}>
            <div className={css["movie-card-btn"]}>
                <Fav id={props.id} title={props.title}/>
            </div>
            <Link to={"/movie/" + props.title} className="movie_link text-decoration-none">
                <div className={css["movie-card-img"]}>
                    <img width="100%" src={props.url} alt={props.title} />
                </div>
                <div className={css["movie-card-body"]}>
                    <h2>
                        {props.title}
                    </h2>
                    <p>{props.date}</p>
                </div>
            </Link>
        </div>
    )
}


