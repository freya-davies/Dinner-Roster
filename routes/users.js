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
    
    db.joinDBAndProfile()
    .then(db.getProfile(id))
    .then(profileData => {
        // console.log("THE DATA IS ", profileData)
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
    let imgToUpload = req.body.userImage
    let newProfile = {
        name : userName, 
        user_image : imgToUpload,
    }

    db.addNewProfile(newProfile)
    .then(id => {
        // console.log("hello", id)
        res.redirect('/profile/' + id)
    })
})


router.get('/dietaryRequirements', (req, res) => {
    db.joinDBAndProfile()
    .then(data => {
        // console.log(data)
        res.render('dietaryRequirements', {
            data: data
        })
    })
})

// not working yet. Need functions too.
// router.get('/addDietaryRequirement/:id', (req, res) => {
//     res.render('addNewDietaryRequirement')
// })

// router.post('/addDietaryRequirement/:id', (req, res) => {
//     let id = req.params.id

//     db.addDietaryRequirement(id)
//     db.joinProfileAndDR()
//     .then(x => {
//         res.redirect('profile/' + id, )
//     })
// })

router.get('/addDayAway', (req, res) => {
    res.render('addDayAway')
    //redirect to /calendar
})


router.post('/addDayAway/:id', (req, res) => {
    let id = req.body.id
    let info = {
        daysAway: req.body.dayEntered
    }

    db.addDayAway(id)
    .then(x => {
        res.redirect('profile/' + id)
    })
})


router.get('/selectDay/:id', (req, res) => {
    res.render('addRosteredDay')
})


router.post('/selectDay/:id', (req, res) => {
    // define objs to send,
    // add obj to profile
    // update calendar 
    // redirect to calendar
    let id = req.body.id //how to pass id over from profile
    let info = {
        daysRostered: req.body.days,
    }
    // console.log("id is: ", id)

    db.updateDayInProfile(info, id) 
    then( x => {
        res.redirect('/calendar')
    })


    
    // let userName = req.body.name
    // let imgToUpload = req.body.userImage
    // let newProfile = {
    //     name : userName, 
    //     user_image : imgToUpload,
    // }

    // db.addNewProfile(newProfile)
    // .then(id => {
    //     // console.log("hello", id)
    //     res.redirect('/profile/' + id)
    // })
})

module.exports = router