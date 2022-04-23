const User = require("../models/user");

const chalk = require("chalk");

const usersService = require("../services/usersService");

getCurrentUser = async (req, res) => {
    try {
        const { userId } = req.query;

        if (userId === req.user.userId) {
            const user = await usersService.findUserById(userId);

            return res.status(201).json({
                username: user.username,
                userId: user._id,
                admin: user.isAdmin,
            });
        } else {
            res.status(401).json({ message: "unauthorized user" });
        }
    } catch (error) {
        console.log("userController error/getCurrentUser - ", error);
    }
};

getAllUsers = async (req, res) => {
    try {
        const users = await usersService.findAllUsers();

        return res.status(201).json(users);
    } catch (error) {
        console.log("userController error/getAllUsers - ", error);
    }
};

const usersController = {
    getCurrentUser,
    getAllUsers,
};

module.exports = usersController;
