
import axios from 'axios';


const segycomWebApi = axios.create({
    baseURL: '/api'
});


export default segycomWebApi;
