import { createAction, createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import history from "../utils/history";
import { clearErrors, setErrors } from "./errors";
import { loadCurrentUserData } from "./user";
import orderBy from "lodash.orderby";

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        entities: null,
        boards: [
            { title: "add task", tasks: null },
            { title: "new tasks", tasks: null },
            { title: "in progress", tasks: null },
            { title: "finished", tasks: null },
        ],
        statistic: [
            { title: "total task", count: 0 },
            { title: "new", count: 0 },
            { title: "in progress", count: 0 },
            { title: "finished", count: 0 },
        ],
        isLoading: false,
        editTodoId: null,
        isEditTodo: false,
        error: null,
    },
    reducers: {
        todosRequested: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        todosRecieved: (state, action) => {
            state.entities = action.payload;
        },
        updateBoardsSuccess: (state) => {
            state.entities = orderBy(state.entities, ["deadline"], ["asc"]);
            state.boards[1].tasks = state.entities.filter(
                (todo) => todo.status === "new"
            );
            state.boards[2].tasks = state.entities.filter(
                (todo) => todo.status === "inWork"
            );
            state.boards[3].tasks = state.entities.filter(
                (todo) => todo.status === "completed"
            );
            state.isLoading = false;
        },
        updateStatisticsBoard: (state) => {
            state.statistic[0].count = state.entities.length;
            state.statistic[1].count = state.boards[1].tasks.length;
            state.statistic[2].count = state.boards[2].tasks.length;
            state.statistic[3].count = state.boards[3].tasks.length;
            state.isLoading = false;
        },
        todosRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addTodoSuccess(state, action) {
            state.entities.push(action.payload);
        },
        addTodoFailed: (state, action) => {
            state.error = action.payload;
        },
        editTodoSet: (state, action) => {
            state.editTodoId = action.payload;
            state.isEditTodo = true;
        },
        updateTodoRequested(state) {
            state.error = null;
        },
        updateTodoSuccess(state, action) {
            const elementIndex = state.entities.findIndex(
                (todo) => todo._id === action.payload._id
            );
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload,
            };
        },
        updateTodoFailed: (state, action) => {
            state.error = action.payload;
        },
        deleteTodoRequested(state) {
            state.error = null;
        },
        deleteTodoSuccess(state, action) {
            state.entities = state.entities.filter(
                (todo) => todo._id !== action.payload
            );
        },
        deleteTodoFailed: (state, action) => {
            state.error = action.payload;
        },
        todosCleared(state) {
            state.entities = null;
            state.boards = [
                { title: "add task", tasks: null },
                { title: "new tasks", tasks: null },
                { title: "in progress", tasks: null },
                { title: "finished", tasks: null },
            ];
            state.statistic = [
                { title: "total task", count: 0 },
                { title: "new", count: 0 },
                { title: "in progress", count: 0 },
                { title: "finished", count: 0 },
            ];
        },
    },
});

const { reducer: todosReducer, actions } = todosSlice;
const {
    todosRequested,
    todosRecieved,
    updateBoardsSuccess,
    updateStatisticsBoard,
    todosRequestFailed,
    addTodoSuccess,
    addTodoFailed,
    editTodoSet,
    updateTodoRequested,
    updateTodoSuccess,
    updateTodoFailed,
    deleteTodoRequested,
    deleteTodoSuccess,
    deleteTodoFailed,
    todosCleared,
} = actions;

const addTodoRequested = createAction("todos/addTodoRequested");

export const loadTodosList = (userId) => async (dispatch) => {
    dispatch(todosRequested());
    try {
        const { todos } = await todosService.fetchAll(userId);
        dispatch(todosRecieved(todos));
        dispatch(updateBoardsSuccess());
        dispatch(updateStatisticsBoard());
    } catch (error) {
        const { status, statusText } = error.response;
        if (status === 404) {
            history.push("/404");
            dispatch(todosRequestFailed(statusText));
        } else dispatch(todosRequestFailed(error.message));
    } finally {
        dispatch(loadCurrentUserData());
    }
};

