import axios from "axios";
import localStorageService from "./localStorage.service";
import config from "../config.json";

const httpAuth = axios.create({
    baseURL: config.apiEndpoint + "/auth/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const authService = {
    registr: async ({ email, password }) => {
        const { data } = await httpAuth.post(`signUp`, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post(`signInWithPassword`, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};

export default authService;
