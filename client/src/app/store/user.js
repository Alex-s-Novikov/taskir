import { createAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import history from "../utils/history";
import { clearErrors, setErrors } from "./errors";

const initialState = localStorageService.getAccessToken()
    ? {
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
      }
    : {
          error: null,
          auth: null,
          isLoggedIn: false,
      };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authRequested: (state) => {
            state.error = null;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userDataLoaded: (state, action) => {
            state.auth = action.payload;
        },
        userLoggedOut: (state) => {
            state.isLoggedIn = false;
            state.auth = null;
        },
    },
});

const { reducer: userReducer, actions } = userSlice;
const {
    authRequested,
    authRequestSuccess,
    authRequestFailed,
    userDataLoaded,
    userLoggedOut,
} = actions;

const loadUserDataRequested = createAction("user/loadUserDataRequested");
const loadUserDataFailed = createAction("user/loadUserDataFailed");

const logOutRequested = createAction("user/logOutRequested");
const logOutFailed = createAction("user/logOutFailed");

export const registration = (payload) => async (dispatch) => {
    dispatch(authRequested());
    dispatch(clearErrors());
    try {
        const data = await authService.registration(payload);
        localStorageService.setTokens(data.accessToken, data.userId, false);
        dispatch(authRequestSuccess({ userId: data.userId }));
        history.push("/todos");
        toast.success(`Welcome`);
    } catch (error) {
        const { errors, message } = error.response.data;
        if (errors) {
            dispatch(setErrors(errors));
            dispatch(authRequestFailed(message));
        } else dispatch(authRequestFailed(error.message));
    }
};

export const logIn =
    ({ data: payload, redirect }) =>
    async (dispatch) => {
        dispatch(authRequested());
        dispatch(clearErrors());
        try {
            const data = await authService.logIn(payload);
            localStorageService.setTokens(
                data.accessToken,
                data.userId,
                payload.stayOn
            );
            dispatch(authRequestSuccess({ userId: data.userId }));
            history.push(redirect);
            toast.success(`Welcome`);
        } catch (error) {
            const { errors, message } = error.response.data;
            if (errors) {
                dispatch(setErrors(errors));
                dispatch(authRequestFailed(message));
            } else dispatch(authRequestFailed(error.message));
        }
    };

export const loadCurrentUserData = () => async (dispatch) => {
    dispatch(loadUserDataRequested());
    try {
        const data = await userService.getCurrentUser();
        dispatch(
            userDataLoaded({
                userId: data.userId,
                username: data.username,
                admin: data.admin,
            })
        );
    } catch (error) {
        dispatch(loadUserDataFailed(error.message));
    }
};

export const logOut = () => async (dispatch) => {
    dispatch(logOutRequested());
    try {
        const data = await authService.logOut();
        if (data.message === "logout successful") {
            console.log("Bye!");
        }
        dispatch(userLoggedOut());
        localStorageService.removeTokens();
        history.push("/");
        toast.success(`See you soon`);
    } catch (error) {
        dispatch(logOutFailed(error.message));
    }
};

export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getCurrentUserData = () => (state) => state.user.auth;
export const getCurrentUserId = () => (state) => state.user.auth.userId;
export const getUserError = () => (state) => state.user.error;

export default userReducer;
