import axios from "axios";
const URI_BACKEND = 'https://honey-organized-deer.glitch.me/api'

// 

const instance = axios.create({
    baseURL: URI_BACKEND,
    withCredentials: true
})

export default instance