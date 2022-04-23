const { Router } = require("express");
const router = Router();

const verifyAuth = require("../middleware/auth/verifyAuth");
const verifyAdmin = require("../middleware/auth/verifyAdmin");

const usersController = require("../controllers/usersController");

router.get("/", verifyAuth.checkAuth, usersController.getCurrentUser);

router.get("/all", verifyAdmin.checkAdmin, usersController.getAllUsers);

module.exports = router;
