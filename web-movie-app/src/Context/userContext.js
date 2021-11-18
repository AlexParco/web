import React, { useEffect, useState } from 'react';
import { GetFavs } from '../Services/MovieServices';

const Context = React.createContext({})

export function UserContextProvider({ children }) {
    const [favs, setFavs] = useState([])
    const [user, setUser] = useState(() => window.sessionStorage.getItem('user'))
    const [jwt, setJWT] = useState(() => window.sessionStorage.getItem('JWT'))

    useEffect(() => {
        if (!jwt) return setFavs([])
        async function fetchData(){
            const data = await GetFavs(jwt)
            setFavs(data)
        }
        fetchData()
    }, [jwt])

    return ( 
        <Context.Provider value = {
            {
                favs,
                jwt,
                user,
                setFavs,
                setJWT,
                setUser
            }}>
            { children } 
        </Context.Provider>
    )
}

export default Context
