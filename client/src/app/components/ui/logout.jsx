import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Background from "../ui/hoc/background";
import { clearTodosStore } from "../../store/todos";
import { logOut } from "../../store/user";
import { clearStatistics } from "../../store/admin";

const LogOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
        dispatch(clearTodosStore());
        dispatch(clearStatistics());
    }, [dispatch]);

    return <Background />;
};

export default LogOut;
