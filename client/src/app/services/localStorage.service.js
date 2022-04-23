import configFile from "../config/config.json";

export function setTokens(accessToken, id, stayOn) {
    if (stayOn) {
        localStorage.setItem(configFile.TOKEN_ACCESS_KEY, accessToken);
        localStorage.setItem(configFile.CURRENT_USER_ID, id);
    } else {
        sessionStorage.setItem(configFile.TOKEN_ACCESS_KEY, accessToken);
        sessionStorage.setItem(configFile.CURRENT_USER_ID, id);
    }
}

export function removeTokens() {
    localStorage.removeItem(configFile.TOKEN_ACCESS_KEY);
    localStorage.removeItem(configFile.CURRENT_USER_ID);
    sessionStorage.removeItem(configFile.TOKEN_ACCESS_KEY);
    sessionStorage.removeItem(configFile.CURRENT_USER_ID);
}

export function getAccessToken() {
    if (localStorage.getItem(configFile.TOKEN_ACCESS_KEY)) {
        return localStorage.getItem(configFile.TOKEN_ACCESS_KEY);
    } else {
        return sessionStorage.getItem(configFile.TOKEN_ACCESS_KEY);
    }
}

export function getUserId() {
    if (localStorage.getItem(configFile.CURRENT_USER_ID)) {
        return localStorage.getItem(configFile.CURRENT_USER_ID);
    } else {
        return sessionStorage.getItem(configFile.CURRENT_USER_ID);
    }
}

const localStorageService = {
    setTokens,
    removeTokens,
    getAccessToken,
    getUserId,
};

export default localStorageService;
