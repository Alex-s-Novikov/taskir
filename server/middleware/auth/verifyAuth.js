const tokenService = require("../../services/tokensService");

exports.checkAuth = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader.split(" ")[1];
        const tokenData = tokenService.validateAccessToken(accessToken);

        if (!authHeader || !accessToken || !tokenData) {
            return res.status(401).json({
                message: "unauthorized user",
            });
        }

        req.user = tokenData;

        next();
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("verifyAuth error/checkAuth - ", error)
        );
        res.status(500).json({ message: "server error" });
    }
};
