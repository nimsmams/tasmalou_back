const express = require("express");
const ProductRoute = express.Router();
const productController = require("../controller/productController");
const categoryRoute = require("./categoryRoute.js");

ProductRoute.post("/add", productController.addProduct);
ProductRoute.get("/getproduct/:id", productController.getProduct);
ProductRoute.get("/getAll", productController.getAllProducts);
ProductRoute.delete("/delete/:id", productController.deleteProduct);
ProductRoute.put("/update/:id", productController.updateProduct);
ProductRoute.get("/productUser", productController.getUserProduct);

ProductRoute.use(categoryRoute);
module.exports = ProductRoute;
