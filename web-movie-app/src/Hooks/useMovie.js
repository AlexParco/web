import { useContext, useEffect, useState } from 'react';
import MovieContext from '../Context/moviesContext';
import { GetMovies } from '../Services/MovieServices';

export const useMovie = (title = '') => {
    const {movies, setMovies} = useContext(MovieContext) 

    const [isError, setIsError] = useState(false)
    const [movie, setMovie] = useState({})

    useEffect(() => {
        GetMovies()
        .then(res => {
            setMovie(res)
            window.localStorage.setItem('lastMovie', title)
        })
    },[title])

    return movie 
}
