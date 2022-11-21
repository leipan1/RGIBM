const Recipe = require('../models/recipe-model')

/*
    this is the back-end API. Provides all the data services the
    database needs. Contains controller function for each endpoint 
*/
getRecipeById = async (req, res) => {
    await Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
        if (err) {
            console.log("error")
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, recipe: recipe })
    }).catch(err => console.log(err))
}

getAllRecipes = async (req, res) => {
    await Recipe.find({}, (err, recipes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!recipes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Recipes not found` })
        }
        return res.status(200).json({ success: true, data: recipes })
    }).catch(err => console.log(err))
}


module.exports = {
    getAllRecipes,
    getRecipeById,
}