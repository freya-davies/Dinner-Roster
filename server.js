const express = require('express')
const hbs = require('express-handlebars')
const userRoutes = require('./routes/users')
const db = require('./db')


const server = express()

// Middleware
server.engine('hbs', hbs ({
    extname: 'hbs'
}))

server.set('view engine', 'hbs') // allow access to hbs file directory
server.use(express.static('public')) // allow access to public folder
server.use(express.urlencoded({extended: false})) //this lets us access form data 

// Routes

// server.get('/', (req, res) => {
//     res.render('index')
// })

server.get('/', (req, res) => {
    res.render('index')
})

server.get('/profile', (req, res) => {
    res.send('Hello profile page')
})

server.get('/profile/:id', (req, res) => {
    // let {id} = req.params

    res.render('profile')
})

server.get('/calendar', (req, res) => {
    res.render('calendar')
})

server.get('/addUser', (req, res) => {
    res.render('addUser')
})

server.get('/dietaryRequirements', (req, res) => {
    res.render('dietaryRequirements')
    //redirect to /profile.:id
})

server.get('/addDayAway', (req, res) => {
    res.render('addDayAway')
    //redirect to /profile.:id
})


module.exports = server