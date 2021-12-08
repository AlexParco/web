import {useCallback, useContext, useState} from 'react';
import { loginService, profileService, uploadImgService } from '../Services/UserServices';
import { AddFavs, UpdateCommentService } from '../Services/MovieServices';
import Context from '../Context/userContext';

export default function useUser() {
    const {jwt, user, setJWT, setUser, favs, setFavs} = useContext(Context)
    const [state, setState] = useState({error: false})

    const login = useCallback( ({email, password})=> {
        setState({error: false})
        loginService({email, password})
        .then(data => {

            window.sessionStorage.setItem('jwt', data.JWT)
            setState({error: false})
            setUser(data.user)
            setJWT(data.JWT)

        }).catch(err => {
            setState({error: true})
            console.log(err)
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
        })
    },[jwt, setFavs])

    const uploadImg = (img) => {
        uploadImgService(img)
        .catch(err => console.log(err))
    }

    const updateProfile = useCallback((credentials) => {
        profileService(credentials, jwt)
        .then(res => setUser(res))
        .catch(err => console.log(err))
    },[jwt, setUser])

    const updateComment = useCallback((credentials) => {
        UpdateCommentService(jwt, credentials)
        .then(res => setFavs(res))
        .catch(err => console.log(err))
    },[setFavs, jwt])
    
    return {
        login,
        logout,
        addFav,
        updateProfile,
        uploadImg,
        isLogged: Boolean(jwt),

        state,
        setState,
        user: user,
        setUser,
        favs,
        setFavs,
        updateComment
    }
}


