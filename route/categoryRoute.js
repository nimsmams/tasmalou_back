const express = require("express");
const CategoryRoute = express.Router();
const CategoryController = require("../controller/categoryController");
const authMiddleware = require("../middleware/auth");

CategoryRoute.post("/add", authMiddleware.auth, CategoryController.addCategory);
CategoryRoute.get(
  "/getcategory/:id",
  authMiddleware.auth,
  CategoryController.getCategory
);
CategoryRoute.get("/getAll", CategoryController.getAllCategories);
CategoryRoute.delete(
  "/delete/:id",
  authMiddleware.auth,
  CategoryController.deleteCategory
);
CategoryRoute.put(
  "/update/:id",
  authMiddleware.auth,
  CategoryController.updateCategory
);
CategoryRoute.get(
  "/productUser",
  authMiddleware.auth,
  CategoryController.getUserCategory
);
CategoryRoute.post(
  "/assignProduct",
  authMiddleware.auth,
  CategoryController.assignProductToCategory
);

module.exports = CategoryRoute;
