import axios from 'axios';

const url = 'http://localhost:8888'

export const GetMovies = async() => {
    const config = {
        headers: { 'content-type': 'application/json',
        },
    }

    const { data } = await axios.get(url + "/movie", config)
    return data
}

export const GetMovie = async(title) => {
    const config = {
        headers: {
            'content-type': 'application/json',
        },
    }
    const { data } = await axios.get(url + "/movie/" + title, config)
    return data
}

export const GetFavs = async (jwt) => {
    const { data } = await axios.get(url+'/movie/fav', {headers: {Authorization: `Bearer ${jwt}`}})
    return data
}

export const AddFavs = async (jwt, credentials) => {
    const { data } = await axios.post(url+'/movie/fav', credentials, {headers: {Authorization: `Bearer ${jwt}`}})
    return data
}

export const AddMovie = async (credentials) => {
    console.log(credentials)
    const { data } = await axios.post(url+'/movie', credentials)
    return data 
}

export const DeleteMovie = async (id) => {
    const { data } = await axios.delete(url+'/movie/'+ id)
    return data 
}

export const UpdateCommentService = async (jwt, credentials) => {
    console.log(credentials)
    const { data } = await axios.put(url+'/movie/fav', credentials, {headers: {Authorization: `Bearer ${jwt}`}})
    return data
}
