import React, { useState } from "react";
import PropTypes from "prop-types";
import UserTasks from "./userTasks";

const UserStatistics = ({ user }) => {
    const [show, setShow] = useState(false);
    const toggleDisplay = () => {
        setShow((prevState) => !prevState);
    };

    return (
        <>
            <tr
                onClick={toggleDisplay}
                data-bs-toggle="collapse"
                data-bs-target={`#${user.data.email
                    .replace("@", "")
                    .replace(".", "")}`}
                role="button"
                aria-expanded="false"
                aria-controls={user.data.email
                    .replace("@", "")
                    .replace(".", "")}
            >
                <td>
                    <i
                        className={
                            "bi bi-caret-" + (!show ? "down-fill" : "up-fill")
                        }
                    ></i>
                </td>
                <td>{`${user.data.username} / ${user.data.email}`}</td>
                <td className="text-center">{user.allTodos.length}</td>
                <td className="text-center">{user.newTodos.length}</td>
                <td className="text-center">{user.inWorkTodos.length}</td>
                <td className="text-center">{user.finishedTodos.length}</td>
            </tr>

            <tr
                className="collapse"
                id={user.data.email.replace("@", "").replace(".", "")}
            >
                <td className="p-0" colSpan="6">
                    <table className="table m-0 statistics-table">
                        <thead>
                            <tr>
                                <th>new</th>
                                <th>in work</th>
                                <th>finished</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {<UserTasks tasks={user.newTodos} />}
                                {<UserTasks tasks={user.inWorkTodos} />}
                                {<UserTasks tasks={user.finishedTodos} />}
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </>
    );
};

UserStatistics.propTypes = {
    user: PropTypes.object,
    index: PropTypes.number,
};

export default UserStatistics;
