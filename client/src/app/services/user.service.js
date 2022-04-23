import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "users/";

const userService = {
    getCurrentUser: async () => {
        const userId = localStorageService.getUserId();
        const { data } = await httpService.get(userEndPoint, {
            params: { userId },
        });

        return data;
    },

    getAllUsers: async (userId) => {
        const { data } = await httpService.get(userEndPoint + "all", {
            params: { userId },
        });

        return data;
    },
};

export default userService;
