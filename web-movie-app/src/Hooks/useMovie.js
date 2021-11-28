import { useEffect, useState } from "react"
import { GetMovies } from "../Services/MovieServices"


export default function useMovies(){
    const [movies, setMovies] = useState([])
    
    useEffect(() => {
        GetMovies()
        .then(res => setMovies(res))
        .catch(err => console.log(err))
    },[setMovies])


    return {
        movies,
        setMovies,
    }
}

