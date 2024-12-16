const express = require('express');
const PostRoute = express.Router();
const postController = require('../controller/postController');

PostRoute.post('/add',  postController.addPost);
PostRoute.get('/getpost/:id', postController.getPost);
PostRoute.get('/getAll', postController.getAllPosts);
PostRoute.delete('/delete/:id', postController.deletePost);
PostRoute.put('/update', postController.updatePost);
PostRoute.get('/postUser', postController.getUserPost);

module.exports = PostRoute;