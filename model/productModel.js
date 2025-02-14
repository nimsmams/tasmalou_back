const environement = require("dotenv");
environement.config();
const connexion = require("../config/db");
// sauvegarder un product
const saveProduct = (values, callback) => {
  console.log("blup");

  let req =
    "INSERT INTO product (product_name,description, plant_section, family, image_path) VALUES (?,?,?,?,?,?)";
  connexion.query(req, values, (err, res) => {
    console.log("call");

    callback(err, res);
  });
};
// recuperer un product via son id
const getProductById = (id, callback) => {
  let req =
    "SELECT * FROM product WHERE product.product_id = id";
  connexion.query(req, [id], (err, res) => {
    callback(err, res);
  });
};

// recuperer la liste des products
const getAllProducts = (callback) => {
  let req = "SELECT * FROM product";
  connexion.query(req, (err, res) => {
    callback(err, res);
  });
};

// methode pour supprimer un product
const deleteProduct = (id, callback) => {
  let sql = "DELETE FROM product WHERE id = ?";
  connexion.query(sql, [id], (err, res) => {
    callback(err, res);
  });
};

// methode pour modifier un product
const updateProduct = (values, callback) => {
  let sql =
    "UPDATE products SET product_name = ?, latin_name = ?, description = ? , plant_section = ? , family = ? , image_path = ? WHERE id = ?";
  connexion.query(sql, values, (err, res) => {
    callback(err, res);
  });
};

// recuperation de la liste des products d'un utilisateur
const getUserProduct = (id, callback) => {
  let sql = "SELECT * FROM products WHERE userId = ?";
  connexion.query(sql, id, (err, res) => {
    callback(err, res);
  });
};

module.exports = {
  saveProduct,
  getProductById,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getUserProduct,
};
