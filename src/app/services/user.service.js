import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payLoad) => {
        const { data } = await httpService.put(
            userEndpoint + payLoad._id,
            payLoad
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    updateUser: async (newData) => {
        const { data } = await httpService.put(
            userEndpoint + localStorageService.getUserId(),
            newData
        );
        return data;
    }
};

export default userService;
