const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ingredientSchema = new Schema(
    {
        ingredients: {type:String, required:true},
    }
)

module.exports = mongoose.model('ingredient', ingredientSchema)
