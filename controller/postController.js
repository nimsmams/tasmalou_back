const jwt = require('jsonwebtoken');
const postModel = require('../model/postModel');
const { request, response } = require('express');

// ajouter un post
const addPost = (request, response) => {console.log('start');

    const {product_name, latin_name, description, plant_section, family} = request.body;
    // verifier si le token est inclu dans l'entete de la reque
    const tokenIsInclude = request.headers.authorization;
    if(!tokenIsInclude){
        return response.status(401).json ({message:"le token n'est pas present veuillez vous connecter pour avoir votre token"});
    }
    let transform = tokenIsInclude.split(' ');
    let token = transform[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
        console.log('logged');
        
        if(err){ // si le token est pas valide ou qu'il soit expire
            console.log('token exp');
            
            response.send("le token n'est pas valide ou il est expire");
            return;
        }
        console.log('ok');
        
        // si le token est valide on extrait l'id, l'email
        console.log(result)
       // let author = result.user_id;
        //let postedAt= new Date();
        //let responTo= null;//mais ici mettre un if car si deja ID sur le post alors assigner ID à respondTo
        
        //console.log('before post');
        if (!product_name || !latin_name || !description || !plant_section ||!family) {
            return response.status(400).json({ message: "Tous les champs sont requis." });
        }
        
        postModel.savePost([product_name, latin_name, description, plant_section, family], (e, r) => {
            console.log('posted');
            
            if(e){                
                console.log(e)

                response.send("erreur lors de l'insertion");
                return;
            }
            response.send({"message":"Commentaire ajoute"});
        });
    })
}
// recuperer un post via son identifiant
const getPost = (request, response) => {
    let id = request.params.id;
    postModel.getPostById(id, (error, res) => {
        if(error){
            console.log("erreur los de la requete", error);
            return;
        }
        if(res.length == 0){
            response.send({"message":"Aucun commentaire trouve"});
            return;
        }
        response.json(res[0]);
    })
}
// recuperer tous les posts
const getAllPosts = (request, response) => {
    postModel.getAllPosts((err, res) => {
        if(err){
            response.send({"message":"erreur interne"});
            return;
        }
        response.json(res);
    })
}

// methode pour supprimer un post
const deletePost = (request, response) => {
    let id =request.params.id;

    postModel.deletePost(id, (error, result) => {
        if(error){
            response.send({"message":"erreur interne"});
            return;
        }
        response.send({message: "Post supprime"});
    })
}
// methode pour la modification d'un post
const updatePost = (request, response) => {
    let {id,content} = request.body;
    let token = request.headers.authorization;
    token = token.split(" ")[1];


    jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
        if(err){
            response.send({"message":"le token n'est pas valide ou expire"});
            return;
        }else{
            postModel.updatePost([content, id], (err, result) => {
                if(err){
                    response.send({message: "erreu interne"});
                    return;
                }
                response.send({message: "Post mise a jour"});
            })
        }
    })
}

// methode pour recuperer la liste des posts d'un utilisateur
const getUserPost = (request, response) => {
    let token = request.headers.authorization;
    token = token.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
        if(err){
            response.send({"message":"le token n'est pas valide ou expire"});
            return;
        }else{
            postModel.getUserPost(result.userId, (err, res) => {
                if(err){
                    response.send({"message":"erreur interne"});
                    return;
                }
                response.send(res);
            })
        }
    })
}

module.exports = {
    addPost,
    getPost,
    getAllPosts,
    deletePost,
    updatePost,
    getUserPost
}