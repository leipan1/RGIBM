const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema(
    {
        name: {type:String, required:true},
        time: {type:String, required:true},
        imageurl: {type:String, required:true},
        url: {type:String, required:true},
        ingredients:{type:[String], required:true}
    }
)

module.exports = mongoose.model('recipe', recipeSchema)
