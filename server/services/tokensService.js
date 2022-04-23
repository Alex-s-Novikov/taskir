const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/token");

exports.generateTokens = async (id, email, username) => {
    const accessToken = jwt.sign(
        { userId: id, email: email, userName: username },
        config.get("JWT_ACCESS_SECRET"),
        { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
        { userId: id, email: email, userName: username },
        config.get("JWT_REFRESH_SECRET"),
        { expiresIn: "30d" }
    );

    return { accessToken, refreshToken };
};

exports.validateAccessToken = (token) => {
    try {
        const tokenData = jwt.verify(token, config.get("JWT_ACCESS_SECRET"));
        return tokenData;
    } catch (e) {
        return null;
    }
};

exports.validateRefreshToken = (token) => {
    try {
        const tokenData = jwt.verify(token, config.get("JWT_REFRESH_SECRET"));
        return tokenData;
    } catch (e) {
        return null;
    }
};

exports.findToken = async (token) => {
    try {
        const tokenData = await Token.findOne({ refreshToken: token });
        return tokenData;
    } catch (e) {
        return null;
    }
};

exports.saveToken = async (id, refreshToken) => {
    const tokenData = await Token.findOne({ user: id });

    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return await tokenData.save();
    } else {
        const token = await Token.create({ user: id, refreshToken });
        return token;
    }
};

exports.deleteToken = async (refreshToken) => {
    const token = await Token.deleteOne({ refreshToken });
    return token;
};
