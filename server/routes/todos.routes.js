const { Router } = require("express");
const router = Router();

const verifyTodo = require("../middleware/todos/verifyTodo");
const verifyAuth = require("../middleware/auth/verifyAuth");
const verifyAdmin = require("../middleware/auth/verifyAdmin");

const todosController = require("../controllers/todosController");

router
    .route("/")
    .get(verifyAuth.checkAuth, todosController.getAllByUserId)
    .post(verifyAuth.checkAuth, verifyTodo.add, todosController.addTodo);

router.put(
    "/important/:id",
    verifyAuth.checkAuth,
    todosController.importantTodo
);

router.patch(
    "/edit/:id",
    verifyAuth.checkAuth,
    verifyTodo.add,
    todosController.editTodo
);

router.put("/new/:id", verifyAuth.checkAuth, todosController.newTodo);

router.put("/inwork/:id", verifyAuth.checkAuth, todosController.inWorkTodo);

router.put("/complete/:id", verifyAuth.checkAuth, todosController.completeTodo);

router.delete("/delete/:id", verifyAuth.checkAuth, todosController.deleteTodo);

router.get("/all", verifyAdmin.checkAdmin, todosController.getAllTodos);

module.exports = router;
