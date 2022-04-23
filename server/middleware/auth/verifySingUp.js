const User = require("../../models/user");
const { check, validationResult } = require("express-validator");

registration = [
    check("username")
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage("incorrect username"),
    check("email")
        .isEmail()
        .withMessage("incorrect email")
        .custom((email) => {
            return User.findOne({ email: email }).then((user) => {
                if (user) {
                    return Promise.reject("e-mail already in use");
                }
            });
        }),

    check("password")
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 chars long")
        .matches(/\d/)
        .withMessage("password must contain a number")
        .matches(/[A-Z]/)
        .withMessage("password must contain a capital symbol")
        .custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
                throw new Error("passwords must be same");
            } else {
                return value;
            }
        }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: 400,
                errors: errors.array(),
                message: "incorrect registration data",
            });
        }
        return next();
    },
];

const verifySignUp = {
    registration,
};

module.exports = verifySignUp;
