import React, { useEffect, useState } from 'react';
import { GetFavs } from '../Services/MovieServices';

const Context = React.createContext({})

export function UserContextProvider({ children }) {
    const [favs, setFavs] = useState([])
    const [user, setUser] = useState({})
    const [jwt, setJWT] = useState(() => window.sessionStorage.getItem('JWT'))

    useEffect(() => {
        if(!jwt) return setFavs([])
        GetFavs(jwt)
        .then(res =>{ 
            console.log(!res)
            if(!res){
                setFavs([])
                return
            }
            setFavs(res)
            console.log(res)
        })
        .catch(err =>{ 
            console.log(err)
            setFavs([])
        }
    )}, [jwt, setFavs])

    return ( 
        <Context.Provider value = {
            {
                jwt,
                user,
                setJWT,
                setUser,
                favs,
                setFavs
            }}>
            { children } 
        </Context.Provider>
    )
}

export default Context
