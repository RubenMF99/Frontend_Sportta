import axios from "axios";

const AxiosClient = axios.create(
    {
        baseURL: `${import.meta.env.VITE_RUTA}/api` 
    }
);

export default AxiosClient;