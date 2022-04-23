import React from "react";
import TodoCard from "./todoCard";

const TodoList = ({ board, ...props }) => {
    return board.tasks.map((todo) => (
        <TodoCard key={todo._id} {...todo} board={board} {...props} />
    ));
};

export default TodoList;
