const chalk = require("chalk");
const todosService = require("../services/todosService");
const usersService = require("../services/usersService");

getAllByUserId = async (req, res) => {
    try {
        const { userId } = req.query;

        if (userId === req.user.userId) {
            const todos = await todosService.fetchAll(userId);

            return res.status(201).json({ todos });
        } else {
            res.status(401).json({ message: "unauthorized user" });
        }
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("todoController error/getAll - ", error)
        );
        return res.status(404).json({ message: "Todos not found" });
    }
};

addTodo = async (req, res) => {
    try {
        const { user, title, text, deadline } = req.body;

        if (user === req.user.userId) {
            const todo = await todosService.addTodo(
                user,
                title,
                text,
                deadline
            );

            return res.status(201).json({
                todo,
                message: "Todo has been added",
            });
        } else {
            res.status(401).json({ message: "unauthorized user" });
        }
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("todoController error/addTodo - ", error)
        );
        return res.status(404).json({ message: "Add todo error" });
    }
};

importantTodo = async (req, res) => {
    try {
        const { id } = req.body;

        const todo = await todosService.importantTodo(id, req.user.userId);

        if (todo) {
            return res.status(202).json({ todo });
        } else {
            res.status(401).json({ message: "unauthorized user" });
        }
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("todoController error/importantTodo - ", error)
        );
        return res.status(404).json({ message: "Important todo error" });
    }
};

editTodo = async (req, res) => {
    try {
        const { user, _id, title, text, deadline } = req.body;

        if (user === req.user.userId) {
            const todo = await todosService.editTodo(
                _id,
                title,
                text,
                deadline
            );

            return res.status(202).json({ todo });
        } else {
            res.status(401).json({ message: "unauthorized user" });
        }
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("todoController error/editTodo - ", error)
        );
        return res.status(404).json({ message: "Edit todo error" });
    }
};

newTodo = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        const todo = await todosService.newTodo(id, req.user.userId);

        console.log("controller", todo);

        if (todo) {
            return res.status(202).json({ todo });
        } else {
            res.status(401).json({ message: "unauthorized user" });
        }
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("todoController error/newTodo - ", error)
        );
        return res.status(404).json({ message: "New todo error" });
    }
};

inWorkTodo = async (req, res) => {
    try {
        const { id, drop } = req.body;
        const todo = await todosService.inWorkTodo(id, drop, req.user.userId);

        console.log("controller", todo);

        if (todo) {
            return res.status(202).json({ todo });
        } else {
            res.status(401).json({ message: "unauthorized user" });
        }
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("todoController error/inWorkTodo - ", error)
        );
        return res.status(404).json({ message: "In work todo error" });
    }
};

completeTodo = async (req, res) => {
    try {
        const { id, drop } = req.body;
        const todo = await todosService.completeTodo(id, drop, req.user.userId);

        console.log("controller", todo);

        if (todo) {
            return res.status(202).json({ todo });
        } else {
            res.status(401).json({ message: "unauthorized user" });
        }
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("todoController error/completeTodo - ", error)
        );
        return res.status(404).json({ message: "Complete todo error" });
    }
};

deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todosService.deleteTodo(id, req.user.userId);

        if (todo) {
            return res.status(202).json({ todo });
        } else {
            res.status(401).json({ message: "unauthorized user" });
        }
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("todoController error/deleteTodo - ", error)
        );
        return res.status(404).json({ message: "Delete todo error" });
    }
};

getAllTodos = async (req, res) => {
    try {
        const todos = await todosService.getAllForAll();

        return res.status(201).json(todos);
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("todoController error/getAllForAll - ", error)
        );
        return res.status(404).json({ message: "Todos not found" });
    }
};

const todosController = {
    getAllByUserId,
    addTodo,
    importantTodo,
    editTodo,
    newTodo,
    inWorkTodo,
    completeTodo,
    deleteTodo,
    getAllTodos,
};

module.exports = todosController;
