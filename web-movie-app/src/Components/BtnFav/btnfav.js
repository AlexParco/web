import React, { useEffect, useState } from 'react';
import useUser from '../../Hooks/useUser';
import { useHistory } from "react-router-dom";

import css from "./btnfav.module.css";
import swal from 'sweetalert';

export const Fav = ({id, comment="Add comment for this movie", title}) =>{
    const { isLogged, addFav, favs } = useUser()
    let history = useHistory();
    const [emoji, setEmoji] = useState("❤️");

    const handleClick = () => {
        if (!isLogged) {
            swal({
                title: "Warning",
                text: "You need login for add to favs",
                icon: "warning",
                button: "Ok",
                timer: "2000"
            })
            history.push("/login")
        };
        addFav({movie_id: id, comment});
    };

    useEffect(() => {
        favs.filter((fav) => fav.title === title && setEmoji("❌"));
    },[title, favs]);

    return(
        <button className={css["fav"]} onClick={handleClick}>
            {emoji}
        </button>
    )
}
