
import axios from 'axios';



const nextStoreApi = axios.create({
    baseURL: '/api'
});


export default nextStoreApi;
