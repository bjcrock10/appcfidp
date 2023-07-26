import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    auth:{
        username: 'admin',
        password: 'qwerty'
    },
    // baseURL:'http://localhost:8000/',
    baseURL:'https://cfidp.cebudigital.com/api',
    timeout: 1000000,
    headers: {
        "Content-type": "application/json",
    },
});

export default apiClient;