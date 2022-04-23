import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getIsLoggedIn } from "../../../store/user";
import { getTodosLoadingStatus, loadTodosList } from "../../../store/todos";
import localStorageService from "../../../services/localStorage.service";
import Background from "./background";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const todosStatusLoading = useSelector(getTodosLoadingStatus());
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadTodosList(localStorageService.getUserId()));
        }
    }, [isLoggedIn]);

    if (todosStatusLoading) return <Background />;

    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default AppLoader;
