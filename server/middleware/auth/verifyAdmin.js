const User = require("../../models/user");
const { check, validationResult } = require("express-validator");

checkAdmin = [
    check("userId")
        .not()
        .isEmpty()
        .withMessage("unauthorized operation")
        .custom(async (userId) => {
            return await User.findOne({ _id: userId }).then(async (user) => {
                if (user) {
                    if (!user.isAdmin) {
                        return Promise.reject("unauthorized operation");
                    }
                }
            });
        }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: 400,
                errors: errors.array(),
                message: "unauthorized operation",
            });
        }
        return next();
    },
];

const verifyAdmin = {
    checkAdmin,
};

module.exports = verifyAdmin;
