import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";
import "./App.scss";

import AppLoader from "./components/ui/hoc/appLoader";

import ProtectedRoute from "./components/common/protectedRoute";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import Todos from "./layouts/todos";
import LogOut from "./components/ui/logout";
import LoginPage from "./components/page/loginPage";
import MainPage from "./components/page/mainPage";
import NotFoundPage from "./components/page/notFoundPage";
import AdminPage from "./components/page/adminPage";

const App = () => {
    return (
        <div>
            <AppLoader>
                <Header />

                <Switch>
                    <ProtectedRoute path="/todos" component={Todos} />
                    <ProtectedRoute path="/admin" component={AdminPage} />

                    <Route path="/login" component={LoginPage} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/404" component={NotFoundPage} />
                    <Route path="/" exact component={MainPage} />

                    <Redirect to="/" />
                </Switch>

                <Footer />
            </AppLoader>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                transition={Zoom}
                pauseOnFocusLoss={false}
            />
        </div>
    );
};

export default App;
