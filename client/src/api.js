import axios from "axios";

// Note: Django's AllowAny permission doesn't let you access a route if 
// your credentials are wrong, but does if they are blank
const authHeader = localStorage.getItem("token") 
    ? {'Authorization': `JWT ${localStorage.getItem("token")}`}
    : {}

export default axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    headers: authHeader
})

//const guestApi = axios.create()