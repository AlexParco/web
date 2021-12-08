import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import { registerService } from '../../Services/UserServices'
import css from "./register.module.css";
import swal from 'sweetalert'

export const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await registerService({
                username,
                email,
                password
            })
            swal({
                title: "Welcome to MovieApp",
                text: "Pleaser Login for more",
                icon: "success",
                button: "Ok",
                timer: "5000"
            })

            history.push(`/login`);
            setEmail('')
            setUsername('')
            setPassword('')
        } catch(err){
            swal({
                title: "Error",
                text: "Error creating User",
                icon: "error",
                button: "Ok",
                timer: "5000"
            })
        }
    }

    return(
        <div className={css["App"]}>
            <form className={css["form"]} onSubmit={handleSubmit} >
                <img className={css["profile_img"]} src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="profile_img" />
                <div>
                    <label className={css["label"]} >
                        Username
                        <input 
                            required 
                            type="text" 
                            placeholder="Username"
                            className={css["input"]}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div className={css["input-container"]}>
                    <label className={css["label"]}>
                        Email
                        <input 
                            required 
                            type="email" 
                            placeholder="Email"
                            className={css["input"]}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div className={css["input-container"]}>
                    <label className={css["label"]}>
                        Password
                        <input 
                            required 
                            type="password" 
                            placeholder="Password" 
                            className={css["input"]}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button className={css["sub"]} variant="primary" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}
