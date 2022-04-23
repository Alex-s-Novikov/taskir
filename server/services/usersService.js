const User = require("../models/user");
const tokensService = require("./tokensService");

exports.createUser = async (username, email, password) => {
    const newUser = new User({
        username,
        email,
        password,
    });

    await newUser.save();

    return newUser;
};

exports.findUserById = async (id) => {
    const user = await User.findOne({ _id: id });

    return user;
};

exports.findUserByEmail = async (email) => {
    const user = await User.findOne({ email: email });

    return user;
};

exports.refreshUser = async (refreshToken) => {
    const tokenData = tokensService.validateRefreshToken(refreshToken);

    return tokenData;
};

exports.findAllUsers = async () => {
    const users = await User.find();

    return users;
};
