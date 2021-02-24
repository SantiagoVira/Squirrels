import axios from "axios";

// Note: Django's AllowAny permission doesn't let you access a route if 
// your credentials are wrong, but does if they are blank
const url = process.env.REACT_APP_DEBUG_MODE ? "http://localhost:8000" : window.location.origin
const instance = axios.create({
    baseURL: url
})

// Ran before sending each request
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        // If JWT is in localstorage, set Authorization header
        if (token) {
            config.headers.Authorization = `JWT ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default instance