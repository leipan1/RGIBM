/*
    the back-end server where some middleware will make sure data recieved is
    in JSON format.

*/

//API
const express = require('express')
const cors = require('cors')

//creating the server
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

//setup of router as middleware
const recipeRouter = require('./routes/recipes-router')
app.use('/api', recipeRouter)


//initializing DB object
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//put server in listening mode
const apiPort = 4000
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))