const express = require("express");
const CategoryRoute = express.Router();
const CategoryController = require("../controller/categoryController");

CategoryRoute.post("/add", CategoryController.addCategory);
CategoryRoute.get("/getcategory/:id", CategoryController.getCategory);
CategoryRoute.get("/getAll", CategoryController.getAllCategories);
CategoryRoute.delete("/delete/:id", CategoryController.deleteCategory);
CategoryRoute.put("/update/:id", CategoryController.updateCategory);
CategoryRoute.get("/productUser", CategoryController.getUserCategory);
CategoryRoute.post("/assignProduct", CategoryController.assignProductToCategory);

module.exports = CategoryRoute;