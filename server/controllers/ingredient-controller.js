const Ingredient = require('../models/ingredient-model')


getIngredientById = async (req, res) => {
    await Ingredient.findOne({ _id: req.params.id }, (err, ingredient) => {
        if (err) {
            console.log("error")
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, ingredient: ingredient })
    }).catch(err => console.log(err))
}

getAllIngredients = async (req, res) => {
    await Ingredient.find({}, (err, ingredient) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!ingredient.length) {
            return res
                .status(404)
                .json({ success: false, error: `Ingredients not found` })
        }
        return res.status(200).json({ success: true, data: ingredient })
    }).catch(err => console.log(err))
}


module.exports = {
    getIngredientById,
    getAllIngredients,
}