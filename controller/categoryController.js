const jwt = require("jsonwebtoken");
const categoryModel = require("../model/categoryModel");
const { request, response } = require("express");

// ajouter une catégorie
const addCategory = async (request, response) => {
  console.log("debut de l'ajout de categorie");

  const { category_name, description, parent_id = null } = request.body;
  if (!category_name || !description) {
    return response
      .status(400)
      .json({ message: "Tous les champs sont requis." });
  }

  try {
    const result = await categoryModel.saveCategory(
      category_name,
      description,
      parent_id
    );
    response.send({ message: "Commentaire ajoute" });
  } catch (err) {
    console.error(err);
    response.send("Erreur when trying to add category");
  }
};

// recuperer une catégorie via son identifiant
const getCategory = (request, response) => {
  let id = request.params.id;
  categoryModel.getCategoryById(id, (error, res) => {
    if (error) {
      console.log("erreur los de la requete", error);
      return;
    }
    if (res.length == 0) {
      response.send({ message: "Aucun commentaire trouve" });
      return;
    }
    response.json(res[0]);
  });
};

// recuperer toutes les catégories
const getAllCategories = async (request, response) => {
  try {
    const res = await categoryModel.getAllCategories();
    response.json(res);
  } catch (err) {
    console.error(err);
    response.send("Erreur when trying to retrieve category");
  }
};

// Associer un produit à une catégorie
const assignProductToCategory = (req, res) => {
  const { product_id, category_id } = req.body;
  categoryModel
    .assignProductToCategory(product_id, category_id)
    .then((result) => {
      res.json({
        message: "Produit associé à la catégorie",
        product_id,
        category_id,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erreur lors de l'association produit-catégorie",
        error: err,
      });
    });
};

// methode pour supprimer une catégorie
const deleteCategory = (request, response) => {
  let id = request.params.id;

  categoryModel.deleteCategory(id, (error, result) => {
    if (error) {
      response.send({ message: "erreur interne categorie" });
      return;
    }
    response.send({ message: "categorie supprime" });
  });
};
// methode pour la modification d'une catégorie
const updateCategory = (request, response) => {
  let { id, content } = request.body;
  let token = request.headers.authorization;
  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
    if (err) {
      response.send({ message: "le token n'est pas valide ou expire" });
      return;
    } else {
      categoryModel.updateCategory([content, id], (err, result) => {
        if (err) {
          response.send({ message: "erreu interne" });
          return;
        }
        response.send({ message: "catégorie mise a jour" });
      });
    }
  });
};

// methode pour recuperer la liste des categories d'un utilisateur
const getUserCategory = (request, response) => {
  let token = request.headers.authorization;
  token = token.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
    if (err) {
      response.send({ message: "le token n'est pas valide ou expire" });
      return;
    } else {
      categoryModel.getUserCategory(result.userId, (err, res) => {
        if (err) {
          response.send({ message: "erreur interne" });
          return;
        }
        response.send(res);
      });
    }
  });
};

module.exports = {
  addCategory,
  getCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
  getUserCategory,
  assignProductToCategory,
};

/*
//ajouter une category
const addCategory = (req, res) => {
  console.log("start");

  const { category_name, description, parent_id} =
    request.body;
  // verifier si le token est inclu dans l'entete de la reque
  categoryModel.addCategory(category_name, description, parent_id)
    .then((result) => {
      res.json({ id: result.insertId, category_name, description, parent_id });
    })
    .catch((err) => {
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la catégorie', error: err });
      });
  };

  //Récupérer une catégorie par son id:
  exports.getCategory = (req, res) => {
    const categoryId = req.params.id;
    categoryModel.getCategoryById(categoryId)  // Assure-toi que tu as une méthode pour cela dans ton modèle
      .then((category) => {
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: "Catégorie non trouvée" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie', error: err });
      });
};

  // Récupérer toutes les catégories
exports.getAllCategories = (req, res) => {
    categoryModel.getAllCategories()
      .then((categories) => {
        res.json(categories);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Erreur lors de la récupération des catégories', error: err });
      });
  };

  // Ajouter une nouvelle catégorie
exports.addCategory = (req, res) => {
    const { category_name, description, parent_id } = req.body;
    categoryModel.addCategory(category_name, description, parent_id)
      .then((result) => {
        res.json({ id: result.insertId, category_name, description, parent_id });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la catégorie', error: err });
      });
  };

  // Associer un produit à une catégorie
exports.assignProductToCategory = (req, res) => {
    const { product_id, category_id } = req.body;
    categoryModel.assignProductToCategory(product_id, category_id)
      .then((result) => {
        res.json({ message: 'Produit associé à la catégorie', product_id, category_id });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Erreur lors de l\'association produit-catégorie', error: err });
      });
  };

  // Supprimer une catégorie par ID
exports.deleteCategory = (req, res) => {
  const categoryId = req.params.id;

  categoryModel.deleteCategory(categoryId)
    .then((result) => {
      if (result.affectedRows > 0) {
        res.json({ message: 'Catégorie supprimée avec succès' });
      } else {
        res.status(404).json({ message: "Catégorie non trouvée" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie', error: err });
    });
};

//Mettre une catégory à jour
const updateCategory = (request, response) => {
  let { id, content } = request.body;
  let token = request.headers.authorization;
  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
    if (err) {
      response.send({ message: "le token n'est pas valide ou expire" });
      return;
    } else {
      categoryModel.updateCategory([content, id], (err, result) => {
        if (err) {
          response.send({ message: "erreu interne" });
          return;
        }
        response.send({ message: "catégorie mise a jour" });
      });
    }
  });
};*/
