import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5050/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

export default axiosInstance
