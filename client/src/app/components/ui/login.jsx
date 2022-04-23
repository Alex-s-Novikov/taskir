import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import LoginForm from "../ui/loginForm";
import RegisterForm from "../ui/registerForm";
import { useSelector } from "react-redux";
import { getErrors } from "../../store/errors";
import { getUserError } from "../../store/user";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const enterErrors = useSelector(getErrors());
    const userError = useSelector(getUserError());
    const toggleFormType = () => {
        setFormType((prev) => (prev === "register" ? "login" : "register"));
    };

    useEffect(() => {
        if (enterErrors) {
            enterErrors.map((error) => toast.error(error.msg));
        }
    }, [enterErrors]);

    useEffect(() => {
        if (userError) {
            toast.error(userError);
        }
    }, [userError]);

    return (
        <>
            <div className="col-md-4 offset-md-4 shadow p-4 login-form">
                {formType === "register" ? (
                    <>
                        <h3 className="mb-4">Регистрация</h3>
                        <RegisterForm />
                        <p className="mt-2">
                         у вас уже есть учетная запись?{" "}
                            <span
                                className="link-primary"
                                role="button"
                                onClick={toggleFormType}
                            >
                                Войти
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <h3 className="mb-4">Войти</h3>
                        <LoginForm />
                        <p className="mt-2">
                            Не зарегистрированы?{" "}
                            <span
                                className="link-primary"
                                role="button"
                                onClick={toggleFormType}
                            >
                                Sign up
                            </span>
                        </p>
                    </>
                )}
            </div>
            {/* </div>
                </div>
            </div> */}
        </>
    );
};

export default Login;
