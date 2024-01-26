import axios from "axios";
const URI_BACKEND = 'https://honey-organized-deer.glitch.me/api'


// 'http://localhost:5000/api'
// https://honey-organized-deer.glitch.me/api

const instance = axios.create({
    baseURL: URI_BACKEND,
    withCredentials: true,
    // headers: {
    //     Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTllZGVhZWQ2Mzg4MzkwOWNjYjI4MiIsImlhdCI6MTcwNjIzMTM2NSwiZXhwIjoxNzA2MjM0OTY1fQ.cpVoZiggfhu2UP7tsH8UIZ2qo-ManpW2y46b4jmzGow',
    //   }
})

export default instance