const express = require("express");
const userRoute = express.Router();
const UserController = require("../controller/userController");

userRoute.post("/register", UserController.register);
userRoute.post("/login", UserController.login);

module.exports = userRoute;
