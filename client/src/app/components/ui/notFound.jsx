import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getErrors } from "../../store/errors";

const NotFound = () => {
    const enterErrors = useSelector(getErrors());

    useEffect(() => {
        if (enterErrors) {
            enterErrors.map((error) => toast.error(error.msg));
        }
    }, [enterErrors]);

    return (
        <div className="col-md-4 offset-md-4 shadow d-flex p-3 align-items-center flex-column not-found">
            <p className="not-found__numbers">404</p>
            <p>page not found</p>
            <p>
                <Link to="/">home page</Link>
            </p>
        </div>
    );
};

export default NotFound;
