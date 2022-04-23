const Todo = require("../../models/todo");
const { check, validationResult } = require("express-validator");

add = [
    check("title")
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage("incorrect task title"),

    check("text")
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage("incorrect task text"),

    check("deadline")
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage("incorrect task deadline"),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: 400,
                errors: errors.array(),
                message: "incorrect task data",
            });
        }
        return next();
    },
];

const verifyTodo = {
    add,
};

module.exports = verifyTodo;
