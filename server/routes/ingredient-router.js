/*
    This is where we'll route all of the received http requests
    into controller response functions.

*/
const express = require('express')
const IngredientController = require('../controllers/ingredient-controller')
const router = express.Router()

router.get('/ingredient/:id', IngredientController.getIngredientById)
router.get('/ingredients', IngredientController.getAllIngredients)

module.exports = router