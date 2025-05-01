import axios, {AxiosInstance} from "axios";
import BASE_URL from "./ApiConfig";

const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL
});

instance.interceptors.request.use((config) => {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (tokenCookie) {
        const token = decodeURIComponent(tokenCookie.split('=')[1]);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});


export default instance;

