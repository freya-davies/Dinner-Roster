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
  
//   router.get('/profile', (req, res) => {
//   })

//from birds project
// router.post('/:id/user', (req, res) => {
//     let voterName = req.body.name
//     let quote = req.body.quote
//     let birdVote = req.body.birdVote
//     let newVoter = {
//       voter_bird_id: birdVote,
//       voter_name: voterName,
//       quote: quote
//     }

//     db.newVoter(newVoter)
//       .then(() => db.getVotes())
//       .then( allVotes => 
//         db.addUpVotes(newVoter.voter_bird_id, allVotes))
//       .then(() => {
//         res.redirect('/voterProfile')
//       })


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
