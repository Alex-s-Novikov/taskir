import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import TextAreaField from "../../common/form/textAreaField";
import { validator } from "../../../utils/validator";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTodo } from "../../../store/todos";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/user";
import { getErrors } from "../../../store/errors";
import deadlineConvert from "../../../utils/displayDeadline";

const AddTodo = () => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId());
    const [data, setData] = useState({
        user: currentUserId,
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
            addTodo({ ...data, deadline: deadlineConvert.toMs(data.deadline) })
        );
        setData((prevState) => ({
            ...prevState,
            title: "",
            text: "",
            deadline: "",
        }));
    };

    return (
        <div className="add-task">
            <form onSubmit={handleSubmit}>
                <div className="add-task__title">
                    <TextField
                        name="title"
                        value={data.title}
                        classLabel="text-white mb-0"
                        placeholder="task title"
                        onChange={handleChange}
                    />
                </div>
                <div className="add-task__text-area">
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

                <div className="add-task__control">
                    <div className="add-task__deadline">
                        <TextField
                            name="deadline"
                            type="datetime-local"
                            value={data.deadline}
                            classLabel="text-white mb-0"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="add-task__btn-add">
                        <button className="btn btn-primary w-100">
                            <i className="bi bi-plus-square"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddTodo;
