const environement = require("dotenv");
environement.config();
const connexion = require("../config/db");

const saveCategory = async (category_name, description, parent_id) => {
  let req = "INSERT INTO category (category_name, description) VALUES (?,?)";
  return new Promise((resolve, reject) => {
    connexion.query(
      req,
      [category_name, description, parent_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Fonction pour récupérer toutes les catégories
const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM category";
    connexion.query(query, (err, results) => {
      if (err) {
        reject(err); // En cas d'erreur, rejeter la promesse
      }
      resolve(results); // Résultat de la requête
    });
  });
};

// Fonction pour ajouter une nouvelle catégorie
const addCategory = (category_name, description, parent_id) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO category (category_name, description, parent_id) VALUES (?, ?, ?)";
    connexion.query(
      query,
      [category_name, description, parent_id],
      (err, results) => {
        if (err) {
          reject(err); // En cas d'erreur, rejeter la promesse
        }
        resolve(results); // Résultat de l'insertion
      }
    );
  });
};

// Fonction pour associer un produit à une catégorie
const assignProductToCategory = (product_id, category_id) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO category_product (product_id, category_id) VALUES (?, ?)";
    connexion.query(query, [product_id, category_id], (err, results) => {
      if (err) {
        reject(err); // En cas d'erreur, rejeter la promesse
      }
      resolve(results); // Résultat de l'association produit-catégorie
    });
  });
};

// Exportation des fonctions
module.exports = {
  saveCategory,
  getAllCategories,
  addCategory,
  assignProductToCategory,
};
