const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth/", require("./auth.routes"));
router.use("/todos/", require("./todos.routes"));
router.use("/users/", require("./users.routes"));

module.exports = router;
