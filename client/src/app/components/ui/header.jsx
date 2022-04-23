import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUserData, getIsLoggedIn } from "../../store/user";

const Header = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getCurrentUserData());
    const location = useLocation();

    return (
        <header>
            <nav className="navbar fixed-top header">
                <div className="container-fluid">
                    <h2 className="header__logo">
                        <Link to="/">Taskir</Link>
                    </h2>

                    {isLoggedIn ? (
                        <>
                            <div className="d-flex">
                                <div className="header__username">
                                    {currentUser.username}
                                </div>
                                {currentUser.admin && (
                                    <>
                                        <div
                                            className={
                                                location.pathname === "/admin"
                                                    ? "header__links_active"
                                                    : "header__links"
                                            }
                                            role="button"
                                        >
                                            <Link to="/admin">statistics</Link>
                                        </div>
                                        <div
                                            className={
                                                location.pathname === "/todos"
                                                    ? "header__links_active"
                                                    : "header__links"
                                            }
                                            role="button"
                                        >
                                            <Link to="/todos">todos</Link>
                                        </div>
                                    </>
                                )}
                                <div className="header__links" role="button">
                                    <Link to="/logout">logout</Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="header__links" role="button">
                            <Link to="/login">login/registration</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
