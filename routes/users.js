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
    
    db.getProfileAndDRById(id)
    .then(profileData => {
        // console.log(profileData)
        if(profileData.length) {
            res.render('profile', {
                // profileData : profileData,
                name : profileData[0].name,
                img : profileData[0].user_image,
                user_id : profileData[0].user_id,
                requirement : profileData.map(data => data.requirement).filter(data => data != null)
    
            })
        } else {
            res.render('profile')
        }
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
    db.clearSearchedItem()
    db.joinDRAndProfile()
    .then(data => {
        // console.log(data)
        res.render('dietaryRequirements', {
            data: data
        })
    });
})


router.get('/addDietaryRequirement/:id', (req, res) => {
    res.render('addNewDietaryRequirement')
})


router.post('/addDietaryRequirement/:id', (req, res) => {
    let id = req.params.id

    db.addDietaryRequirement(id)
    db.joinProfileAndDR()
    .then(x => {
        res.redirect('profile/' + id, )
    })
})


router.post('/searchDietaryRequirements', (req, res) => {
    let searchedItem = req.body.searchItem
    console.log("SEARCHED ITEM: ", searchedItem)

    db.clearSearchedItem() //This is being skipped :(
    console.log("YAY, THE CLEARING FUNCTION HAS RUN!")
    db.searchDRDB(searchedItem)
    .then(x => {
        console.log('X IS: ', x)
        res.redirect('dietaryRequirements')
    } )
})


router.get('/addDayAway/:id', (req, res) => {
    res.render('addDayAway')
    //redirect to /calendar
})


router.post('/addDayAway/:id', (req, res) => {
    let id = req.params.id
    let info = req.body.dayEntered

    // console.log('ID IS: ', id) // id is currently undefined :(
    //     console.log('INFO IS: ', info)

    db.addDayAway(id, info)
    .then(id => {
        // console.log("hello", id)
        res.redirect('/calendar')
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
    let day = req.body.days

    // console.log("ID IS: ", id)

    db.updateDayInProfile(day, id) 
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