const express = require('express')
const hbs = require('express-handlebars')
const userRoutes = require('./routes/users')
const db = require('./db')
const server = express()

// Middleware
server.engine('hbs', hbs ({
    extname: 'hbs', 
    defaultLayout: 'main'
}))

server.set('view engine', 'hbs') // allow access to hbs file directory
server.use(express.static('public')) // allow access to public folder
server.use(express.urlencoded({extended: false})) //this lets us access form data 

//these connect the route routes to here and use line 3 - const userRoutes = require('./routes/users')
server.use('/', userRoutes)

module.exports = server