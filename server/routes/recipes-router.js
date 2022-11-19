/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
*/
const express = require('express')
const RecipeController = require('../controllers/recipe-controller')
const router = express.Router()

router.post('/recipe', RecipeController.createRecipe)
router.delete('/recipe/:id', RecipeController.deleteRecipe)
router.get('/recipe/:id', RecipeController.getRecipeById)
router.get('/recipe', RecipeController.getRecipes)
router.get('/recipepairs', RecipeController.getRecipePairs)
router.put('/recipe/:id', RecipeController.editRecipe)

module.exports = router