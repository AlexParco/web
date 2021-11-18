import { useEffect, useState } from 'react';
import { GetMovie } from '../Services/MovieServices';

export const useOneMovie = (title = '') => {
    const [isError, setIsError] = useState(false)
    const [movie, setMovie] = useState({})

    useEffect(() => {
        GetMovie(title)
        .then(movie => {
            setMovie(movie)
            
        }).catch(err => {
            setIsError(true)
            console.log(err)
        })
    },[title])

    return {
        movie,
        isError
    } 
}
