import {useCallback, useContext, useState} from 'react';
import { loginService } from '../Services/UserServices';
import { AddFavs } from '../Services/MovieServices';
import Context from '../Context/userContext';

export default function useUser() {
    const {jwt, user, favs, setJWT, setUser, setFavs} = useContext(Context)
    const [state, setState] = useState({error: false})

    const login = useCallback( ({email, password})=> {
        setState({error: false})
        loginService({email, password})
        .then(data => {

            window.sessionStorage.setItem('jwt', data.JWT)
            window.sessionStorage.setItem('user', JSON.stringify(data.user))
            setState({error: false})
            setUser(JSON.stringify(data.user))
            setJWT(data.JWT)

        }).catch(err => {
            setState({error: true})
            console.log("error")
            window.sessionStorage.removeItem('jwt')
            window.sessionStorage.removeItem('user')
        })

    }, [setJWT, setUser, setState])

    const logout = useCallback(() => {
        setState({error: false})
        window.sessionStorage.removeItem('jwt')
        window.sessionStorage.removeItem('user')
        setJWT(null)
        setUser(null)
    },[setJWT, setUser])


    const addFav = useCallback((credentials) =>{
        console.log(credentials)
        AddFavs(jwt, credentials)
        .then(data => {
            setFavs(data)
        }).catch(err => {
            console.log(err)
        })
    },[jwt, setFavs])

    return {
        login,
        logout,
        addFav,
        isLogged: Boolean(jwt),

        state,
        setState,
        user,
        setUser,
        favs,
        setFavs,
    }
}



