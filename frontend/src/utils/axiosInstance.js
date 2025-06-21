import axios from "axios"
import { BASE_URL } from "./constants";
const axiosInstance = axios.create({
    baseURL: BASE_URL+"/api/v1",
    withCredentials: true
})
export default axiosInstance;