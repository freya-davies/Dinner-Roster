const express = require('express')
const db = require('../db')
// const router = express()
const router = express.Router()



// router.get('/:id', (req, res) => {

//     let {id} = req.params
  
//     db.getUser(id)
//     .then(data => {
//         res.render('profile', data[0])
//       })
//   })
  
router.get('/', (req, res) => {
    res.render('index')
})


router.get('/profile', (req, res) => {
    getFullProfile()
    .then(data => {
        res.render('profileList', data)
    })
    // res.send("hello?")
})


router.get('/profile/:id', (req, res) => {
    let id = req.params.id

    joinProfileAndDR(id)
    .then(getProfile(id))
    .then(data => {
        res.render('profile', data)
    })
    // res.render('profile')
})


router.get('/calendar', (req, res) => {
    res.render('calendar')
})


router.get('/addUser', (req, res) => {
    res.render('addUser')
})


router.post('/addUser', (req, res) => {
    let userName = req.body.name
    let userImg = req.body.Img
    // let userRequirement = req.body.userRequirement
    let newProfile = {
        name : userName, 
        user_imgage: userImg,
        // userRequirement, userRequirement,
    }

    db.addNewProfile(newProfile)
    .then( x => res.send(x)
        // let id = newProfile.user_id
        // res.render('profile/' + id)
    )
})


router.get('/dietaryRequirements', (req, res) => {
    res.render('dietaryRequirements')
})


router.get('/addDayAway', (req, res) => {
    res.render('addDayAway')
    //redirect to /calendar
})


module.exports = router