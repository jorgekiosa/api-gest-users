const routes = require("express").Router();
const checkToken = require("../middlewares/checkToken");
const UserController = require("../controllers/user.controller");
const validateUserBody = require("../middlewares/validateUser");

routes.post("/auth", UserController.auth);
routes.get("/user", checkToken, UserController.getAll);
routes.get("/user/:id", checkToken, UserController.get);
routes.post("/user", checkToken, UserController.create);
routes.put("/user/:id", checkToken, UserController.update);
routes.delete("/user/:id", checkToken, UserController.delete);

module.exports = routes;
