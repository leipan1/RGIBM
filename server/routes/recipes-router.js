/*
    This is where all received http requests will be routed into the controller
    functions

*/
const express = require('express')
const RecipeController = require('../controllers/recipe-controller')
const router = express.Router()

router.get('/recipe/:id', RecipeController.getRecipeById)
router.get('/recipes', RecipeController.getAllRecipes)

module.exports = router