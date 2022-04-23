import adminReducer from "./admin";
import errorsReducer from "./errors";
import todosReducer from "./todos";
import userReducer from "./user";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    todos: todosReducer,
    user: userReducer,
    errors: errorsReducer,
    admin: adminReducer,
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
