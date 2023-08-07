import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    auth:{
        username: 'admin',
        password: 'qwerty'
    },
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    baseURL:'https://cfidp.cebudigital.com/app',
    // baseURL:'http://localhost:8000/',
    // baseURL:'https://cfidp.cebudigital.com/api',
    // baseURL:'https://cfidp.pythonanywhere.com/',
    timeout: 100000,
});

export default apiClient;