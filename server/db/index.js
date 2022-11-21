const mongoose = require('mongoose')
/*
    This initializes the connection to our database.

*/
mongoose
    .connect('mongodb://127.0.0.1:27017/RecipeGenerator', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

