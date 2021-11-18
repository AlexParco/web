import React, { useState } from 'react';
import useUser from '../../Hooks/useUser';
import Modal from '../Modal/modal'

import { Login } from "../../Pages/Login/login";
import css from "./btnfav.module.css";

export const Fav = ({id, comment="", title}) =>{
    const {isLogged, addFav, favs} = useUser()
    const [showModal, setShowModal] = useState(false);

    console.log(favs)
    let favArrayTitles = favs.map((item) => {return item.title})
    
    const isFaved = favArrayTitles.some(e => e === title)

    const handleClick = () => {
        if (!isLogged) {
            return setShowModal(true)
        };
        addFav({movie_id: id, comment});
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleLogin = () => {
        setShowModal(false);
    };

    const [emoji] = isFaved
        ? [ "❌"]
        : [ "❤️"];

    return(
        <>
            <button className={css["fav"]} onClick={handleClick}>
                <span role="img">
                  {emoji}
                </span>
            </button>
            {showModal && (
                <Modal onClose={handleClose}>
                  <Login onLogin={handleLogin} />
                </Modal>
            )}
        </>
    )
}

