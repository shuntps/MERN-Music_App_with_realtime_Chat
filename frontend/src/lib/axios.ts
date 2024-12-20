import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development" ? `${BACKEND_URL}/api` : "/api",
});
