
import axios from 'axios';



const syscomApi = axios.create({
    headers: {
        Authorization : process.env.NEXT_PUBLIC_SYSCOMAPIkEY
    },
    baseURL: 'https://developers.syscom.mx/api/v1/',
});


export default syscomApi;
