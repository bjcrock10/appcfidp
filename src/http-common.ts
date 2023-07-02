import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    auth:{
        username: 'admin',
        password: 'qwerty'
    },
    baseURL:'http://localhost:8000/',
    // baseURL:'https://cfidp.pythonanywhere.com/',
    timeout: 100000,
    headers: {
        "Content-type": "application/json",
    },
});

export default apiClient;