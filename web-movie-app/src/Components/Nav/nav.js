import { Search } from "../Search/search";
import useUser from "../../Hooks/useUser";
import './nav.css'

import {
    Link
} from "react-router-dom";

export const Nav = () => {
    const { logout, isLogged } = useUser()

    const handleClick = (e) => {
        e.preventDefault()
        logout()
    }

    const RenderLogin = () => {
        return(
            <>
                <Link to="/profile">profile</Link>
                <Link to='#' onClick={handleClick}>logout</Link>
            </>
        )
    }
    const RenderPreLogin = () => {
        return(
            <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </>
        )
    }
    return(
        <header>
            <Link to="/movie" className="logo">Home</Link>
            <input id="nav" type="checkbox"/>
            <label htmlFor="nav"></label>

            <nav className="navMenu">
                <Link to="/movie">Movies</Link>
                {isLogged ? <RenderLogin/> : <RenderPreLogin/>}
                <Search className="search"/>
            </nav>
        </header>
    )
}
