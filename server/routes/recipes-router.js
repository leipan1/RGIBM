/*
    This is where we'll route all of the received http requests
    into controller response functions.

*/
const express = require('express')
const RecipeController = require('../controllers/recipe-controller')
const router = express.Router()

router.get('/recipe/:id', RecipeController.getRecipeById)
router.get('/recipes', RecipeController.getAllRecipes)

module.exports = router