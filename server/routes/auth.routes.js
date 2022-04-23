const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const Token = require("../models/token");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const verifySignUp = require("../middleware/auth/verifySingUp");
const verifySignIn = require("../middleware/auth/verifySingIn");
const verifyRefresh = require("../middleware/auth/verifyRefresh");
const verifyAuth = require("../middleware/auth/verifyAuth");

const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");

router.post(
    "/registration",
    verifySignUp.registration,
    authController.registration
);

router.post("/login", verifySignIn.login, authController.login);

router.post("/logout", authController.logout);

router.get("/refresh", verifyRefresh.refresh, authController.refresh);

module.exports = router;