export const addTodo = (payload) => async (dispatch) => {
    dispatch(addTodoRequested());
    dispatch(clearErrors());
    try {
        const { todo } = await todosService.add(payload);
        dispatch(addTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
        dispatch(updateStatisticsBoard());
    } catch (error) {
        const { errors, message } = error.response.data;
        if (errors) {
            dispatch(setErrors(errors));
            dispatch(addTodoFailed(message));
        } else dispatch(addTodoFailed(error.message));
    }
};

export const importantTodo = (todoId) => async (dispatch) => {
    dispatch(updateTodoRequested());
    try {
        const { todo } = await todosService.important(todoId);
        dispatch(updateTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
    } catch (error) {
        const { statusText } = error.response;
        if (statusText) {
            dispatch(updateTodoFailed(statusText));
        } else {
            dispatch(updateTodoFailed(error.message));
        }
    }
};

export const setEditTodoId = (todoId) => (dispatch) => {
    dispatch(editTodoSet(todoId));
};

export const editTodo = (payload) => async (dispatch) => {
    dispatch(updateTodoRequested());
    dispatch(clearErrors());
    try {
        const { todo } = await todosService.edit(payload);
        dispatch(updateTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
    } catch (error) {
        const { errors, message } = error.response.data;
        if (errors) {
            dispatch(setErrors(errors));
            dispatch(updateTodoFailed(message));
        } else {
            dispatch(updateTodoFailed(error.message));
        }
    }
};

export const newTodo = (todoId) => async (dispatch) => {
    dispatch(updateTodoRequested());
    try {
        const { todo } = await todosService.new(todoId);
        console.log("newTodo todo", todo);
        dispatch(updateTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
        dispatch(updateStatisticsBoard());
    } catch (error) {
        const { statusText } = error.response;
        if (statusText) {
            dispatch(updateTodoFailed(statusText));
        } else {
            dispatch(updateTodoFailed(error.message));
        }
    }
};

export const inWorkTodo = (todoId, drop) => async (dispatch) => {
    dispatch(updateTodoRequested());
    try {
        const { todo } = await todosService.inWork(todoId, drop);
        dispatch(updateTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
        dispatch(updateStatisticsBoard());
    } catch (error) {
        const { statusText } = error.response;
        if (statusText) {
            dispatch(updateTodoFailed(statusText));
        } else {
            dispatch(updateTodoFailed(error.message));
        }
    }
};

export const completeTodo = (todoId, drop) => async (dispatch) => {
    dispatch(updateTodoRequested());
    try {
        const { todo } = await todosService.complete(todoId, drop);
        dispatch(updateTodoSuccess(todo));
        dispatch(updateBoardsSuccess());
        dispatch(updateStatisticsBoard());
    } catch (error) {
        const { statusText } = error.response;
        if (statusText) {
            dispatch(updateTodoFailed(statusText));
        } else {
            dispatch(updateTodoFailed(error.message));
        }
    }
};

export const deleteTodo = (todoId) => async (dispatch) => {
    dispatch(deleteTodoRequested());
    try {
        const { todo } = await todosService.delete(todoId);
        console.log(todo);
        dispatch(deleteTodoSuccess(todoId));
        dispatch(updateBoardsSuccess());
        dispatch(updateStatisticsBoard());
    } catch (error) {
        const { statusText } = error.response;
        if (statusText) {
            dispatch(deleteTodoFailed(statusText));
        } else {
            dispatch(deleteTodoFailed(error.message));
        }
    }
};

export const getTodos = () => (state) => state.todos.entities;
export const getTodoById = (todoId) => (state) => {
    if (state.todos.entities) {
        return state.todos.entities.find((todo) => todo._id === todoId);
    }
};

export const getBoadrs = () => (state) => state.todos.boards;

export const getStatistic = () => (state) => state.todos.statistic;

export const getTodosLoadingStatus = () => (state) => state.todos.isLoading;

export const getEditTodoId = () => (state) => state.todos.editTodoId;

export const getEditTodoStatus = () => (state) => state.todos.isEditTodo;

export const getTodosError = () => (state) => state.todos.error;

export const clearTodosStore = () => (dispatch) => {
    dispatch(todosCleared());
};

export default todosReducer;
