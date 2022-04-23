import { createSlice } from "@reduxjs/toolkit";

const errorsSlice = createSlice({
    name: "errors",
    initialState: {
        entities: null,
    },
    reducers: {
        errorsSet: (state, action) => {
            state.entities = action.payload;
        },
        errorsCleared: (state) => {
            state.entities = null;
        },
    },
});

const { actions, reducer: errorsReducer } = errorsSlice;

const { errorsSet, errorsCleared } = actions;

export const setErrors = (errors) => (dispatch) => {
    dispatch(errorsSet(errors));
};

export const clearErrors = () => (dispatch) => {
    dispatch(errorsCleared());
};

export const getErrors = () => (state) => state.errors.entities;

export default errorsReducer;
