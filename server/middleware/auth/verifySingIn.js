const User = require("../../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

login = [
    check("email")
        .isEmail()
        .withMessage("incorrect email")
        .normalizeEmail()
        .withMessage("incorrect email")
        .custom(async (email) => {
            return await User.findOne({ email }).then((user) => {
                if (!user) {
                    return Promise.reject("e-mail not found");
                }
            });
        }),

    check("password")
        .not()
        .isEmpty()
        .withMessage("password mustn't be empty")
        .custom(async (password, { req }) => {
            return await User.findOne({ email: req.body.email }).then(
                async (user) => {
                    if (user) {
                        const comparePassword = await bcrypt.compare(
                            password,
                            user.password
                        );
                        if (!comparePassword) {
                            return Promise.reject("incorrect password");
                        }
                    }
                }
            );
        }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: 400,
                errors: errors.array(),
                message: "incorrect login data",
            });
        }
        return next();
    },
];

const verifySignIn = {
    login,
};

module.exports = verifySignIn;
