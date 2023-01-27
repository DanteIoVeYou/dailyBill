import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000
});

http.interceptors.request.use(config => {
    // Do something before request is sent
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

http.interceptors.response.use(response => {
    // Do something before response is sent
    return response.data;

}, error => {
    // Do something with response error
    return Promise.reject(error);
});

export default http;