const bcrypt = require("bcryptjs");
const chalk = require("chalk");
const User = require("../models/user");
const tokensService = require("../services/tokensService");
const usersService = require("../services/usersService");

registration = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const { id } = await usersService.createUser(
            username,
            email,
            hashedPassword
        );

        tokens = await tokensService.generateTokens(id, email, username);

        await tokensService.saveToken(id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        console.log(chalk.bgWhite(`New user: ${username} - email: ${email}`));
        return res.status(201).json({
            accessToken: tokens.accessToken,
            userId: id,
            message: "User has been created",
        });
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("authController error/registration - ", error)
        );
        res.status(500).json({ message: "server error" });
    }
};

login = async (req, res) => {
    try {
        const { email } = req.body;
        const { id, username } = await usersService.findUserByEmail(email);

        tokens = await tokensService.generateTokens(id, email, username);
        await tokensService.saveToken(id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return res.status(200).json({
            accessToken: tokens.accessToken,
            userId: id,
            message: "login successful",
        });
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("authController error/login - ", error)
        );
        res.status(500).json({ message: "server error" });
    }
};

logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        await tokensService.deleteToken(refreshToken);

        res.clearCookie("refreshToken");

        return res.status(200).json({ message: "logout successful" });
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("authController error/logout - ", error)
        );
        res.status(500).json({ message: "server error" });
    }
};

refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        const { userId } = await usersService.refreshUser(refreshToken);
        const { id, email, username } = await User.findById(userId);

        tokens = await tokensService.generateTokens(id, email, username);
        await tokensService.saveToken(id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return res.status(200).json({
            accessToken: tokens.accessToken,
            userId: id,
            message: "refresh/re-login successful",
        });
    } catch (error) {
        console.log(
            chalk.bgRed.inverse("authController error/refresh - ", error)
        );
        res.status(500).json({ message: "server error" });
    }
};

const authController = {
    registration,
    login,
    logout,
    refresh,
};

module.exports = authController;
