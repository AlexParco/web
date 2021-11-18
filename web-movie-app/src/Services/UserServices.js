import axios from 'axios';
const url = 'http://localhost:8888';

export const loginService = async (credentials) => {
    const data = await axios.post(url+'/login', credentials, {withCredentials: true})
    return data.data
}


export const registerService = async (credential) => {
    await axios.post(url+'/register', credential, {withCredentials: true})
}
