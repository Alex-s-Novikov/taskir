const Todo = require("../models/todo");

exports.fetchAll = async (userId) => {
    const todos = await Todo.find({ user: userId });

    return todos;
};

exports.addTodo = async (user, title, text, deadline) => {
    const todo = await new Todo({
        user: user,
        title: title,
        text: text,
        deadline: deadline,
        important: false,
    });

    await todo.save();

    return todo;
};

exports.importantTodo = async (id, userId) => {
    try {
        const todo = await Todo.findById(id);

        if (todo.user.toString() === userId) {
            todo.important = !todo.important;

            await todo.save();

            return todo;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

exports.editTodo = async (_id, title, text, deadline) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: _id },
            { title: title, text: text, deadline: deadline },
            { new: true }
        );

        return todo;
    } catch (error) {
        console.log(error);
    }
};

exports.newTodo = async (id, userId) => {
    console.log("todoService newTodo", id);
    try {
        const todo = await Todo.findById(id);

        if (todo.user.toString() === userId) {
            if (todo.status !== "new") {
                todo.status = "new";
            }
            await todo.save();

            return todo;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

exports.inWorkTodo = async (id, drop, userId) => {
    console.log("todoService inWorkTodo", id);
    try {
        const todo = await Todo.findById(id);

        if (todo.user.toString() === userId) {
            if (drop) {
                todo.status = "inWork";
            } else {
                if (todo.status !== "inWork") {
                    todo.status = "inWork";
                } else {
                    todo.status = "new";
                }
            }

            await todo.save();

            return todo;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

exports.completeTodo = async (id, drop, userId) => {
    console.log("todoService completeTodo", id);
    try {
        const todo = await Todo.findById(id);

        if (todo.user.toString() === userId) {
            if (drop) {
                todo.status = "completed";
            } else {
                if (todo.status !== "completed") {
                    todo.status = "completed";
                } else {
                    todo.status = "new";
                }
            }

            await todo.save();

            return todo;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

exports.deleteTodo = async (id, userId) => {
    console.log("todoService deleteTodo", id);
    try {
        const todo = await Todo.findById(id);

        if (todo.user.toString() === userId) {
            await todo.remove();
            return todo;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getAllForAll = async () => {
    console.log("todoService getAllForAll");
    const todos = await Todo.find();

    return todos;
};
