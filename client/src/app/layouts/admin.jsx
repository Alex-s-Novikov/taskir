import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import localStorageService from "../services/localStorage.service";
import {
    getAllDataLoadingStatus,
    getAllTodos,
    getAllUsers,
    loadAllTodosList,
    loadAllUsersList,
} from "../store/admin";
import { getIsLoggedIn } from "../store/user";
import StatisticsTable from "../components/ui/statisticsTable/statisticsTable";

const Admin = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const todos = useSelector(getAllTodos());
    const users = useSelector(getAllUsers());
    const dataStatusLoading = useSelector(getAllDataLoadingStatus());

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadAllUsersList(localStorageService.getUserId()));
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (users) {
            dispatch(loadAllTodosList(localStorageService.getUserId()));
        }
    }, [users]);

    const statistics =
        todos && users
            ? users.map((u) => {
                  const user = {};
                  user.data = { ...u };
                  user.allTodos = todos.filter((todo) => todo.user === u._id);
                  user.newTodos = user.allTodos.filter(
                      (todo) => todo.status === "new"
                  );
                  user.inWorkTodos = user.allTodos.filter(
                      (todo) => todo.status === "inWork"
                  );
                  user.finishedTodos = user.allTodos.filter(
                      (todo) => todo.status === "completed"
                  );
                  return user;
              })
            : [];

    if (dataStatusLoading || statistics.length === 0) return null;

    if (statistics) {
        return (
            <div className="col-md-8 offset-md-2 shadow p-2 admin">
                <StatisticsTable statistics={statistics} />
            </div>
        );
    }
};

export default Admin;
