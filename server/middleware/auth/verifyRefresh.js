const tokenService = require("../../services/tokensService");

const { check, validationResult } = require("express-validator");

refresh = [
    check("refreshToken")
        .not()
        .isEmpty()
        .withMessage("refresh token if empty")
        .custom(async (refreshToken) => {
            const userData = await tokenService.validateRefreshToken(
                refreshToken
            );

            const isTokenDB = await tokenService.findToken(refreshToken);

            if (
                !userData ||
                !isTokenDB ||
                userData.userId !== isTokenDB?.user?.toString()
            ) {
                throw new Error(
                    "Tokens data doesn't match. User unauthorized."
                );
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: 400,
                errors: errors.array(),
                message: "incorrect refresh token",
            });
        }
        return next();
    },
];

const verifyRefresh = {
    refresh,
};

module.exports = verifyRefresh;
