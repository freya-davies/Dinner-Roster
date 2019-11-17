const express = require('express')
const db = require('../db')
const router = express.Router()
// const router = express()
// const profilesDb = require('../db/profiles')

// Calendar stuff - https://github.com/nhn/tui.calendar/blob/master/docs/getting-started.md
// var Calendar = require('tui-calendar');
// require("tui-calendar/dist/tui-calendar.css");


// var calendar = new Calendar('#calendar', {
//     defaultView: 'month',
//     taskView: true,
//     template: {
//       monthDayname: function(dayname) {
//         return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
//       }
//     }
//   });
  
router.get('/', (req, res) => {
    res.render('index')
})


router.get('/profile', (req, res) => {
    // res.render('profile')
    // res.send("hello?")
    db.getAllProfiles()
    .then(allProfilesData => {
        // console.log(allProfilesData)
        res.render('profileList', {
            allProfilesData: allProfilesData
        })
    })
})


router.get('/profile/:id', (req, res) => {
    let id = req.params.id
    
    db.joinProfileAndDR(id)
    .then(db.getProfile(id))
    .then(profileData => {
        console.log("THE DATA IS ", profileData)
        res.render('profile', {
            profileData : profileData
        })
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
    // .then( x => res.send(x)
        // let id = newProfile.user_id
        // res.render('profile/' + id)
    // )
    db.getProfileIdWithName(userName)
    .then((id) => {
        res.redirect('/profile/:id')
    })
})


router.get('/dietaryRequirements', (req, res) => {
    db.getAllRequirements()
    .then(data => {
        // console.log(data)
        res.render('dietaryRequirements', {
            data: data
        })
    })
})


router.get('/addDayAway', (req, res) => {
    res.render('addDayAway')
    //redirect to /calendar
})


module.exports = router