import React, { useState, useEffect, useCallback } from "react";
import TextField from "../../common/form/textField";
import TextAreaField from "../../common/form/textAreaField";
import { validator } from "../../../utils/validator";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { editTodo, getEditTodoId, getTodoById } from "../../../store/todos";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/user";
import { getErrors } from "../../../store/errors";
import deadlineConvert from "../../../utils/displayDeadline";

const EditTodo = () => {
    const dispatch = useDispatch();
    const editTodoId = useSelector(getEditTodoId());
    const todo = useSelector(getTodoById(editTodoId));

    const currentUserId = useSelector(getCurrentUserId());
    const [data, setData] = useState({
        user: currentUserId,
        _id: "",
        title: "",
        text: "",
        deadline: "",
    });
    const [errors, setErrors] = useState({});
    const enterErrors = useSelector(getErrors());

    useEffect(() => {
        if (enterErrors) {
            enterErrors.map((error) => toast.error(error.msg));
        }
    }, [enterErrors]);

    useEffect(() => {
        if (todo) {
            setData((prevState) => ({
                ...prevState,
                _id: todo._id,
                title: todo.title,
                text: todo.text,
                deadline: deadlineConvert.toDate(todo.deadline),
            }));
        }
    }, [todo]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const validatorConfig = {
        title: {
            isRequired: {
                message: "Название задачи обязательно для заполнения",
            },
        },
        text: {
            isRequired: {
                message: "Описание задачи обязательно для заполнения",
            },
        },
        deadline: {
            isRequired: {
                message: "Крайний срок обязателен для заполнения",
            },
        },
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            for (const error in errors) {
                toast.error(errors[error]);
            }
            return;
        }
        dispatch(
            editTodo({ ...data, deadline: deadlineConvert.toMs(data.deadline) })
        );
    };

    return (
        <div
            className="modal fade"
            id="editTodoModal"
            tabIndex="-1"
            aria-labelledby="editTodoModal"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="edit-task">
                        <form onSubmit={handleSubmit}>
                            <div className="edit-task__title">
                                <TextField
                                    name="title"
                                    value={data.title}
                                    classLabel="text-white mb-0"
                                    placeholder="task title"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="edit-task__text-area">
                                <TextAreaField
                                    name="text"
                                    value={data.text}
                                    classLabel="text-white mb-0"
                                    rows="5"
                                    cols="10"
                                    maxLength="300"
                                    placeholder="task description"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="edit-task__control">
                                <div className="edit-task__deadline">
                                    <TextField
                                        name="deadline"
                                        type="datetime-local"
                                        value={data.deadline}
                                        classLabel="text-white mb-0"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="edit-task__btn-edit">
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-edit-close "
                                        data-bs-dismiss="modal"
                                    >
                                        close
                                    </button>
                                    <button
                                        className="btn btn-primary edit-task__btn-edit-save "
                                        data-bs-dismiss="modal"
                                    >
                                        save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTodo;
