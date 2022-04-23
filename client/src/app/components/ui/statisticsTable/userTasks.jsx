import React from "react";
import PropTypes from "prop-types";
import UserTaskTitle from "./userTaskTitle";

const UserTasks = ({ tasks }) => {
    return (
        <td className="col-md-4">
            {tasks.length > 0 &&
                tasks.map((todo, index) => {
                    return <UserTaskTitle key={index} taskTitle={todo.title} />;
                })}
        </td>
    );
};

UserTasks.propTypes = {
    tasks: PropTypes.array,
};

export default UserTasks;
