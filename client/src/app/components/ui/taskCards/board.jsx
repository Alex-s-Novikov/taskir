import React from "react";
import { useSelector } from "react-redux";
import { getStatistic } from "../../../store/todos";
import AddTask from "./addTodo";
import Statistic from "./statistic";
import TodoList from "./todoList";

const Board = ({ board, ...props }) => {
    const boardStyle = {
        "add task": "add-stat",
        "new tasks": "tasks",
        "in progress": "in-progress",
        finished: "finished",
    };
    const statistic = useSelector(getStatistic());
    const { onDragOver, onDragLeave, onDragEnd, onDrop, currentTodo } = props;

    return (
        <>
            {board.title === "add task" ? (
                <div
                    className={
                        "col-12 col-md-6 col-lg-3 main__coloumn-" +
                        boardStyle[board.title]
                    }
                >
                    <div className="main__coloumn-header">
                        <h4>{board.title}</h4>
                    </div>
                    <hr />
                    <AddTask />
                    <div className="main__coloumn-header">
                        <h4>statistic</h4>
                    </div>
                    <hr />
                    <div className="statitics">
                        {statistic.map((stat) => {
                            return <Statistic key={stat.title} {...stat} />;
                        })}
                    </div>
                </div>
            ) : (
                board.tasks && (
                    <div
                        className={
                            "col-12 col-md-6 col-lg-3 main__coloumn-" +
                            boardStyle[board.title]
                        }
                        onDragLeave={(e) => onDragLeave(e)}
                        onDragOver={(e) => onDragOver(e)}
                        onDragEnd={(e) => onDragEnd(e)}
                        onDrop={(e) => onDrop(e, board, currentTodo)}
                    >
                        <div className="main__coloumn-header">
                            <h4>{board.title}</h4>
                        </div>
                        <hr />
                        <div className="main__coloumn-content">
                            <TodoList board={board} {...props} />
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default Board;
