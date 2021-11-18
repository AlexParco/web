import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import useUser from '../../Hooks/useUser';
import css from "./login.module.css";
import swal from 'sweetalert'

export const Login = ({onLogin}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLogged, state} = useUser()
    let history = useHistory();

    useEffect(()=> {
        if(isLogged){
            history.push(`/movie`);
            onLogin && onLogin()
        }
    },[isLogged, history, onLogin])

    const handleSubmit = (e) =>{
        e.preventDefault()
        login({email, password})
         if (state){
            console.log("Good ", state)
            swal({
                title: "Welcome",
                text: "Enjoy the most popular movies on MovieApp",
                icon: "success",
                button: "Ok",
                timer: "5000"
            })
        }else{
            console.log("Error ", state)
            swal({
                title: "Error",
                text: "Your password or email is incorrect",
                icon: "error",
                button: "Ok",
                timer: "5000"
            })
        }
    }

    return(
        <div className={css["App"]}>
            <form onSubmit={handleSubmit} className={css["form"]}>
                <img className={css["profile_img"]} src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="profile_img"/>
                <div className={css["input-container-1"]}>
                    <label htmlFor="email" className={css["label"]}>
                        Email
                        <input 
                            required
                            id="email" 
                            type="email" 
                            placeholder="Email"
                            className={css["input"]}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div className={css["input-container-2"]}>
                    <label htmlFor="password" className={css["label"]}>
                        Password
                        <input 
                            required
                            id="password" 
                            type="password" 
                            placeholder="Password" 
                            className={css["input"]}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit" className={css["sub"]}>
                    Submit
                </button>
            </form>
        </div>
    )
}
