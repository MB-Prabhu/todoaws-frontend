import axios from "axios";

 const apidemoInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials:true
})

export default apidemoInstance;