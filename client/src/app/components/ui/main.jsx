import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user";
import Carousel from "./carousel";

const Main = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return isLoggedIn ? (
        <Redirect to="/todos" />
    ) : (
        <div className="col-md-8 offset-md-2 shadow p-3">
            <a href="https://vk.com/result.school">Junior Frontend Developer</a>
        </div>
    );
};

export default Main;
