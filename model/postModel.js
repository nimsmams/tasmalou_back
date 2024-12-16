const environement = require('dotenv');
environement.config();
const connexion = require('../config/db');
// sauvegarder un post
const savePost = (values, callback) => {
    console.log('blup');
    
    let req = "INSERT INTO product (product_name, latin_name, description, plant_section, family) VALUES (?,?,?,?,?)";
    connexion.query(req, values, (err, res) => {
        console.log('call');
        
        callback(err, res);
    });
}
// recuperer un post via son id
const getPostById = (id, callback) => {
    let req = "SELECT * FROM post INNER JOIN user ON user.user_id = post.author WHERE post.post_id = id";
    connexion.query(req, [id], (err, res) => {
        callback(err, res);
    });
}

// recuperer la liste des posts
const getAllPosts = (callback) => {
    let req = "SELECT * FROM product";
    connexion.query(req, (err, res) => {
        callback(err, res);
    });
}

// methode pour supprimer un post
const deletePost = (id, callback) => {
    let sql = "DELETE FROM post WHERE id = ?";
    connexion.query(sql, [id], (err, res) => {
        callback(err, res);
    })
}

// methode pour modifier un post
const updatePost = (values, callback) => {
    let sql = "UPDATE posts SET product_name = ?, latin_name = ?, description = ? , plant_section = ? , family = ? WHERE id = ?";
    connexion.query(sql, values, (err, res) => {
        callback(err, res);
    })
}

// recuperation de la liste des posts d'un utilisateur
const getUserPost = (id, callback) => {
    let sql = "SELECT * FROM posts WHERE userId = ?";
    connexion.query(sql, id, (err, res) => {
        callback(err, res);
    })
}

module.exports = {
    savePost,
    getPostById,
    getAllPosts,
    deletePost,
    updatePost,
    getUserPost
}