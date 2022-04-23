import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configFile from "../config/config.json";
import localStorageService from "../services/localStorage.service";
import authService from "./auth.service";

const axiosInstance = axios.create({
    baseURL: configFile.API_END_POINT,
    withCredentiials: true,
});

axiosInstance.interceptors.request.use(
    function (config) {
        config.headers.common[
            "Authorization"
        ] = `Bearer ${localStorageService.getAccessToken()}`;
        config.headers.post["Content-Type"] = "application/json";
        config.headers.get["Content-Type"] = "application/json";

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async function (error) {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const data = await authService.refresh();
                localStorageService.setTokens(
                    data.accessToken,
                    data.userId,
                    false
                );
                originalRequest.headers.Authorization = `Bearer ${localStorageService.getAccessToken()}`;
                return axiosInstance.request(originalRequest);
            } catch (error) {
                toast.error("unauthorized user");
            }
        }
        const expectedErrors =
            error.response &&
            (error.response.status === 400 ||
                (error.response.status >= 402 && error.response.status < 500));
        if (!expectedErrors && error.response.status !== 401) {
            console.log(error);
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axiosInstance.get,
    post: axiosInstance.post,
    put: axiosInstance.put,
    delete: axiosInstance.delete,
    patch: axiosInstance.patch,
};

export default httpService;
