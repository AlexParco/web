import { Search } from "../Search/search";
import useUser from "../../Hooks/useUser";
import './nav.css'

import {
    Link
} from "react-router-dom";

export const Nav = () => {
    const { logout } = useUser()

    const handleClick = (e) => {
        e.preventDefault()
        logout()
    }


    return(
        <header>
            <Link to="/" className="logo">Home</Link>
            <input id="nav" type="checkbox"/>
            <label htmlFor="nav"></label>

            <nav className="navMenu">
                <Link to='#' onClick={handleClick}>logout</Link>
                <Link to="/movie">Movies</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Search className="search"/>
            </nav>
        </header>
    )
}
