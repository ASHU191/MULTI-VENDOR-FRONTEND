import axios from 'axios'
const local = 'http://localhost:5000'
const deployAPI = 'https://spiffy-fortune-porcupine.glitch.me/'
const production = ''
const api = axios.create({
    baseURL: `${deployAPI}/api`,
    withCredentials : true 
})
export default api
