import axios from "axios";
import configFile from "../config/config.json";

const httpAuth = axios.create({
    baseURL: configFile.API_END_POINT + "auth/",
    withCredentiials: true,
});

const authService = {
    registration: async (payload) => {
        const { data } = await httpAuth.post("/registration", payload);
        return data;
    },

    logIn: async (payload) => {
        const { data } = await httpAuth.post("/login", payload);
        return data;
    },
    logOut: async () => {
        const { data } = await httpAuth.post("/logout");
        return data;
    },

    refresh: async () => {
        const { data } = await httpAuth.get("/refresh");
        return data;
    },
};

export default authService;
