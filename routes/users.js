const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/:id', (req, res) => {

    let {id} = req.params
  
    db.getUser(id)
    .then(data => {
        res.render('profile', data[0])
      })
  })
  

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/profile/:id', (req, res) => {
    // let {id} = req.params

    res.render('profile')
})

router.get('/calendar', (req, res) => {
    res.render('calendar')
})

router.get('/dietaryRequirements', (req, res) => {
    res.render('dietaryRequirements')
})

router.get('/addUser', (req, res) => {
    res.render('addUser')
})

router.get('/addDayAway', (req, res) => {
    res.render('addDayAway')
})
